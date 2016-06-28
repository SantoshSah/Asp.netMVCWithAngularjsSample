using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.StoredProc.Output
{
   public class GetUser_ResultSet
    {
        public GetUser_ResultSet()
        {

        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        // added by ram

        public string PhoneNumber { get; set; }
        public string UserName { get; set; }

        public bool Activated { get; set; }
    }
}
