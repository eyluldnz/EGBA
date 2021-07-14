using bll.Bases;
using bll.Extensions;
using dal.Bases;
using dal.Entities;
using DtoLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace bll.Services
{
    public class MarketItemService : ServiceBase, IMarketItemService
    {

        private readonly IRepository<MarketItem> _MarketItemRepository;

        public MarketItemService(IUnitOfWork _unitOfWork):base(_unitOfWork)
        {
            _MarketItemRepository = _unitOfWork.GetRepository<MarketItem>();
        }
        public long Add(MarketItemDto _dto)
        {
            var item = _MarketItemRepository.Add(_dto.ConvertToEntity());

            Save();

            return _dto.Id;
        }

        public MarketItemDto Get(long id)
        {
            return _MarketItemRepository.GetAll(x => x.Id == id).AsQueryable().Include(x => x.User).Include(x => x.Market).Select(x => x.ConvertToDto()).FirstOrDefault();
        }

       

        public IEnumerable<MarketItemDto> GetAll(long _id)
        {
            return _MarketItemRepository.GetAll(x => x.MarketId == _id).AsQueryable().Include(x => x.User).Include(x=>x.Market).Select(x=>x.ConvertToDto());
        }

        public IEnumerable<MarketItemDto> GetAll(Expression<Func<MarketItem, bool>> _prediction)
        {
            return _MarketItemRepository.GetAll(_prediction).AsQueryable().Include(x=>x.Market).Include(x => x.User).Select(x => x.ConvertToDto());
        }

        public void Remove(MarketItemDto _dto)
        {
            _MarketItemRepository.Remove(_dto.Id);
            Save();
        }

        public void Save()
        {
            _UnitOfWork.Save();
        }

        public void Update(MarketItemDto _dto)
        {
            var marketItem = _MarketItemRepository.Get(_dto.Id);

            marketItem.Item = _dto.Item;

            marketItem.Count = _dto.Count;

            Save();

        }
    }
}
