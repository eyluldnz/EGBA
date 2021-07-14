using core.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Entities
{
    public class Market:EntityBase
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
