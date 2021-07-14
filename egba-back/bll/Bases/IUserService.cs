
using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace bll.Bases
{
    public interface IUserService:IService
    {
        ResponseValidateUserDto ValidateUser(RequestValidateUserDto _dto);

        UserDto Get(long _id);

        UserDto Get(Expression<Func<User, bool>> _predicate);
        long Add(UserDto _dto);

        IEnumerable<UserDto> GetAll();

        bool Any(Expression<Func<User, bool>> _predicate);
    }
}
