import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import { Container } from '@material-ui/core';
import { ListMyCourses } from '../Pages/ListMyCourses';
import UserAction from '../Actions/UserAction';
import { UserMarketItems } from '../Pages/UserMarketItems';
import AuthenticationAction from '../Actions/AuthenticationAction';

class NavbarComps extends Component {

    state={
        showCourses:false,
        showMarketItems:false,
        renderMarkerts:false,
        renderCourses:false

    }
    componentDidMount(){
        this.props.GetUser(localStorage.getItem("user_"));
    }
    componentDidUpdate(prevProps){
        if(!prevProps.User){
            this.props.GetUser(this.props.User.id);
            this.render();
        }
    }
    showMyCourses=(_user)=>{
        if(_user){
             this.setState({ showCourses: true,renderCourses:true })
        }
       
    }
    hideMyCourses = () => {
            this.setState({ showCourses: false })
    }

    showMyMarketItems=(_user)=>{
        if(_user){
            this.setState({ showMarketItems: true,renderMarkerts:true })
        }
        
    }
    hideMyMarketItems = () => {
        this.setState({ showMarketItems: false })
    }


    logout = () => {
        swal({
            text: "Çıkış yapmak istiyor musunuz?",
            icon: "info",
            buttons: ["Hayır", "Evet"]
        }).then(_res => {
            if (_res === true) {
                this.props.Logout();
            }
        })
    }

    render() {
        const {User}=this.props;
        if(User==undefined){
            return "";
        }
        return (
            <div>
                {this.state.renderCourses && (<Modal show={this.state.showCourses} handleClose={this.hideMyCourses}>
                    <Container>
                        <ListMyCourses UserId={localStorage.getItem("user_")}/>
                    </Container>
                </Modal>)}

                {this.state.renderMarkerts && (<Modal show={this.state.showMarketItems} handleClose={this.hideMyMarketItems}>
                    <Container>
                        <UserMarketItems UserId={localStorage.getItem("user_")}/>
                    </Container>
                </Modal>)}
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">EGBA SİSTEM</Navbar.Brand>
                   
                    <h5 style={{ marginLeft:690, marginRight: 130 }}>Hoşgeldin {User.name ? User.name : " "}</h5>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            

                            <NavDropdown style={{ marginLeft: 575, marginRight: 30 }} title={User.name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>this.showMyCourses({User})}>Kurslarım</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>this.showMyMarketItems({User})}>Market İsteklerim</NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => this.logout()}>Çıkış Yap</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>




            </div>
        )
    }
}
const MapStateToProps= _state=>{
    const {User}= _state.AuthenticationReducer;

    return {User};
}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetUser : (_userId) => _dispatch(UserAction.GetUser(_userId)),
        Logout:() =>_dispatch(AuthenticationAction.Logout())
        
    }
}

export const NavBar=connect(MapStateToProps,MapDispatchToProps)(NavbarComps);
