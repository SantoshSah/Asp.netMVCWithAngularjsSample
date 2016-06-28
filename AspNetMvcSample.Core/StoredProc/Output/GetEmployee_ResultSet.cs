using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.StoredProc.Output
{
    public class GetEmployee_ResultSet
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Nullable<int> DepartmentId { get; set; }
        public string DepartmentName { get; set; }

    }
}
