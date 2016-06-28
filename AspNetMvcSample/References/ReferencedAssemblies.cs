using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace AspNetMvcSample.References
{
    public static class ReferencedAssemblies
    {
        public static Assembly Services
        {
            get { return Assembly.Load("AspNetMvcSample.Services"); }
        }

        public static Assembly Repositories
        {
            get { return Assembly.Load("AspNetMvcSample.Data"); }
        }

        public static Assembly Dto
        {
            get
            {
                return Assembly.Load("AspNetMvcSample.Dto");
            }
        }

        public static Assembly Domain
        {
            get
            {
                return Assembly.Load("AspNetMvcSample.Core");
            }
        }
    }
}