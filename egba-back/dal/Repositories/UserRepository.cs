using dal.Bases;
using dal.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace dal.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DalDbContext _dalDbContext;
        private readonly DbSet<User> _entities;

        public UserRepository (DalDbContext context)
        {
            _dalDbContext = context;
            _entities = _dalDbContext.Set<User>();
        }
        public User Add(User _entity)
        {
            if (_entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            return _entities.Add(_entity).Entity;
        }

        public Task<User> AddAsync(User _entity)
        {
            throw new NotImplementedException();
        }

        public bool Any(Expression<Func<User, bool>> _predicate)
        {
            return _entities.Any(_predicate);
        }

        public User Get(long _id)
        {
            return _entities.SingleOrDefault(x=>x.Id==_id);
        }

        public User Get(Expression<Func<User, bool>> _predicate)
        {
            return _entities.Where(_predicate).SingleOrDefault();
        }

        public IEnumerable<User> GetAll()
        {
            return _entities.AsEnumerable();
        }

        public IEnumerable<User> GetAll(Expression<Func<User, bool>> _predicate)
        {
            throw new NotImplementedException();
        }

        public User GetFirst(Expression<Func<User, bool>> _predicate)
        {
            throw new NotImplementedException();
        }

        public void Remove(User _entity)
        {
            throw new NotImplementedException();
        }

        public void Remove(long _id)
        {
            throw new NotImplementedException();
        }

        public void Update(User _entity)
        {
            throw new NotImplementedException();
        }
    }
}
