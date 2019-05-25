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
        private readonly IGetReportData _getreportdata;
        public UIConfigurationController(IJsonSerializer jsonserializer, IGetReportData getreportdata)
        {
            _jsonserializer = jsonserializer;
            _getreportdata = getreportdata;
        }
        public HttpResponseMessage Get(string ReportName)
        {
            try
            {
                var configurationData = new ConfigurationAndData(); 
                configurationData.Configuration= _jsonserializer
                    .Deserialize<ConfigDto>
                    (System.IO.File.ReadAllText("F:\\summer intern\\Repo\\Glimpse\\Glimpse\\ReportConfig.json"))
                    .Configuration.Find(x => x.ReportName == ReportName);

                configurationData.Data = _getreportdata.GetData(ReportName);

                if (configurationData.Configuration == null || configurationData.Data == null) 
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
