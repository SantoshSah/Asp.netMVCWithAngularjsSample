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
   public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        public EmployeeService(IUnitOfWork unitOfWork)
          : base(unitOfWork)
        {

        }

        public void CreateEmployee(Employee_Input employeeInput)
        {
            var db = new StoredProcContext();
            db.EmployeeCreate.CallStoredProc(employeeInput);
        }

        public void UpdateEmployee(Employee_Input employeeInput)
        {
            var db = new StoredProcContext();
            db.EmployeeUpdate.CallStoredProc(employeeInput);
        }


        public  void DeleteEmployee(EmployeeDelete_Input input)
        {
            var db = new StoredProcContext();
            db.EmployeeDelete.CallStoredProc(input);
        }


        public List<GetEmployee_ResultSet> GetEmployee()
        {
            var db = new StoredProcContext();
            List<GetEmployee_ResultSet> employeeslist = db.GetEmployee.CallStoredProc().ToList<GetEmployee_ResultSet>();
            return employeeslist;
        }
        
        public GetEmployeeById_ResultSet GetEmployeeById(GetEmployeeById_Input input)
        {
            var db = new StoredProcContext();
            var employeeById = db.GeEmployeeById.CallStoredProc(input).ToList<GetEmployeeById_ResultSet>().FirstOrDefault();
            return employeeById;
        }

    }
}
