using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace bll.Bases
{
    public interface IEducationService:IService
    {
        IEnumerable<EducationDto> GetAll();

        EducationDto Get(long _id);

        void Update(EducationDto _dto);

        long Add(EducationDto _dto);

        void Remove(EducationDto _dto);


    }
}
