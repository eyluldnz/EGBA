
import React, { Component } from 'react'
import  EducationAction  from '../Actions/EducationAction';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { blue } from '@material-ui/core/colors';

class EducationListComponent extends Component {


    componentDidMount(){
        this.props.GetAllJoinUsers(this.props.CourseId);
    }
    componentDidUpdate(prevProps) {

        if (prevProps.CourseId !== this.props.CourseId) {
            this.props.GetAllJoinUsers(this.props.CourseId);
        }
        if (prevProps.GetAllUsers) {
            this.render();
        }
    }

    render() {
        const {GetAllUsers}=this.props;

        if(!GetAllUsers.Data){
            return "";
        }
        const list_item = items => {
           

            return (

                items.map(item => {
                        return (
                            <TableRow style={{ marginTop:5 }}>
                                <TableCell  align="center">
                                    {item.username}
                                </TableCell>
                                <TableCell align="center"> {item.educationSubject}</TableCell>
                            </TableRow>
                           

                        )
                })
            );
        }
        const _items = list_item(GetAllUsers.Data);
        let MentorName="- ";
        if(GetAllUsers.Data.length>0){
            MentorName=GetAllUsers.Data[0].mentorName;
        }
        return (
            
            <div style={{ padding: 30}}>
                <TableContainer style={{paddingLeft:5} }component={Paper}>
                    
                    <Table>
                        <TableHead>
                            <TableRow  style={{ float:'right'}} ><h4 style={{ marginLeft:10,color:"#3B177C"}}>Kayıt Yaptıranlar Kullanıcılar</h4></TableRow>
                            <TableRow>
                                <TableCell align="center"><h5 style={{ color:"#3B177C"}}> Kursa Katılan: </h5> </TableCell>
                                <TableCell align="center"><h5 style={{ color:"#3B177C"}}>Kayıt Yapılan Kurs: </h5></TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_items}
                        </TableBody>
                        <hr></hr>
                        <TableRow ><h5 style={{ float:'right'}}>Eğitimi verecek kişi:<span>{ MentorName}</span></h5></TableRow>
                    </Table>
                </TableContainer>
                </div>
        )
    }
}

const MapStateToProps=_state=>{
    const { GetAllUsers } = _state.EducationReducer;
    return {GetAllUsers};
}

const MapDispatchToProps =(_dispatch, _ownProps) =>{
    return {
        GetAllJoinUsers:(_id) => _dispatch(EducationAction.GetAllJoinUsers(_id)),
    };
}

export const EducationList=connect(MapStateToProps,MapDispatchToProps)(EducationListComponent);


