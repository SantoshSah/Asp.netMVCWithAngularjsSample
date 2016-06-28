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
    public class DepartmentService : BaseService<Department>, IDepartmentService
    {
        public DepartmentService(IUnitOfWork unitOfWork)
          : base(unitOfWork)
        {

        }
        
        public void CreateDepartment(Department_Input departmentInput)
        {          
                var db = new StoredProcContext();
                db.DepartmentCreate.CallStoredProc(departmentInput);          
        }

        public  void UpdateDepartment(Department_Input departmentInput)
        {          
                var db = new StoredProcContext();
            db.DepartmentUpdate.CallStoredProc(departmentInput);
        }


       public void DeleteDepartment(DepartmentDelete_Input input)
        {                             
            var db = new StoredProcContext();
            db.DepartmentDelete.CallStoredProc(input);
        }


      public List<GetDepartment_ResultSet> GetDepartment()
        {
            var db = new StoredProcContext();            
            List<GetDepartment_ResultSet> departmentslist = db.GetDepartment.CallStoredProc().ToList<GetDepartment_ResultSet>();
            return departmentslist;
        }


    public GetDepartment_ResultSet GetDepartmentById(GetDepartmentById_Input input)
        {
            var db = new StoredProcContext();
            var projectById = db.GetDepartmentById.CallStoredProc(input).ToList<GetDepartment_ResultSet>().FirstOrDefault();            
            return projectById;
        }

    }
}
