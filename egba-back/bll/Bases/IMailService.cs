using core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace bll.Bases
{
    public interface IMailService
    {

        Task SendEmailAsync(MailRequest mailRequest);

    }
}
