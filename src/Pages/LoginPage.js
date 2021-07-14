import React,{Component} from 'react';
import {connect} from 'react-redux';
import AuthenticationAction from '../Actions/AuthenticationAction';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class LoginComponent extends Component{
    state={
        Username:'',
        Password:''
    };
    constructor(props) {

        super(props);

        this.props.Logout();
    }
    Login= () => {  
        console.log(process.env);
        const {Username , Password}=this.state;
       
        if(!Username || !Password) {
            console.log("Kullanıcı veya şifre girilmedi");
            return;
        }
        this.props.Login(Username,Password); //button elementindeki onClick event ı tetiklendikten sonra çalışacak metot
    }

    HandleChange=(e)=>{ // inputlardaki onchange eventını ortak işlemleri için yazıldı.
        const {name , value}=e.target;
        
        this.setState({ [name]:value }); 
        //console.log(name+' '+ value);// statelere kullanıcı ve şifreler her çağrıldığında ekleniyor.
    }

    HandlePress=(e)=>{ // enter tuşuna basıldıktan sonra giriş için
        if(e.key==='Enter'){
            this.Login();
        }
    }

    render(){
        return(
            <div className="formdiv">
            <MuiThemeProvider>
              <div >
              <AppBar 
                 title="Giriş"
               />
               <TextField
               type="text"
                 name="Username"
                 hintText="Enter your Email"
                 floatingLabelText="Email"
                 onChange ={this.HandleChange}
                 
                 />
               <br/>
                 <TextField
                  name="Password"
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange = {this.HandleChange}
                   />
                 <br/>
                 <RaisedButton label="Giriş Yap" primary={true} className="form__custom-button"  onClick={this.Login}/>
             </div>
             </MuiThemeProvider>
          </div>
        )

    }
        
    

}

const MapStateToProps = _state => {
    const { LoginRequest} = _state.AuthenticationReducer;
    return {LoginRequest};
}

const MapDispatchToProps= _dispatch=>{
    return{
        Login:(_user,_password)=> _dispatch(AuthenticationAction.Login(_user,_password)),
        Logout: ()=> _dispatch(AuthenticationAction.Logout())
    }

}
export const LoginPage=connect(MapStateToProps,MapDispatchToProps)(LoginComponent);