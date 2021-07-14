using System;
using System.Collections.Generic;
using System.Text;

namespace DtoLayer.Models
{
    public class ResponseValidateUserDto
    {
        public UserDto User { get; set; }
        public bool Validated { get; set; }
    }
}
