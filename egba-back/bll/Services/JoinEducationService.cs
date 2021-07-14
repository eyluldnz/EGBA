using bll.Bases;
using dal.Bases;
using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using bll.Extensions;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace bll.Services
{
    public class JoinEducationService : ServiceBase, IJoinEducationService
    {
        private readonly IRepository<JoinToEducation> _JoinMarketService;
        public JoinEducationService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _JoinMarketService = unitOfWork.GetRepository<JoinToEducation>();
        }

        public long Add(JoinEducationDto _dto)
        {
            var item = _JoinMarketService.Add(_dto.ConverToEntity());
            Save();
            return item.Id;
        }

        public bool Any(Expression<Func<JoinToEducation, bool>> _predicate)
        {
            return _JoinMarketService.Any(_predicate);
        }

       
        public JoinEducationDto Get(long id)
        {
            return _JoinMarketService.GetAll(x => x.EducationId == id).AsQueryable().Include(x => x.User).Include(x => x.Education).Select(x => x.ConvertToDto()).FirstOrDefault();
        }

        public IEnumerable<JoinEducationDto> GetAll(long _id)
        {
            return _JoinMarketService.GetAll(x => x.EducationId ==_id).AsQueryable().Include(x => x.User).Include(x => x.Education).Include(x=>x.Education.Mentor).Select(x => x.ConvertToDto());
        }

        public IEnumerable<JoinEducationDto> GetAll(Expression<Func<JoinToEducation, bool>> _predicate)
        {
            return _JoinMarketService.GetAll(_predicate).AsQueryable().Include(x => x.User).Include(x => x.Education).Include(x=>x.Education.Mentor).Select(x => x.ConvertToDto());
        }

        public void Remove(JoinEducationDto _dto)
        {
            _JoinMarketService.Remove(_dto.Id);
            Save();
        }

        public void Save()
        {
            _UnitOfWork.Save();
        }

        public void Update(JoinEducationDto _dto)
        {
            throw new NotImplementedException();
        }
    }
}
