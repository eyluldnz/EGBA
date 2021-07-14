using System;
using System.Collections.Generic;

#nullable disable

namespace egba_api.models
{
    public partial class MarketItem
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
