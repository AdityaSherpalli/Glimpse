using System;
using System.Web.Http;
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
        public dynamic Get()
        {
            try
            {
                return
                    _jsonserializer.Deserialize
                                            <ConfigDto>
                                            (System.IO.File.ReadAllText("ReportConfig.json"));
            }
            catch (Exception e)
            {
                return e;
            }
        }
    }
}
