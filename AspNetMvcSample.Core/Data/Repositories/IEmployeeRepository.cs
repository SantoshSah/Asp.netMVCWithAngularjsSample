using AspNetMvcSample.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.Data.Repositories
{
 public  interface IEmployeeRepository:IRepository<Employee>
    {
    }
}
