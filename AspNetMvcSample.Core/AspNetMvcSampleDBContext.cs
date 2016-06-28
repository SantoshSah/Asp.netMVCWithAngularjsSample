using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core
{
   public class AspNetMvcSampleDBContext: DbContext
    {
        static AspNetMvcSampleDBContext()
        {            
           Database.SetInitializer<AspNetMvcSampleDBContext>(null);
        }

        public AspNetMvcSampleDBContext()
           : base("Name=DefaultConnection")
        {
            //this.Database.CommandTimeout = 600;
        }
    }
}
