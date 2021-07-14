using System;
using System;
using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Security.Principal;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Linq;

namespace core.Tools
{
    public class LdapTool
    {
        public static LdapTool Instance => _Instance.Value;

        private static readonly Lazy<LdapTool> _Instance =
            new Lazy<LdapTool>(() => new LdapTool());
        public bool AuthenticateUser(string _password, string _userName)
        {
            var _result = false;

            try
            {
                using (var _context = new PrincipalContext(ContextType.Domain, "basarsoft.com.tr"))
                {
                    _result = _context.ValidateCredentials(_userName, _password);
                    if (_result)
                    {
                        //var _x = UserPrincipal.FindByIdentity(_context, _userName);

                    }
                }
            }
            catch (Exception ex)
            {
                //LogHelper.Error(ex, "Hata oluştu.\n=> LdapHelper/AuthenticateUser");
            }

            return _result;
        }
    }
}
