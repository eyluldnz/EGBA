using core.Bases;
using dal.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Entities
{
    public class User : EntityBase
    {
        public User()
        {
            Educations = new HashSet<Education>();
            JoinToEducations = new HashSet<JoinToEducation>();
            MarketItems = new HashSet<MarketItem>();
            Markets = new HashSet<Market>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string? Username { get; set; }

        public virtual ICollection<Education> Educations { get; set; }
        public virtual ICollection<JoinToEducation> JoinToEducations { get; set; }
        public virtual ICollection<MarketItem> MarketItems { get; set; }
        public virtual ICollection<Market> Markets { get; set; }

    }
}
