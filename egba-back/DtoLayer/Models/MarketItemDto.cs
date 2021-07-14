using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer.Models
{
    public class MarketItemDto
    {
        public long Id { get; set; }
        public long? MarketId { get; set; }
        public string Item { get; set; }
        public long? Count { get; set; }
        public long? UserId { get; set; }
        public string RequestUserName { get; set; }

        public string Username { get; set; }
        public string MarketName { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

    }
}
