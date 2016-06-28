using AspNetMvcSample.Core.Data;
using AspNetMvcSample.Core.Entities;
using AspNetMvcSample.Core.Services;
using AspNetMvcSample.Core.StoredProc;
using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Core.StoredProc.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Services.Services
{
    public class AccountService : BaseService<AspNetUser>, IAccountService
    {
        public AccountService(IUnitOfWork unitOfWork)
              : base(unitOfWork)
        {
        
        }
        public void UpdateUserRole(int userId, string roleId)
        {
            var db = new StoredProcContext();
            try
            {
                UpdateUserRole_Input inputParams = new UpdateUserRole_Input()
                {
                    MsgText = "",
                    MsgType = "",
                    UserId = userId,
                    RolesCSV = roleId
                };
                db.updateUserRole.CallStoredProc(inputParams);
                var msg = inputParams.MsgText;

            }

            catch (Exception ex)
            {
                var msg = ex.InnerException.Message;
            }

        }


        // added by  ram
        public void CreateUser(User_Input input)
        {
            var db = new StoredProcContext();

            db.UserCreate.CallStoredProc(input);
        }

        public void UpdateUser(User_Update input)
        {
            var db = new StoredProcContext();
            db.UserUpdate.CallStoredProc(input);
        }

        public void DeleteUser(GetUserDelete_Input input)
        {
            var db = new StoredProcContext();
            db.UserDelete.CallStoredProc(input);
        }


        public GetUser_ResultSet GetUserById(GetUser_Input input)
        {
            var db = new StoredProcContext();
            var user = db.GetUserById.CallStoredProc(input).ToList<GetUser_ResultSet>().FirstOrDefault();

            return user;
        }


        public List<GetUser_ResultSet> GetAllUsers()
        {

            var db = new StoredProcContext();

            List<GetUser_ResultSet> users = db.GetAllUser.CallStoredProc().ToList<GetUser_ResultSet>();

            return users;
        }


        public List<GetRole_ResultSet> GetAllRoles()
        {
            var db = new StoredProcContext();

            List<GetRole_ResultSet> roles = db.GetAllRoles.CallStoredProc().ToList<GetRole_ResultSet>();

            return roles;
        }
        
        
        public List<GetRoleAssignedToUser_ResultSet> GetRolesAssginedToUser(GetUser_Input input)
        {
            var db = new StoredProcContext();

            List<GetRoleAssignedToUser_ResultSet> assignedRoles = db.GetRolesAssignedToUser.CallStoredProc(input).ToList<GetRoleAssignedToUser_ResultSet>();

            return assignedRoles;
        }
    }
}
