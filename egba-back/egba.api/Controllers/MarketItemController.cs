using bll.Bases;
using core.Models;
using dal.Entities;
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
    public class MarketItemController : Controller
    {
        private readonly IMarketItemService _MarketItemService;

        public MarketItemController(IMarketItemService _service)
        {
            _MarketItemService = _service;
        }

        [HttpGet]
        [Route("{_id}")]
        public Response GetAll(long _id)
        {
            var _response = new Response();

            try
            {
                _response.Data = _MarketItemService.GetAll(_id);
                _response.Success = true;
            }
            catch (Exception ex)
            {

            }

            return _response;
        }

        [HttpGet]
        [Route("{_id}")]
        public Response Get(long _id)
        {
            var _response = new Response();
            try
            {
                _response.Data = _MarketItemService.Get(_id);
                _response.Success = true;
            }
            catch (Exception ex)
            {

            }
            return _response;
        }


        [HttpPost]
        public Response Add(MarketItemDto _dto)
        {
            var _response = new Response();
            try
            {
                _response.Data = _MarketItemService.Add(_dto);

                _response.Success = true;
            }
            catch (Exception ex)
            {

            }

            return _response;
        }

        [HttpPut]
        public Response Update(MarketItemDto _dto)
        {
            var _response = new Response();

            try
            {
                _MarketItemService.Update(_dto);

                _response.Data = _MarketItemService.Get(_dto.Id);

                _response.Success = true;
            }
            catch (Exception ex)
            {

            }
            return _response;
        }
    }
}
