using AspNetMvcSample.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Core.StoredProc.Output;

namespace AspNetMvcSample.Core.Services
{
    public interface IDepartmentService:IService<Department>
    {
        void CreateDepartment(Department_Input departmentInput);
        void UpdateDepartment(Department_Input departmentInput);
        void DeleteDepartment(DepartmentDelete_Input input);
        List<GetDepartment_ResultSet> GetDepartment();
        GetDepartment_ResultSet GetDepartmentById(GetDepartmentById_Input input);
    }
}
