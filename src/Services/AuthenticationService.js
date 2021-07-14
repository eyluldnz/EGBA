import {RequestTool} from '../Tools/RequestTool';



const Login = (_username ,_password) => RequestTool.PostRequest( process.env.REACT_APP_API_URL+ "/login/validate", //url kısmı
    {
        //data kısmı
        "username":_username,
        "password":_password
    });

    export const AuthenticationService= { Login };

    //var _UserApiUrl = "https://localhost:6061"
