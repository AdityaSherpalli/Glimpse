using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportingService.Services;
using ReportingService.Dtos;

namespace ReportingService.Controllers
{
    public class UIConfigurationController : ApiController
    {
        private readonly IJsonSerializer _jsonserializer;
        public UIConfigurationController(IJsonSerializer jsonserializer)
        {
            _jsonserializer = jsonserializer;
        }
        public HttpResponseMessage Get(string ReportName)
        {
            try
            {
                var configurationData = new ConfigurationDto();
                configurationData = _jsonserializer
                    .Deserialize<ConfigDto>
                    (System.IO.File.ReadAllText("F:\\summer intern\\Repo\\Glimpse\\Glimpse\\ReportingService\\ReportConfig.json"))
                    .Configuration.Find(x => x.ReportName == ReportName); 

                if (configurationData == null) 
                {
                    return Request.CreateResponse(HttpStatusCode.ServiceUnavailable,
                        string.Format("unable to find resource that matches the report name {0}",ReportName));
                }
                return Request.CreateResponse(HttpStatusCode.OK, configurationData);
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "INTERNAL SERVER PROBLEM");
            }
        }
    }
}
