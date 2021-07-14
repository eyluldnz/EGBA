import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FolderIcon from '@material-ui/icons/Folder';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { IconButton, TableRow, Container, Button } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import ListIcon from '@material-ui/icons/List';
import { AddEducation } from '../Pages/AddEducation';
import EducationAction from '../Actions/EducationAction';
import { connect } from 'react-redux';
import Modal from './Modal';
import swal from 'sweetalert';
import { EducationList }  from '../Pages/EducationList';





class EducationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showItemListModal: false,
            Id: 0,
            StartDate: '',
            FinishDate: '',
            Subject: '',
            MentorId: 0,
            UserId: 0,
            isAdded: false,
           


        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }
    updateValue = 1;
    NewCourse = 0;

    componentDidMount() {
        this.props.GetCurrentCourse();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.Currentcourses.Data !== null && prevProps.Currentcourses.Data.length !== this.props.Currentcourses.Data.length) {
            this.render();
        }
    }



    showModal = () => {
        this.setState({ show: true })
    }

    hideModal = () => {
        this.setState({ show: false })
    }

    hideItemListModal = () => {
        this.setState({ showItemListModal: false })
    }
    showItemListModal = (_courseId,) => {
        this.setState({ showItemListModal: true, Id: _courseId})
    }

    mentorAdd = (_course) => {
        let _id = localStorage.getItem('user_');

        let addedMentor = {
            Id: _course.id,
            StartDate: _course.startDate,
            FinishDate: _course.finishDate,
            Subject: _course.subject,
            MentorId: _id
        };
        swal({
            text: "Kursa mentor olmak istiyor musunuz?",
            icon: "info",
            buttons: ["Hayır", "Evet"]
        }).then(_res => {
            if (_res === true) {
                this.props.WillBeMentor(addedMentor);
            }
        })

       
        this.updateValue = 0;
        this.setState({ isAdded: false })
    }

    joinCourse = (_userId, _courseId) => {

        let joinCourse = {
            EducationId: _courseId,
            UserId: _userId
        };
        swal({
            text: "Kursa kayıt olmak istiyor musunuz?",
            icon: "info",
            buttons: ["Hayır", "Evet"]
        }).then(_res => {
            if (_res === true) {
                this.props.JoinCourse(joinCourse);
            }
        })
    }


    render() {

        const { Currentcourses, AddCourse } = this.props;
        if (!Currentcourses.Data) {
            console.log("Data yok");
            return " ";

        }
        if (AddCourse.Data && this.state.show) {
            this.hideModal();

            AddCourse.Data = null;
        }



        const element_courses = courses => {
            return (

                courses.map(course => {
                    let buttonMentor;
                    if (course.mentorId == null) {

                        buttonMentor = <SchoolIcon onClick={() => this.mentorAdd(course)}></SchoolIcon>;;
                    }
                    else {
                        buttonMentor = "";
                    }

                    return (
                        <TableRow>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={course.subject}
                                    secondary={course.startDate.toString().slice(0, 10) + " - " + course.finishDate.toString().slice(0, 10)}
                                />
                                <IconButton >
                                    {buttonMentor}
                                </IconButton>

                                <IconButton edge="end" aria-label="Add" onClick={() => this.joinCourse(localStorage.getItem('user_'), course.id)} style={{ display: 'block', margin: 'auto' }}>
                                    <PersonAddIcon />
                                </IconButton>
                                <IconButton aria-label="Add" onClick={() => this.showItemListModal(course.id)}  style={{ display: 'block', margin: 'auto' }}>
                                    <ListIcon />
                                </IconButton>


                            </ListItem>
                        </TableRow>
                    );
                })

            );
        }


        return (
            <div style={{maxHeight: '100%', overflow: 'auto'}} >
                <h3>Eğitim</h3>

                {this.props.AddCourse.Data == null && (<Modal show={this.state.show} handleClose={this.hideModal}>
                    <Container>
                        <AddEducation CourseId={this.state.isAdded} />
                    </Container>
                </Modal>)}

                {this.state.Id != 0  &&  (
                    <Modal show={this.state.showItemListModal} handleClose={this.hideItemListModal}>
                        <Container>
                            <EducationList CourseId={this.state.Id} />
                        </Container>
                    </Modal>)}

                <TableContainer component={Paper} style={{overflowY:"scroll", height:620}}>
                    <Table  aria-label="sticky table">
                        <TableHead>
                            <TableRow>

                                <IconButton className="float-right" edge="end" aria-label="Add" onClick={this.showModal} style={{ display: 'block', margin: 'auto' }}>
                                    <AddIcon style={{ color: green[400] }} />
                                </IconButton>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {element_courses(Currentcourses.Data)}

                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

        )
    }
}

const MapStateToProps = _state => {
    const { Currentcourses, AddCourse, AddUserToCourse } = _state.EducationReducer;
    return { Currentcourses, AddCourse, AddUserToCourse };

}



const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetCurrentCourse: () => _dispatch(EducationAction.GetCurrentCourse()),
        WillBeMentor: (_data) => _dispatch(EducationAction.WillBeMentor(_data)),
        JoinCourse: (_data) => _dispatch(EducationAction.JoinCourse(_data))
    }
}

export const EducationPage = connect(MapStateToProps, MapDispatchToProps)(EducationComponent);

