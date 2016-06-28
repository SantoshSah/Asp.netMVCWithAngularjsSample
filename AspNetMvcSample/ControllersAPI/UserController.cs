using AspNetMvcSample.App_Helpers;
using AspNetMvcSample.Core.Services;
using AspNetMvcSample.Core.StoredProc.Input;
using AspNetMvcSample.Core.StoredProc.Output;
using AspNetMvcSample.Dto.Dtos;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace AspNetMvcSample.ControllersAPI
{
    public class UserController : ApiController
    {
        private readonly IAccountService _accountService;

        public UserController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        private ApplicationUserManager _userManager;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]

        public async Task<IHttpActionResult> GetAllUsers()
        {

            var users = _accountService.GetAllUsers();

            return Ok(users);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create(UserDto userDto)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new Core.Entities.ApplicationUser()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                DateCreated = DateTime.Now.Date,
                LastLoginDate = DateTime.Now.Date,
                Email = userDto.Email,
                Activated = true,
                EmailConfirmed = true,
                PhoneNumber = userDto.PhoneNumber,
                UserName = userDto.UserName
            };

            IdentityResult result = await UserManager.CreateAsync(user, userDto.Password);

            if (result.Succeeded)
            {

                if (userDto.ProjectId == "" || userDto.RoleId == "")
                {
                 //   _accountService.UpdateProjectsDeveloper(user.Id, "9");
                    _accountService.UpdateUserRole(user.Id, "3");
                }
                else
                {
                  //  _accountService.UpdateProjectsDeveloper(user.Id, userDto.ProjectId);
                    _accountService.UpdateUserRole(user.Id, userDto.RoleId);
                }

            }
            else
            {
                return Ok(new { errorMessage = result.Errors.First().ToString() });
            }


            return Ok();


        }

        [HttpPost]
        public async Task<IHttpActionResult> Update(UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await UserManager.FindByIdAsync(userDto.Id);

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.PhoneNumber = userDto.PhoneNumber;
            user.Activated = userDto.Activated;

            if (userDto.Password != null)
            {
                AspNetMvcSamplePasswordHasher ph = new AspNetMvcSamplePasswordHasher();
                user.PasswordHash = ph.HashPassword(userDto.Password);
            }

            IdentityResult result = await UserManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                if (userDto.Password != null)
                {
                    IdentityResult securityToken = await UserManager.UpdateSecurityStampAsync(userDto.Id);
                }
                _accountService.UpdateUserRole(user.Id, userDto.RoleId);
              //  _accountService.UpdateProjectsDeveloper(user.Id, userDto.ProjectId);



            }

            return Ok();
        }


        [HttpPost]
        public async Task<IHttpActionResult> Delete([FromBody] int id)
        {
            GetUserDelete_Input input = new GetUserDelete_Input()
            {
                UserId = id
            };

            _accountService.DeleteUser(input);

            return Ok(id);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUserById(int userId)
        {
            GetUser_Input input = new GetUser_Input()
            {
                UserId = userId
            };

            var user = _accountService.GetUserById(input);

            return Ok(user);
        }



        // getting all roles
        [HttpGet]
        public async Task<IHttpActionResult> GetAllRoles()
        {
            List<GetRole_ResultSet> roles = _accountService.GetAllRoles();
            return Ok(roles);
        }


        //  getting roles assigned to user
        [HttpGet]
        public async Task<IHttpActionResult> GetRolesAssignedToUser(int userId)
        {
            GetUser_Input input = new GetUser_Input()
            {
                UserId = userId
            };

            var roles = _accountService.GetRolesAssginedToUser(input);


            return Ok(roles);
        }


        // getting projects assigned to user

        //public async Task<IHttpActionResult> GetProjectAssignedToUser(int userId)
        //{
        //    GetUser_Input input = new GetUser_Input()
        //    {
        //        UserId = userId
        //    };

        //    var projects = _accountService.GetProjectAssignedToUser(input);


        //    return Ok(projects);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _accountService.Dispose();
            }
            base.Dispose(disposing);
        }



        private bool UserExists(int id)
        {
            return _accountService.GetByIdAsync(id) != null;
        }
    }
}
