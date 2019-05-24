using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Data.SqlClient;
using System.Net.Http.Headers;
using System.Web.Http.Cors;

namespace ReportingService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "GET,POST");
            config.EnableCors(cors);

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
