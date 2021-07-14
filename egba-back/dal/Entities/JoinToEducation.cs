using core.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Entities
{
    public class JoinToEducation : EntityBase
    {

        public long UserId { get; set; }
        public long EducationId { get; set; }

        public virtual Education Education { get; set; }
        public virtual User User { get; set; }

    }
}
