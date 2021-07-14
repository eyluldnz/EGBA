using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace core.Models
{
    public class ResponseGetTokenDto
    {
        public string Token { get; set; }

        public UserDto User { get; set; }
    }
}
