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
        public IEnumerable<dynamic> Get(string spName, [FromUri]List<Dictionary<string,string>>parameterPair=null)
        {
            var cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString();
            SqlDataReader reader;
            using (var con = new SqlConnection(cs))
            {
                using (var cmd = new SqlCommand(spName, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if(parameterPair!=null)
                    {
                        foreach (Dictionary<string,string> parameter in parameterPair)
                        {
                            foreach (KeyValuePair<string,string> pair in parameter)
                            {
                                cmd.Parameters.AddWithValue(pair.Key, pair.Value);
                            }
                        }
                    }
                    con.Open();
                    reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        var cols = reader.GetSchemaTable()
                                     .Rows
                                     .OfType<DataRow>()
                                     .Select(r => r["ColumnName"]).ToList();
                        do
                        {
                            dynamic t = new System.Dynamic.ExpandoObject();

                            cols.ForEach(x => ((IDictionary<System.String, System.Object>)t)[x.ToString()] = reader[x.ToString()]);


                            yield return t;
                        } while (reader.Read());
                    }
                }
            }
        }
    }
}
