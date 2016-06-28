using AspNetMvcSample.Core.Entities;
using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Core.StoredProc.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.Services
{
 public  interface IAccountService : IService<AspNetUser>
    {
        void UpdateUserRole(int userId, string roleId);
        //  added by ram
        void CreateUser(User_Input input);

        void UpdateUser(User_Update input);

        void DeleteUser(GetUserDelete_Input input);

        GetUser_ResultSet GetUserById(GetUser_Input input);

        List<GetUser_ResultSet> GetAllUsers();

        List<GetRole_ResultSet> GetAllRoles();        
        
        List<GetRoleAssignedToUser_ResultSet> GetRolesAssginedToUser(GetUser_Input input);
    }
}
