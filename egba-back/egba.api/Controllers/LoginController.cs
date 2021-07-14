using bll.Bases;
using bll.Extensions;
using core.Models;
using core.Tools;
using DtoLayer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace egba_api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LoginController : Controller
    {
        private readonly IUserService _UserService;

        public LoginController(IUserService _userService)
        {
            _UserService = _userService;
        }

        [HttpPost]
        public Response Validate(RequestGetTokenDto _dto)
        {
            var _result = new Response();
            
            try
            {

                //var _responseValidateUser = _UserService.ValidateUser(_dto.ConvertToDto());
                var _isTrue = LdapTool.Instance.AuthenticateUser(_dto.Password, _dto.Username);

                if (!_isTrue)//(!_responseValidateUser.Validated)
                {
                    _result.Exception = "Kullanıcı bulunamadı";
                    return _result;
                }

                var _user = _UserService.Any(x => x.Username == _dto.Username);
               

                if(!_user)
                {
                    var _int = _UserService.Add(new UserDto
                    {
                        Username = _dto.Username,
                        Name = _dto.Username.Substring(0, _dto.Username.IndexOf(".")),
                       

                    }); ;
                }

                var _token = TokenTool.Instance.GenerateToken(
                    new TokenUser
                    {
                        UserId = 1, //_responseValidateUser.User.Id,
                        Username = _dto.Username//_responseValidateUser.User.Name

                    });;

              
                var validateDto = new RequestValidateUserDto
                {
                    Username = _dto.Username,
                    Password=_dto.Password
                    
                };

                _result.Data = new ResponseGetTokenDto
                {
                    Token = _token,

                    User = _UserService.ValidateUser(validateDto).User  //_responseValidateUser.User
                };

                _result.Success = true;

            }
            catch (Exception _e)
            {

            }

            return _result;

        }
    }
}
