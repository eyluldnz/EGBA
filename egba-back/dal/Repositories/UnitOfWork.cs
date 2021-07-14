using core.Bases;
using dal.Bases;
using System;
using System.Collections.Generic;
using System.Text;

namespace dal.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DalDbContext _context;

        public UnitOfWork(DalDbContext context)
        {
            _context = context;
        }

        public IRepository<T> GetRepository<T>() where T : EntityBase => new Repository<T>(_context);


        public IUserRepository GetUserRepository() => new UserRepository(_context);

        public void Save() => _context.SaveChanges();

    }
}
