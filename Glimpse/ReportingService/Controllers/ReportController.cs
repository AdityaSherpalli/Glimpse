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
using Newtonsoft;


namespace ReportingService.Controllers
{
    public class ReportController : ApiController
    {
        public dynamic Get()
        {
            return null;
        }
        public IEnumerable<dynamic> Get(string spName, [FromUri]dynamic parameter)
        {
            var parameterPair = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(parameter);
            var cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString();
            SqlDataReader reader;
            //try
            {
                using (var con = new SqlConnection(cs))
                {
                    using (var cmd = new SqlCommand(spName, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        if (parameter != null)
                        {
                            foreach (KeyValuePair<string, string> pair in parameterPair)
                            {
                                cmd.Parameters.AddWithValue(pair.Key, pair.Value);
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
}
