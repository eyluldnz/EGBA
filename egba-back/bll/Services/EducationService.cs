using bll.Bases;
using dal.Bases;
using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using bll.Extensions;
using System.Text;
using System.Linq;

namespace bll.Services
{
    public class EducationService : ServiceBase, IEducationService
    {
        private readonly IRepository<Education> _EducationRequestRepository;

        public EducationService(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _EducationRequestRepository = unitOfWork.GetRepository<Education>();
        }

        public long Add(EducationDto _dto)
        {
            var _education = _EducationRequestRepository.Add(_dto.ConvertToEntity());

            Save();

            return _education.Id;
        }

        public EducationDto Get(long _id)
        {
            return _EducationRequestRepository.Get(_id).ConvertToDto();
        }

        public IEnumerable<EducationDto> GetAll() =>
            _EducationRequestRepository.GetAll().Select(x => x.ConvertToDto());
        

        public void Remove(EducationDto _dto)
        {
            _EducationRequestRepository.Remove(_dto.Id);

            Save();
        }

        public void Save()
        {
            _UnitOfWork.Save();
        }

        public void Update(EducationDto _dto)
        {
            var _entity = _EducationRequestRepository.Get(_dto.Id);

            _entity.FinishDate = _dto.FinishDate;

            _entity.StartDate = _dto.StartDate;

            _entity.Subject = _dto.Subject;
            _entity.MentorId = _dto.MentorId;

            Save();
        }
    }

    
        
    
}
