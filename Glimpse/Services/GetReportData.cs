using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ReportingService.Dtos;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace ReportingService.Services
{
    public interface IGetReportData
    {
        List<EmployeeDto> GetData(string reportName);
    }
    public class GetReportData: IGetReportData
    {
        public List<EmployeeDto> GetData(string reportName)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString();
                SqlDataReader rdr;
                var queryResult = new List<EmployeeDto>();
                using (var con = new SqlConnection(cs))
                {
                    using (var cmd = new SqlCommand("select * from "+reportName, con))
                    {
                        con.Open();
                        rdr = cmd.ExecuteReader();
                        while (rdr.Read())
                        {
                            queryResult.Add(new EmployeeDto
                            {
                                ID = Convert.ToInt16(rdr["empno"]),
                                name = rdr["ename"].ToString(),
                                position = rdr["job"].ToString()
                            });
                        }
                    }
                }
                return queryResult;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}