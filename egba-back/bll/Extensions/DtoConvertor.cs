using core.Models;
using dal.Entities;
using DtoLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace bll.Extensions
{
    public static class DtoConvertor
    {
        public static User ConvertToEntity(this UserDto _dto) =>
            new User
            {
                Username = _dto.Username,
                Name = _dto.Name


            };
        public static UserDto ConvertToDto(this User _entity) =>
            new UserDto
            {
                Id = _entity.Id,
                Username = _entity.Username,
                Name = _entity.Name,
            };
        public static RequestValidateUserDto ConvertToDto(this RequestGetTokenDto _dto) =>
            new RequestValidateUserDto
            {
                Username = _dto.Username,
                Password = _dto.Password
            };

        public static Education ConvertToEntity(this EducationDto _dto) =>
            new Education
            {
                MentorId = _dto.MentorId,
                StartDate = _dto.StartDate,
                FinishDate = _dto.FinishDate,
                Subject = _dto.Subject,

            };
        public static EducationDto ConvertToDto(this Education _entity) =>
            new EducationDto
            {
                Id = _entity.Id,
                MentorId = _entity.MentorId,
                StartDate = _entity.StartDate,
                FinishDate = _entity.FinishDate,
                Subject = _entity.Subject

            };

        public static MarketDto ConvertToDto(this Market _entity) =>
            new MarketDto
            {
                Id = _entity.Id,
                Subject = _entity.Subject,
                Description = _entity.Description,
                StartDate = _entity.StartDate,
                FinishDate = _entity.FinishDate,
                UserId = _entity.UserId,
                Username = _entity.User?.Username
            };

        public static Market ConvertToEntity(this MarketDto _dto) =>
            new Market
            {

                Subject = _dto.Subject,
                Description = _dto.Description,
                StartDate = _dto.StartDate,
                FinishDate = _dto.FinishDate,
                UserId = _dto.UserId
            };

        public static MarketItem ConvertToEntity(this MarketItemDto _dto) =>
            new MarketItem
            {
                Item = _dto.Item,
                Count = _dto.Count,
                MarketId = _dto.MarketId,
                UserId = _dto.UserId
            };

        public static MarketItemDto ConvertToDto(this MarketItem _entity) =>
            new MarketItemDto
            {
                Id = _entity.Id,
                Item = _entity.Item,
                Count = _entity.Count,
                UserId = _entity.UserId,
                MarketId = _entity.MarketId,
                Username = _entity.User.Username,
                MarketName = _entity.Market.Subject,
                StartDate = _entity.Market.StartDate,
                FinishDate = _entity.Market.FinishDate,
                RequestUserName = _entity.Market.User.Name




            };

        public static JoinToEducation ConverToEntity(this JoinEducationDto _dto) =>
            new JoinToEducation
            {
                UserId = _dto.UserId,
                EducationId = _dto.EducationId
            };

        public static JoinEducationDto ConvertToDto(this JoinToEducation _entity){

            string mentorName = (_entity.Education.Mentor !=null  ? _entity.Education.Mentor.Username : " - ");

         return    new JoinEducationDto
            {
                Id = _entity.Id,
                MentorName =  mentorName,
                EducationSubject = _entity.Education.Subject,
                StartDate = _entity.Education.StartDate,
                FinishDate = _entity.Education.FinishDate,
                EducationId= _entity.EducationId,
                UserId=_entity.UserId,
                Username=_entity.User.Name

    };
}


    }
}
