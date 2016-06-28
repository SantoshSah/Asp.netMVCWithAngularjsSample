using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Dto.Dtos
{
   public class DepartmentDto :BaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
