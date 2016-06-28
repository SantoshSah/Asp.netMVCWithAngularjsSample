using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Optimization;
using System.Web.Http;
using AspNetMvcSample.Capsule;

[assembly: OwinStartup(typeof(AspNetMvcSample.Startup))]

namespace AspNetMvcSample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            ConfigureAuth(app);

            //var mappingDefinitions = new MappingDefinitions();
            //mappingDefinitions.Initialise();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AreaRegistration.RegisterAllAreas();

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            WebApiConfig.Register(config);

            new WebCapsule().Initialise(config);

            app.UseWebApi(config);


        }
    }
}
