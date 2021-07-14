using System;
using System.Collections.Generic;

#nullable disable

namespace egba_api.models
{
    public partial class Education
    {
        public Education()
        {
            JoinToEducations = new HashSet<JoinToEducation>();
        }

        public long Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishDate { get; set; }
        public string Subject { get; set; }
        public long? MentorId { get; set; }

        public virtual User Mentor { get; set; }
        public virtual ICollection<JoinToEducation> JoinToEducations { get; set; }
    }
}
