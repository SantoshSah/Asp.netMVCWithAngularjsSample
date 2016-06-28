using AspNetMvcSample.Core.Services;
using AspNetMvcSample.References;
using AspNetMvcSample.Services.Services;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNetMvcSample.Capsule.Modules
{
    public class ServiceCapsuleModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(ReferencedAssemblies.Services).
                Where(_ => _.Name.EndsWith("Service")).
                AsImplementedInterfaces().
                InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(BaseService<>)).As(typeof(IService<>)).InstancePerDependency();
            //builder.RegisterGeneric(typeof(ContactService)).As(typeof(IContactService)).InstancePerDependency();
        }
    }
}