using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace bll.Bases
{
    public interface IMarketService:IService
    {
        IEnumerable<MarketDto> GetAll();

        MarketDto Get(long _id);

        long Add(MarketDto _dto);

        void Update(MarketDto _dto);

        void Remove(MarketDto _dto);
    }
}
