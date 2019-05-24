using System.Web.Http;
using Unity;
using Unity.WebApi;
using ReportingService.Services;

namespace ReportingService
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            container.RegisterType<IJsonSerializer, JsonSerializer>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}