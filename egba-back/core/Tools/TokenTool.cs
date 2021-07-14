using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using core.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace core.Tools
{
    public class TokenTool
    {
        public static TokenTool Instance => _Instance.Value;

        private static readonly Lazy<TokenTool> _Instance =
            new Lazy<TokenTool>(() => new TokenTool());

        private readonly IConfiguration _Configuration;
        private readonly string _TokenKey;

        public TokenTool()
        {
            _Configuration = new ConfigurationBuilder().
                AddJsonFile("appsettings.json", true, true).
                Build();

            _TokenKey = _Configuration["Application:TokenKey"];
        }

        public string GenerateToken(TokenUser _tokenUser)
        {
            var _result = string.Empty;

            try
            {
                var _key = Encoding.UTF8.GetBytes(_TokenKey);
                var _tokenHandler = new JwtSecurityTokenHandler();
                var _tokenDescriptor = new SecurityTokenDescriptor
                {
                    Audience = "EgbaCustom",
                    Issuer = "Egba.api",
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId", _tokenUser.UserId.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(3),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256)

                };
                var _token = _tokenHandler.CreateToken(_tokenDescriptor);
                var _tokenString = _tokenHandler.WriteToken(_token);
                _result = _tokenString;
            }

            catch (Exception _e)
            {

            }
            return _result;
        }


    }
}
