using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Autofac.Integration.WebApi;

namespace AspNetMvcSample.Capsule.Modules
{
    public class ControllerCapsuleModule: Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            // Register the MVC Controllers
            //builder.RegisterControllers(Assembly.Load("KiksApp.Web"));

            // Register the Web API Controllers
            //builder.RegisterApiControllers(Assembly.GetCallingAssembly());
            builder.RegisterApiControllers(Assembly.Load("AspNetMvcSample"));

        }
    }
}