using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer.Models
{
    public class EducationDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long? MentorId { get; set; }
        public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> FinishDate { get; set; }
        public string Subject { get; set; }
       
    }
}
