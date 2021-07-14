using System;
using System.Collections.Generic;

#nullable disable

namespace egba_api.models
{
    public partial class Market
    {
        public Market()
        {
            MarketItems = new HashSet<MarketItem>();
        }

        public long Id { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public long? UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<MarketItem> MarketItems { get; set; }
    }
}
