using core.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Entities
{
    public class Education :EntityBase
    {
        public Education()
        {
            JoinToEducations = new HashSet<JoinToEducation>();
        }

       
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public string Subject { get; set; }
        public long? MentorId { get; set; }

        public virtual User Mentor { get; set; }
        public virtual ICollection<JoinToEducation> JoinToEducations { get; set; }
    }

    
    }
    
        