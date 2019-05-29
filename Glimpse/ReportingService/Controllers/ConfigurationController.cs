using System;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using ReportingService.Services;
using ReportingService.Dtos;


namespace ReportingService.Controllers
{
    public class ConfigurationController : ApiController
    {
        private readonly IJsonSerializer _jsonserializer;
        public ConfigurationController(IJsonSerializer jsonserializer)
        {
            _jsonserializer = jsonserializer;
        }
        public HttpResponseMessage Get()
        {
            try
            {
                var reportsData = _jsonserializer.Deserialize
                                            <ConfigDto>
                                            (System.IO.File.ReadAllText("F:\\summer intern\\Repo\\Glimpse\\Glimpse\\ReportConfig.json")).Reports;
                if(reportsData==null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict,"Unable To Fetch File Data");
                }
                return Request.CreateResponse(HttpStatusCode.OK, reportsData);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable,"INTERNAL SERVER PROBLEM");
            }
        }
    }
}
