using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace core.Models
{
    public class MailRequest
    {
        public  List<string> ToEmail { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public List<IFormFile> Files { get; set; }
    }
}
