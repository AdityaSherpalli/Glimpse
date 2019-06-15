using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportingService.Services;
using ReportingService.Dtos;

namespace ReportingService.Controllers
{
    public class DefaultFiltersController : ApiController
    {
        private readonly IJsonSerializer _jsonserializer;
        public DefaultFiltersController(IJsonSerializer jsonserializer)
        {
            _jsonserializer = jsonserializer;
        }
        public HttpResponseMessage Get()
        {
            try
            {
                var configurationData = new ConfigDto();
                configurationData.DefaultFilters = _jsonserializer
                    .Deserialize<ConfigDto>
                    (System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.MapPath("/ReportConfig.json")))
                    .DefaultFilters;

                if (configurationData == null)
                {
                    return Request.CreateResponse(HttpStatusCode.ServiceUnavailable,
                        string.Format("unable to find resource"));
                }
                return Request.CreateResponse(HttpStatusCode.OK, configurationData.DefaultFilters);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "INTERNAL SERVER PROBLEM");
            }
        }
    }
}
