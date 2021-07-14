import { toast } from 'react-toastify';
import Constant from '../Constants/AuthenticationConstant';
import {AuthenticationService} from '../Services/AuthenticationService';
import { History } from '../Tools/History';

function Fail() {return {type:Constant.LoginFail};}
function Request() {return{type:Constant.LoginRequest};}


const Login=(_username,_password) => {
    return _dispatch => {
     _dispatch(Request());

    AuthenticationService.Login(_username,_password).
        then(_response => {
            if(!_response.success){
                toast.error("Kullanıcı Bulunamadı");
                return;
            }

            localStorage.setItem('user_',_response.data.user.id);
            localStorage.setItem('token_',_response.data.token);
            _dispatch(Success(_response.data.user));
            History.push(process.env.PUBLIC_URL);
            console.log("Giriş yapılıyor");
            
        }).
        catch(_error => {
            console.log(_error);
            _dispatch(Fail());
    });

};
function Success(_item) { return {type:Constant.LoginSuccess,Payload:_item};}
}
const Logout =()=>{
    localStorage.clear("user_");
    return {type:Constant.Logout};
}

export default { Login, Logout}
