using bll.Bases;
using core.Models;
using DtoLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace egba_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IMarketItemService _marketService;

        private readonly IJoinEducationService _joinEducationService;

        private readonly IUserService _userService;

        public UserController(IMarketItemService marketService, IJoinEducationService joinEducationService,IUserService userService)
        {
            _marketService = marketService;
            _joinEducationService = joinEducationService;
            _userService = userService;
        }

        [HttpGet]
        [Route("{_id}")]
        public Response Get(long _id)
        {
            var _result = new Response();
            try
            {
                _result.Data = _userService.Get(_id);
                _result.Success = true;
            }
            catch (Exception _ex)
            {

            }

            return _result;
        }

        [HttpGet]
        [Route("{_userId}")]
        public Response GetCourses(long _userId)
        {
            var _result = new Response();
            try
            {
                _result.Data = _joinEducationService.GetAll(x => x.UserId == _userId);
                _result.Success = true;
            }
            catch (Exception _ex) {
                
            }
            return _result;
        }

        [HttpGet]
        [Route("{_userId}")]
        public Response GetMarkets(long _userId)
        {
            var _result = new Response();
            try
            {
                _result.Data = _marketService.GetAll(x => x.UserId == _userId);
                _result.Success = true;
            }
            catch(Exception _ex)
            {

            }

            return _result;
        }

        [HttpDelete]
        public Response RemoveCourse(JoinEducationDto _dto)
        {
            var _result = new Response();
            try
            {
               
                _joinEducationService.Remove(_dto);
                _result.Success = true;
            }
            catch(Exception _ex)
            {

            }
            return _result;
        }

        [HttpDelete]
        public Response RemoveMarketItem(MarketItemDto _dto)
        {
            var _result = new Response();
            try
            {

                _marketService.Remove(_dto);
                _result.Success = true;
            }
            catch (Exception _ex)
            {

            }
            return _result;
        }
    }
}
