using bll.Bases;
using core.Models;
//using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;


namespace bll.Services
{
    public class MailService : IMailService
    {
        private readonly SmtpSettings _smtpSetting;

        public MailService(IOptions<SmtpSettings> options)
        {
            _smtpSetting = options.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                var _mailAddressess = mailRequest.ToEmail;

                var _senderAddress = _smtpSetting.SenderEmail;

                using (var _smtpClient = new SmtpClient
                {
                    Host = _smtpSetting.Server,
                    Port = _smtpSetting.Port,
                })
                {
                    _smtpClient.UseDefaultCredentials = false;

                    _smtpClient.Credentials = new NetworkCredential(
                        _senderAddress,
                        _smtpSetting.Password);

                    _smtpClient.EnableSsl = true;

                    foreach (var _mailAddress in _mailAddressess)
                    {
                        using (var _message = new MailMessage(
                        _smtpSetting.SenderName + " " + _senderAddress,
                        _mailAddress,
                        mailRequest.Subject,
                        mailRequest.Body))
                        {
                            _message.IsBodyHtml = true;

                            await _smtpClient.SendMailAsync(_message);
                        }
                    }
                }
            }
            catch (Exception _ex)
            {
            }
        }
    

        


    }
}
