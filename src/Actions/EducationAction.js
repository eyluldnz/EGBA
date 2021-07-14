import Constant from '../Constants/EducationConstant';
import { EducationService } from '../Services/EducationService';
import { toast } from 'react-toastify';

const GetCurrentCourse = () =>{
    return _dispatch => {
        EducationService.GetAll().
            then(_response => {
                if(!_response.success){
                    _dispatch(Fail(_response.exception));
                    toast.error(_response.Exception);
                    return;
                }
                _dispatch(Success(_response.data));
               
               
            }).
            catch(_e=>{
                console.log("Kurslar getirilemedi");
                _dispatch(Fail("Kurslar getirilemedi"));

            });
    };
    function Success(_value) {return {type:Constant.GetCurrentCourseSuccess,Payload: _value};}
    function Fail(_items) {return{type:Constant.GetCurrentCourseFail, Payload:_items};}
}

const Add=(_course) =>{
    return _dispatch =>{
        EducationService.Add(_course).
            then(_response=> {
                if(!_response.success){
                    _dispatch(Fail(_response.exception));
                    console.log(_response.exception);
                    return;
                }
                 
                _dispatch(Success(_response.data));
                toast.success("Kurs eklendi")

            }).
            catch(_ex=>{
                _dispatch(Fail("Kurs Eklenemedi"));
                toast.error("Kurs eklendi.");
            });
    };
    function Success(_item) {return {type:Constant.AddCourseSuccess,Payload:_item};}
    function Fail(_item) {return {type:Constant.AddCourseFail,Payload:_item};}
}

const WillBeMentor=(_course)=>{
    return _dispatch =>{
        EducationService.Update(_course).
            then(_response =>{
                if(!_response.success){
                    return;
                }
                _dispatch(Success(_response.data));
                toast.success("İlgili kursa mentor olundu.");


            }).
            catch(_ex=>{

            });
    }

    function Success(_item) {return {type:Constant.WillBeMentorSuccess,Payload:_item};}
}

const JoinCourse=(_item)=>{
    return _dispatch =>{
        EducationService.AddUser(_item).
            then(_response=>{
                if(!_response.success){
                    toast.warning("Aynı kursa bir daha kayıt yaptıramazsınız");
                    return ;
                }
                _dispatch(Success(_response.data));
                toast.success("Kursa kayıt yapıldı.");
            }).
            catch(_ex=>{
                toast.error("Beklenmeyen bir hata oluştu");
            });
   
    }
 function Success(_item) {return {type:Constant.JoinCourseSuccess,Payload:_item};}
}

const GetAllJoinUsers=(_courseId)=>{
    return _dispatch =>{
        EducationService.GetAllUsers(_courseId).
            then(_response=>{
                if(!_response){
                    toast.error("Kursa kayıt yaptıranlar getirilmedi.");
                }
                _dispatch(Success(_response.data));
                toast.success("Kullanıcılar getirildi");
            }).
            catch(_e=>{

            });
    }
    function Success(_item) {return{ type:Constant.GetAllJoinUsers, Payload:_item};}
}
export default { GetCurrentCourse,Add,WillBeMentor,JoinCourse,GetAllJoinUsers}