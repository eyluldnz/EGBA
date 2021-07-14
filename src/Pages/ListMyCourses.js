import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAction from '../Actions/UserAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class ListMyCoursesComponent extends Component {

    componentDidMount() {
        this.props.GetCourses(this.props.UserId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.UserCourses.Data!==null && prevProps.UserCourses.Data.length!==this.props.UserCourses.Data.length) {
            this.render();
        }
    }

    removeCourse=(_course)=>{
        swal({
            text: "Kursu silmek istiyor musunuz?"+ _course.id,
            icon: "info",
            buttons: ["Hayır", "Evet"]
        }).then(_res => {
            if (_res === true) {
                this.props.RemoveCourse(_course);
             }
        })

    }



    render() {
        const { UserCourses } = this.props;
        if (UserCourses.Data == null) {
            return "";
        }
        const list_item = items => {

            return (

                items.map(item => {



                    return (
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {item.educationSubject}
                            </TableCell>
                            <TableCell align="center"> {item.startDate.toString().slice(0, 10)}</TableCell>
                            <TableCell align="center"> &nbsp;&nbsp;{item.finishDate.toString().slice(0, 10)}</TableCell>
                            <TableCell align="center"> {item.mentorName}</TableCell>
                            <TableCell>  <Button  onClick={() => this.removeCourse( item)} variant="contained" color="secondary"startIcon={<DeleteIcon />}>Kaldır</Button></TableCell>

                        </TableRow>

                    )
                })
            );
        }

        const _items = list_item(UserCourses.Data);
        return (
            <div>
                <div className="courselist" style={{ padding: 25 }}>

                    {/* {this.state.ItemId != -1 && (
                        <Modal show={this.state.showEditModal} handleClose={this.hideEditModal}>
                            <Container>
                                <MarketItemUpdate ItemId={this.state.ItemId} />
                            </Container>
                        </Modal>)} */}

                    <TableContainer component={Paper}>

                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kurs</TableCell>
                                    <TableCell align="center">Başlangıç</TableCell>
                                    <TableCell align="center"> Bitiş</TableCell>
                                    <TableCell align="center">Mentor</TableCell>
                                    <TableCell align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_items}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }

}
const MapStateToProps = _state => {
    const { UserCourses } = _state.UserReducer;
    return { UserCourses };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetCourses: (_userid) => _dispatch(UserAction.GetCourses(_userid)),
        RemoveCourse:(_item)=> _dispatch(UserAction.RemoveCourse(_item))

    }
}
export const ListMyCourses = connect(MapStateToProps, MapDispatchToProps)(ListMyCoursesComponent);
