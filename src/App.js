import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import {LoginPage} from './Pages/LoginPage';
import { HomePage}  from './Pages/HomePage';
import { connect } from 'react-redux';
import { Component } from 'react';
import { History } from './Tools/History';
import { AddEducation } from './Pages/AddEducation';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import {PrivateRoute} from './Components/PrivateRoute';

class App extends Component {

  constructor(_props) {
    super(_props);
    History.listen((location, action) => {
    });

}
render = ()=> {
  return ( 
  <div>
    <ToastContainer />
    <Router history={History}>
     
    <Switch>
      <Route exact path={ process.env.PUBLIC_URL+"/login" } component={LoginPage} />
      <PrivateRoute exact path={ process.env.PUBLIC_URL+"/"} component={ HomePage} />
      <PrivateRoute exact path={+process.env.PUBLIC_URL+"/add_education"} component={AddEducation}/>
    </Switch>
    </Router>
  </div>
  
    
  );
}
}

const MapStateToProps = _state => {

  const { User } = _state.AuthenticationReducer;

  return { User };
}

export default connect(MapStateToProps, null)(App);