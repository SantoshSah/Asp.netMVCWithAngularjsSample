﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.StoredProc.Input
{
  public class User_Update
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }   
        public string Email { get; set; }     
        public bool Activated { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
    }
}
