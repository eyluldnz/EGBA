using core.Bases;
using dal.Bases;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace dal.Repositories
{
    public class Repository<T> : IRepository<T> where T : EntityBase
    {

        private readonly DalDbContext _dalDbContext;

        private DbSet<T> _entities;
        public Repository(DalDbContext dalDbContext)
        {
            _dalDbContext = dalDbContext;

            _entities = _dalDbContext.Set<T>();
        }
        public T Add(T _entity)
        {
            if (_entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            return _entities.Add(_entity).Entity; // Entity neden ekleniyor sonuna ??
        }

        public Task<T> AddAsync(T _entity)
        {
            throw new NotImplementedException();
        }

        public bool Any(Expression<Func<T, bool>> _predicate) =>
            _entities.Any(_predicate);

        public T Get(long _id) =>
            _entities.SingleOrDefault(x => x.Id == _id);

        public T Get(Expression<Func<T, bool>> _predicate) =>
            _entities.SingleOrDefault(_predicate);

        public IEnumerable<T> GetAll()
        {
            return _entities.AsEnumerable();
        }

        public IEnumerable<T> GetAll(Expression<Func<T, bool>> _predicate) =>
            _entities.Where(_predicate).AsEnumerable();

        public T GetFirst(Expression<Func<T, bool>> _predicate) =>
            _entities.FirstOrDefault(_predicate);

        public void Remove(T _entity)
        {
            _entities.Remove(_entity);
        }

        public void Remove(long _id)
        {

            _entities.Remove(Get(_id));
        }

        public void Update(T _entity)
        {
            
        }
    }
}
