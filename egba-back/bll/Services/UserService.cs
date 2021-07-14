using bll.Bases;
using bll.Extensions;
using dal.Bases;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace bll.Services
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly IUserRepository _UserRepository;


        public UserService(IUnitOfWork _unitOfWork):base(_unitOfWork)
        {
            _UserRepository = _unitOfWork.GetUserRepository();

        }
     

        public long Add(UserDto _dto)
        {
            // Önce ConvertDto ve convertEntity yazıp daha sonra ekleme işlemi yapılır.
            var _user = _UserRepository.Add(_dto.ConvertToEntity());

            Save();

            return _user.Id;
        }

        public UserDto Get(Expression<Func<dal.Entities.User, bool>> _predicate)
        {
            return _UserRepository.Get(_predicate).ConvertToDto();
        }

        public IEnumerable<UserDto> GetAll()
        {
            return _UserRepository.GetAll().Select(x => x.ConvertToDto());

        }
        public void Save()
        {
            _UnitOfWork.Save();
        }

        public ResponseValidateUserDto ValidateUser(RequestValidateUserDto _dto)
        {
            var _result = new ResponseValidateUserDto();

            var _user = _UserRepository.Get(x => x.Username==_dto.Username);

            if (_user == null)
            {
                return _result;
            }

            _result.User = _user.ConvertToDto();

            _result.Validated = true;

            return _result;
        }

        public UserDto Get(long _id)
        {
            return _UserRepository.Get(_id).ConvertToDto();
        }

        public bool Any(Expression<Func<dal.Entities.User, bool>> _predicate)
        {
            return _UserRepository.Any(_predicate);
        }
    }
}
