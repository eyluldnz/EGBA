using bll.Bases;
using bll.Extensions;
using dal.Bases;
using dal.Entities;
using DtoLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace bll.Services
{

    public class MarketService : ServiceBase, IMarketService
    {
        private readonly IRepository<Market> _MarketRespository;

        public MarketService(IUnitOfWork _unitOfWork) : base(_unitOfWork)
        {
            _MarketRespository = _unitOfWork.GetRepository<Market>();
        }

        public IEnumerable<MarketDto> GetAll() =>
            _MarketRespository.GetAll().Select(x => x.ConvertToDto());

        public MarketDto Get(long _id) =>
            _MarketRespository.GetAll(x => x.Id == _id).
                AsQueryable().
                Include(x => x.User).
                FirstOrDefault().
                ConvertToDto();


        public long Add(MarketDto _dto)
        {
            var market = _MarketRespository.Add(_dto.ConvertToEntity());

            Save();

            return market.Id;
        }

        public void Update(MarketDto _dto)
        {
            var market = _MarketRespository.Get(_dto.Id);

            market.Description = _dto.Description;

            market.Subject = _dto.Subject;

            market.FinishDate = _dto.FinishDate;

            market.StartDate = _dto.StartDate;

            _MarketRespository.Update(market);

            Save();

        }

        public void Remove(MarketDto _dto)
        {
            _MarketRespository.Remove(_dto.ConvertToEntity());

            Save();
        }

        public void Save()
        {
            _UnitOfWork.Save();
        }


    }
}
