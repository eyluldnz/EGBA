import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import EducationAction from '../Actions/EducationAction';
import EducationReducer from '../Reducers/EducationReducer';
import '../index.css';
import { toast } from 'react-toastify'


class AddEducationComp extends Component {

    state = {
        StartDate: "",
        FinishDate: "",
        Subject: "",   
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isAdded!==this.props.isAdded){
            this.setState(
                {
                    StartDate: "",
                    FinishDate: "",
                    Subject: "", 
                }
            )
        }
      
    }
    

    Add = () => {
        const { StartDate, FinishDate, Subject } = this.state;

        if (StartDate > FinishDate) {

            toast.warning("Başlangıç tarihi bitiş tarihinden büyük olamaz");
            return;
        }
        if (!StartDate) {

            toast.warning("Alanlar boş geçilemez");
            return;
        }

        let _newEducation = {
            StartDate,
            FinishDate,
            Subject,
        }

        this.setState({
            StartDate: "",
            FinishDate: "",
            Subject: "",
        });
        
        this.props.Add(_newEducation);
    }

    HandleChange = (_e) => {
        const { name, value } = _e.target;
        this.setState({ [name]: value });
    }
    render() {
        
             return (
            <div className="add-education" style={{ padding: 50 }}>

                <Grid container spacing={10} alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Başlangıç Tarihi"
                            type="date"
                            value = {this.state.StartDate}
                            name="StartDate"
                            onChange={this.HandleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Bitiş Tarihi"
                            type="date"
                            value = {this.state.FinishDate}
                            name="FinishDate"
                            onChange={this.HandleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            defaultValue=""
                            onChange={this.HandleChange}
                            name='Subject'
                            value = {this.state.Subject}
                            autoFocus
                            margin="dense"
                            label="Açılacak Kurs Konusu"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button style={{ marginTop: 20 }} onClick={this.Add} color="primary" variant="contained"> Ekle</Button>
                    </Grid>

                </Grid>



            </div>
        ) 
   
      
    }
}

const MapStateToProps = _state => {

    const { AddCourse } = _state.EducationReducer;

    return { AddCourse };

}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        Add: (_newCourse) => _dispatch(EducationAction.Add(_newCourse)),
        GetCurrentCourse: () => _dispatch(EducationAction.GetCurrentCourse()),

    }
}

export const AddEducation = connect(MapStateToProps, MapDispatchToProps)(AddEducationComp);
