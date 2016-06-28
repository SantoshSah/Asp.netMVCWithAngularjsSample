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
    public class DepartmentController : ApiController
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpPost]

        public async Task<IHttpActionResult> Save(DepartmentDto model)
        {

            Department_Input inputparams = new Department_Input()
            {
                Id = model.Id,
                Name = model.Name,
                Description=model.Description
            };
            if (model.Id == 0)
                _departmentService.CreateDepartment(inputparams);
            else
                _departmentService.UpdateDepartment(inputparams);

            return Ok(model);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetDepartment()
        {
            var departments = _departmentService.GetDepartment();
            return Ok(departments);
        }


        [HttpPost]
        public async Task<IHttpActionResult> Delete([FromBody] int id)
        {
            DepartmentDelete_Input input = new DepartmentDelete_Input()
            {
                Id = id
            };
            _departmentService.DeleteDepartment(input);
            return Ok();

        }


        [HttpGet]

        public IHttpActionResult GetDepartmentById(int departmentId)
        {
            GetDepartmentById_Input input = new GetDepartmentById_Input()
            {
                Id = departmentId
            };
            var departmentById = _departmentService.GetDepartmentById(input);
            return Ok(departmentById);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _departmentService.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}
