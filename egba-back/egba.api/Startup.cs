using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using bll.Bases;
using bll.Services;
using core.Models;
using dal;
using dal.Bases;
using dal.Entities;
using dal.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace egba_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
              AddJwtBearer(jwtBearerOptions =>
              {
                  jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                  {
                      ValidateActor = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = "Egba.api",
                      ValidAudience = "EgbaCustom",
                      ClockSkew = TimeSpan.Zero,
                      IssuerSigningKey = new SymmetricSecurityKey(
                          Encoding.UTF8.GetBytes(Configuration["Application:TokenKey"]))
                  };
              });

            services.AddControllers();

            services.AddCors(o => o.AddPolicy("CorsPolicy",
               builder => builder.
                   AllowAnyOrigin().
                   AllowAnyMethod().
                   AllowAnyHeader()));

            services.AddDbContext<DalDbContext>(opt =>
            {
                opt.UseNpgsql(Configuration.GetConnectionString("Base"),
                x => x.UseNetTopologySuite());
            });

            services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));

            services.AddSingleton<IMailService, MailService>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IEducationService, EducationService>();

            services.AddScoped<IMarketService, MarketService>();

            services.AddScoped<IMarketItemService, MarketItemService>();

            services.AddScoped<IJoinEducationService, JoinEducationService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
