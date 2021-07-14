using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer.Models
{
    public class MarketDto
    {

        public long Id  {get; set;}
        public string Subject {get; set;}
        public string Description {get; set;}
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public long? UserId { get; set; }
        public string Username { get; set; }
        

    }
}
