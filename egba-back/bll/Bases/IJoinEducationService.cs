using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace bll.Bases
{
    public interface IJoinEducationService:IService
    {
        IEnumerable<JoinEducationDto> GetAll(long _id);

        IEnumerable<JoinEducationDto> GetAll(Expression<Func<JoinToEducation,bool>> _predicate);

        JoinEducationDto Get(long id);

        bool Any(Expression<Func<JoinToEducation, bool>> _predicate);

        long Add(JoinEducationDto _dto);

        void Update(JoinEducationDto _dto);
                   
        void Remove(JoinEducationDto _dto);
    }
}
