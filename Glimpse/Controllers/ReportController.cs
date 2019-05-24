using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportingService.Dtos;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;


namespace ReportingService.Controllers
{
    public class ReportController : ApiController
    {
        public dynamic Get()
        {
            return null;
        }
        public dynamic Get(string SpName)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString();
                SqlDataReader rdr;
                var queryResult = new List<EmployeeDto>();
                using (var con = new SqlConnection(cs))
                {
                    using (var cmd = new SqlCommand(SpName, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        rdr = cmd.ExecuteReader();
                        while (rdr.Read())
                        {
                            queryResult.Add(new EmployeeDto { ID = Convert.ToInt16(rdr["empno"]),
                                                              name = rdr["ename"].ToString(),
                                                              position = rdr["job"].ToString() });
                        }
                    }
                }
                return queryResult;
            }
            catch (Exception e)
            {
                return e;
            }
        }
    }
}
