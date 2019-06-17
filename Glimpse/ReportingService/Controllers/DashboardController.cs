using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportingService.Dtos;
using System.IO;
using ReportingService.Services;

namespace ReportingService.Controllers
{
    public class DashboardController : ApiController
    {
        private readonly IJsonSerializer _jsonserializer;
        public DashboardController(IJsonSerializer jsonserializer)
        {
            _jsonserializer = jsonserializer;
        }
        public HttpResponseMessage Get()
        {
            try
            {
                var configurationData = _jsonserializer
                    .Deserialize<List<Dashboard>>
                    (System.IO.File.ReadAllText(System.AppContext.BaseDirectory + "DashboardConfiguration.json"));
                    

                if (configurationData == null)
                {
                    return Request.CreateResponse(HttpStatusCode.ServiceUnavailable,
                        string.Format("unable to find resource "));
                }
                return Request.CreateResponse(HttpStatusCode.OK, configurationData);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "INTERNAL SERVER PROBLEM");
            }
        }
        public HttpResponseMessage postConfiguration(dynamic DashboardConfiguration)
        {
            try
            {
                var Json = DashboardConfiguration.ToString();
                var Configuration = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Dashboard>>(Json);
                string seralisedConfiguration = Newtonsoft.Json.JsonConvert.SerializeObject(Configuration);
                File.WriteAllText(System.AppContext.BaseDirectory + "DashboardConfiguration.json", seralisedConfiguration);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "internal Server Problem");
            }
            return Request.CreateResponse(HttpStatusCode.OK, "configuration");
        }
    }
}
