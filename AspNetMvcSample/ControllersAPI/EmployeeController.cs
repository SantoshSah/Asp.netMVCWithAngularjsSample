using AspNetMvcSample.Core.Services;
using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Dto.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace AspNetMvcSample.ControllersAPI
{
    public class EmployeeController : ApiController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }


        [HttpPost]

        public async Task<IHttpActionResult> Save(EmployeeDto model)
        {

            Employee_Input inputparams = new Employee_Input()
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName= model.LastName,
                Email= model.Email,
                Address = model.Address,
                DepartmentId =model.DepartmentId
            };
            if (model.Id == 0)
                _employeeService.CreateEmployee(inputparams);
            else
                _employeeService.UpdateEmployee(inputparams);

            return Ok(model);
        }
        
        [HttpGet]
        public async Task<IHttpActionResult> GetEmployee()
        {
            var employees = _employeeService.GetEmployee();            
            return Ok(employees);            
        }


        [HttpPost]
        public async Task<IHttpActionResult> Delete([FromBody] int id)
        {
            EmployeeDelete_Input input = new EmployeeDelete_Input()
            {
                Id = id
            };
            _employeeService.DeleteEmployee(input);
            return Ok();

        }


        [HttpGet]

        public IHttpActionResult GetEmployeeById(int employeeId)
        {
            GetEmployeeById_Input input = new GetEmployeeById_Input()
            {
                Id= employeeId
            };
            var employeeById = _employeeService.GetEmployeeById(input);
            return Ok(employeeById);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _employeeService.Dispose();
            }
            base.Dispose(disposing);
        }

      
    }
}
