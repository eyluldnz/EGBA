import Constant from '../Constants/UserConstant';
import Constants from '../Constants/AuthenticationConstant';
import { UserService } from '../Services/UserService';
import { toast } from 'react-toastify';

const GetMarketItems = (_userId) =>{
    return _dispatch => {
        UserService.GetAllItems(_userId).
            then(_response =>{
                if(!_response.success){
                    _dispatch(Fail(_response.exception));
                    toast.error(_response.Exception);
                    return;
                }
                _dispatch(Success(_response.data));
                toast.success("Market listesi getirildi");
                
               
            }).
            catch(_e=>{
                

            });
    };
    function Success(_value) {return {type:Constant.UserMarketItemsSuccess,Payload: _value};}
    function Fail(_items) {return{type:Constant.UserMarketItemsSuccess, Payload:_items};}
}

const GetCourses=(_userid) =>{
    return _dispatch => {
        UserService.GetAllCourses(_userid).
            then(_response=>{
                if(!_response.success){

                }
                _dispatch(Success(_response.data));
            }).
            catch(_ex=>{

            });
    };
    function Success(_item) {return {type:Constant.UserCoursesSuccess, Payload:_item};}
}

const GetUser=(_id) =>{
    return _dispatch =>{
        UserService.GetUser(_id).
            then(_response=>{
                if(!_response.success){
                    return;
                }
                _dispatch(Success(_response.data));
            }).
            catch(_ex=>{

            });
    };
    function Success(_item) {return {type:Constants.LoginSuccess,Payload:_item};}
}

const RemoveMarket=(_item)=>{
    return _dispatch =>{
        UserService.RemoveMarketItem(_item).
            then(_response=>{
                if(!_response.success){

                }
                _dispatch(Success())
                toast.success("Market isteği kaldırıldı.");
            }).
            catch(_ex=>{

            });
    };
    function Success() {return {type:Constant.RemoveMarketItemSuccess,Payload:_item.id};}
}

const RemoveCourse=(_item)=>{
    return _dispatch =>{
        UserService.RemoveCourse(_item).
            then(_response=>{
                if(!_response.success){

                }
                _dispatch(Success())
                toast.success("Kurs kaldırıldı.");
            }).
            catch(_ex=>{

            });
    };
    function Success() {return {type:Constant.RemoveCourseSuccess,Payload:_item.id};}
}

export default{GetMarketItems,GetUser,GetCourses,RemoveMarket,RemoveCourse}