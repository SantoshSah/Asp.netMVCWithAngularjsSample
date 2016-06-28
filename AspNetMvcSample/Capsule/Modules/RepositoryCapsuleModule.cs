using AspNetMvcSample.Core.Data.Repositories;
using AspNetMvcSample.Data.Repositories;
using AspNetMvcSample.References;
using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AspNetMvcSample.Capsule.Modules
{
    public class RepositoryCapsuleModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(ReferencedAssemblies.Repositories).
                Where(_ => _.Name.EndsWith("Repository")).
                AsImplementedInterfaces().
                InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(BaseRepository<>)).As(typeof(IRepository<>)).InstancePerDependency();
            //builder.RegisterGeneric(typeof(ContactRepository)).As(typeof(IContactRepository)).InstancePerDependency();
        }
    }
}