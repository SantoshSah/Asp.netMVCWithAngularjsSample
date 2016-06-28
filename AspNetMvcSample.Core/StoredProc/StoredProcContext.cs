using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Core.StoredProc.Output;
using CodeFirstStoredProcs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMvcSample.Core.StoredProc
{
   public class StoredProcContext: AspNetMvcSampleDBContext
    {
        // input user
        [StoredProcAttributes.Name("[User.Create]")]
        public StoredProc<User_Input> UserCreate { get; set; }

        [StoredProcAttributes.Name("[User.Get]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetUser_ResultSet))]
        public StoredProc<object> GetAllUser { get; set; }



        [StoredProcAttributes.Name("[dbo].[AspNetUserRoles.Update]")]
        public StoredProc<UpdateUserRole_Input> updateUserRole { get; set; }
     

        // update user
        [StoredProcAttributes.Name("[User.Update]")]
        public StoredProc<User_Update> UserUpdate { get; set; }

        // delete user
        [StoredProcAttributes.Name("[User.Delete]")]
        public StoredProc<GetUserDelete_Input> UserDelete { get; set; }

        // get user by id
        [StoredProcAttributes.Name("[User.GetUserById]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetUser_ResultSet))]
        public StoredProc<GetUser_Input> GetUserById { get; set; }


        // get roles assigned to user
        [StoredProcAttributes.Name("[Roles.GetRolesAssignedToUser]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetRoleAssignedToUser_ResultSet))]
        public StoredProc<GetUser_Input> GetRolesAssignedToUser { get; set; }      
        [StoredProcAttributes.Name("[Role.Get]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetRole_ResultSet))]
        public StoredProc<object> GetAllRoles { get; set; }

        
        [StoredProcAttributes.Name("[Department.Create]")]
        public StoredProc<Department_Input> DepartmentCreate { get; set; }

        [StoredProcAttributes.Name("[Department.Update]")]
        public StoredProc<Department_Input> DepartmentUpdate { get; set; }


        [StoredProcAttributes.Name("[Department.Delete]")]
        public StoredProc<DepartmentDelete_Input> DepartmentDelete { get; set; }

        [StoredProcAttributes.Name("[Department.Get]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetDepartment_ResultSet))]
        public StoredProc<object> GetDepartment { get; set; }
        [StoredProcAttributes.Name("[Department.GetById]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetDepartment_ResultSet))]
        public StoredProc<GetDepartmentById_Input> GetDepartmentById { get; set; }


        [StoredProcAttributes.Name("[Employee.Create]")]
        public StoredProc<Employee_Input> EmployeeCreate { get; set; }

        [StoredProcAttributes.Name("[Employee.Update]")]
        public StoredProc<Employee_Input> EmployeeUpdate { get; set; }

        [StoredProcAttributes.Name("[Employee.Delete]")]
        public StoredProc<EmployeeDelete_Input> EmployeeDelete { get; set; }

        [StoredProcAttributes.Name("[Employee.Get]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetEmployee_ResultSet))]
        public StoredProc<object> GetEmployee { get; set; }
        [StoredProcAttributes.Name("[Employee.GetById]")]
        [StoredProcAttributes.ReturnTypes(typeof(GetEmployeeById_ResultSet))]
        public StoredProc<GetEmployeeById_Input> GeEmployeeById { get; set; }




        //Constructor 
        public StoredProcContext()
        {
            this.InitializeStoredProcs();

        }
    }
}
