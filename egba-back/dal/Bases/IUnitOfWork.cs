using core.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Bases
{
    public interface IUnitOfWork
    {
        IUserRepository GetUserRepository();

        IRepository<T> GetRepository<T>() where T : EntityBase;

        void Save();

    }
}
