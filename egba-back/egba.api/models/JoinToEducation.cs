using System;
using System.Collections.Generic;

#nullable disable

namespace egba_api.models
{
    public partial class JoinToEducation
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long EducationId { get; set; }

        public virtual Education Education { get; set; }
        public virtual User User { get; set; }
    }
}
