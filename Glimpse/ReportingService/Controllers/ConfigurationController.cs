using System;
using System.Web.Http;
using System.Net;
using System.IO;
using System.Net.Http;
using ReportingService.Services;
using ReportingService.Dtos;
using System.Reflection;


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
                                            (System.IO.File.ReadAllText("ReportConfig.json")).Reports;
                if(reportsData==null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict,"Unable To Fetch File Data");
                }
                string x = Directory.GetCurrentDirectory();
                string y= new FileInfo(Assembly.GetExecutingAssembly().Location).DirectoryName;

                return Request.CreateResponse(HttpStatusCode.OK, reportsData);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable,"INTERNAL SERVER PROBLEM");
            }
        }
    }
}
