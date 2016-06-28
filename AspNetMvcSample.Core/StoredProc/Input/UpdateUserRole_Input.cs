using CodeFirstStoredProcs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.StoredProc.Input
{
   public class UpdateUserRole_Input
    {
        [StoredProcAttributes.Name("UserId")]
        [StoredProcAttributes.Direction(System.Data.ParameterDirection.Input)]
       
        public int UserId { get; set;}

        [StoredProcAttributes.Name("RolesCSV")]
        [StoredProcAttributes.Direction(System.Data.ParameterDirection.Input)]

        public string RolesCSV { get; set;}

        [StoredProcAttributes.Name("MsgType")]
        [StoredProcAttributes.Direction(System.Data.ParameterDirection.Output)]
        [StoredProcAttributes.ParameterType(System.Data.SqlDbType.VarChar)]
        [StoredProcAttributes.Size(10)]
        public string MsgType { get; set; }

        [StoredProcAttributes.Name("MsgText")]
        [StoredProcAttributes.Direction(System.Data.ParameterDirection.Output)]
        [StoredProcAttributes.ParameterType(System.Data.SqlDbType.VarChar)]
        [StoredProcAttributes.Size(100)]
        public string MsgText { get; set; }

    }
}
