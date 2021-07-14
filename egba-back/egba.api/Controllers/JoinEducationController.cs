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
    public class JoinEducationController : Controller
    {
        private readonly IJoinEducationService _joinEducationService;

        public JoinEducationController(IJoinEducationService joinEducationService)
        {
            _joinEducationService = joinEducationService;
        }

        [HttpGet]
        [Route("{id}")]
        public Response GetAll(long id)
        {
            var _result = new Response();
            try
            {
                _result.Data = _joinEducationService.GetAll(id);
                _result.Success = true;
            }
            catch (Exception _e)
            {

            }
            return _result;
        }

        [HttpGet]
        [Route("{id}")]
        public Response Get(long id)
        {
            var _result = new Response();
            try
            {

                _result.Data = _joinEducationService.Get(id);
                _result.Success = true;

            }
            catch (Exception _e)
            {

            }
            return _result;
        }


        [HttpPost]
        public Response Add(JoinEducationDto _dto)
        {
            var _result = new Response();
            try
            {
                
                var _courses = _joinEducationService.GetAll(x => x.EducationId == _dto.EducationId);
                var _isHere = _courses.Any(x => x.UserId== _dto.UserId);

                if (!_isHere)
                {
                    _result.Data = _joinEducationService.Add(_dto);
                    _result.Success = true;
                }


            }
            catch (Exception _e)
            {

            }
            return _result;
        }


    }
}
