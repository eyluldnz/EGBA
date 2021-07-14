using dal.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace bll.Bases
{
    public class ServiceBase
    {
        protected readonly IUnitOfWork _UnitOfWork;
        public ServiceBase(IUnitOfWork unitOfWork)
        {
            _UnitOfWork=unitOfWork;
        }
    }
}
