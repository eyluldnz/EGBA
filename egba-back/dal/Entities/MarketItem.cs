using core.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Entities
{
    public class MarketItem:EntityBase
    {
        public long Id { get; set; }
        public long? MarketId { get; set; }
        public string Item { get; set; }
        public long? Count { get; set; }
        public long? UserId { get; set; }

        public virtual Market Market { get; set; }
        public virtual User User { get; set; }
    }
}
