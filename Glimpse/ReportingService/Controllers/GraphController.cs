using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace ReportingService.Controllers
{
    public class GraphController : ApiController
    {
        public IEnumerable<dynamic> Get(string spName)
        {
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ToString(); ;
            SqlDataReader reader;
            //try
            {
                using (var con = new SqlConnection(cs))
                {
                    try
                    {
                        var cmd = new SqlCommand(spName, con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        reader = cmd.ExecuteReader();
                    }
                    catch (Exception e)
                    {
                        yield break;
                    }
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
