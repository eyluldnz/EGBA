using bll.Bases;
using bll.Services;
using core.Models;
using dal.Entities;
using DtoLayer.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class EducationController : Controller
    {
        private readonly IEducationService _EducationService;
        private readonly IMailService _MailService;
        private readonly IUserService _UserService;

        public EducationController(IEducationService _service, IMailService _mailService, IUserService _userService)
            
        {
            _EducationService = _service;
            _MailService = _mailService;
            _UserService = _userService;
        }

        [HttpGet]
        public Response GetAll()
        {
            var _response = new Response();

            try
            {
                _response.Data = _EducationService.GetAll();

                _response.Success = true;

            }
            catch (Exception _ex)
            {

            }

            return _response;
        }


        [HttpGet]
        [Route("{id}")]
        public Response Get(long _id)
        {
            var _response = new Response();

            try
            {
                _response.Data = _EducationService.Get(_id);

                _response.Success = true;

            }
            catch (Exception _ex)
            {

            }

            return _response;
        }



        [HttpPost]
        public Response Add(EducationDto _dto)
        {
            var _response = new Response();

            try
            {
                _response.Data = _EducationService.Get(_EducationService.Add(_dto));

                var receivers = _UserService.GetAll().Select(x => x.Username).ToList<string>();
                var mailRequest = new MailRequest
                {
                    ToEmail = receivers,
                    Subject = "Yeni Eğitim Eklendi",
                    Body = "<h1>EGBA SİSTEM </h1> \n" +
                    "<p> Egba sistemine "+_dto.StartDate.ToString().Substring(0,10)+ "-"+ _dto.FinishDate.ToString().Substring(0,10)+" tarihleri arasında "+ _dto.Subject+ " eğitim isteği eklendi.Eğitime katılmak için: https://live.basarsoft.com.tr/egba/web/ </p>",
                };

                _MailService.SendEmailAsync(mailRequest);

                _response.Success = true;

            }

            catch (Exception _ex)
            {

            }
            return _response;
        }


        [HttpPut]
        public Response Update(EducationDto _dto)
        {
            var _response = new Response();

            try
            {
                _EducationService.Update(_dto);

                _response.Success = true;

            }
            catch (Exception _ex)
            {


            }

            return _response;

        }

        [HttpDelete]
        public Response Remove(EducationDto _dto)
        {
            var _response = new Response();

            try
            {
                _EducationService.Remove(_dto);

                _response.Success = true;

            }

            catch (Exception _ex)
            {

            }

            return _response;


        }


    }
}
