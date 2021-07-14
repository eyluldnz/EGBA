using bll.Bases;
using bll.Services;
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
    public class MarketController : Controller
    {
        private readonly IMarketService _marketService;

        private readonly IMailService _mailService;

        private readonly IUserService _userService;
        

        public MarketController(IMarketService _service,IMailService mailService, IUserService userService)
        {
            _marketService = _service;
            _mailService = mailService;
            _userService = userService;

        }

        [HttpGet]
        public  Response GetAll()
        {
            var _response = new Response();

            try
            {
                _response.Data = _marketService.GetAll();

                _response.Success = true;
            }
            catch(Exception e)
            {

            }

            return _response;

        }

        [HttpGet]
        [Route("{id}")]
        public Response Get(long id)
        {
            var _response = new Response();

            try
            {
                _response.Data = _marketService.Get(id);

                _response.Success = true;

            }
            catch (Exception _ex)
            {

            }

            return _response;
        }

        [HttpPost]
        public Response Add(MarketDto _dto)
        {
            var _response = new Response();

            try
            {
                _response.Data = _marketService.Get(_marketService.Add(_dto));

                var receivers = _userService.GetAll().Select(x => x.Username).ToList<string>();

                var mailRequest= new MailRequest
                {
                    ToEmail = receivers,
                    Subject = "Yeni Market Talebi Eklendi",
                    Body = "<h1>EGBA SİSTEM </h1> \n" +
                    "<p> Egba sistemine " + _dto.StartDate.ToString().Substring(0, 10) + "-" + _dto.FinishDate.ToString().Substring(0, 10) + " tarihleri arasında " + _dto.Subject + " market talebi  eklendi.İstekte bulunmak için: https://live.basarsoft.com.tr/egba/web/ </p>",

                };

                _mailService.SendEmailAsync(mailRequest);

                _response.Success =true;
            }
            catch(Exception ex)
            {

            }

            return _response;
        }

       

    }
}
