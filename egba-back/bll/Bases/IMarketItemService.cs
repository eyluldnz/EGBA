using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace bll.Bases
{
    public interface IMarketItemService:IService
    {
        IEnumerable<MarketItemDto> GetAll(long _id);

        MarketItemDto Get(long id);

        IEnumerable<MarketItemDto> GetAll(Expression<Func<MarketItem, bool>> _prediction);

        long Add(MarketItemDto _dto);

        void Update(MarketItemDto _dto);

        void Remove(MarketItemDto _dto);

    }
}
