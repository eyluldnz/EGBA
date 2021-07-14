using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer.Models
{
    public class JoinEducationDto
    {
        public long Id {get; set;}
        public long EducationId{get; set;}
        public long UserId {get; set;}
        public string?  MentorName {get; set;}
        public string EducationSubject {get; set;}

        public DateTime? StartDate { get; set; }

        public DateTime? FinishDate { get; set; }
        public string Username { get; set; }
 

    }
}
