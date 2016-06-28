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
    public interface IEmployeeService:IService<Employee>
    {
        void CreateEmployee(Employee_Input employeeInput);
        void UpdateEmployee(Employee_Input employeeInput);
        void DeleteEmployee(EmployeeDelete_Input input);
        List<GetEmployee_ResultSet> GetEmployee();
        GetEmployeeById_ResultSet GetEmployeeById(GetEmployeeById_Input input);
    }
}
