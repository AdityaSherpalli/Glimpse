using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using ReportingService.Dtos;

namespace ReportingService.Controllers
{
    public class PopulateDDLController : ApiController
    {
        public HttpResponseMessage Get(string SpName)
        {
            try
            {
                var cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString();
                SqlDataReader rdr;
                var queryResult = new List<DdlDTO>();
                int counter = 1;
                using (var con = new SqlConnection(cs))
                {
                    using (var cmd = new SqlCommand(SpName, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        rdr = cmd.ExecuteReader();
                        while (rdr.Read())
                        {
                            queryResult.Add(new DdlDTO
                            {
                                value = rdr["dname"].ToString(),
                                index = counter++
                            });
                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK,queryResult);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable,"INTERNAL SERVER PROBLEM");
            }
        }
    }
}
