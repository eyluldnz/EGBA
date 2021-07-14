import React, { Component } from 'react'
import { connect } from 'react-redux';
import MarketAction from '../Actions/MarketAction'
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import { toast } from 'react-toastify'

class AddMarketComponent extends Component {

    state = {
        Subject: '',
        Description: '',
        StartDate: '',
        FinishDate: '',
        UserId: null
    }

    Add = () => {

        const { Subject, Description, StartDate, FinishDate, UserId } = this.state;

        if (StartDate > FinishDate) {

            toast.warning("Başlangıç tarihi bitiş tarihinden büyük olamaz");
            return;
        }
        if (!StartDate && !FinishDate && !Subject && !Description) {

            toast.warning("Alanlar boş geçilemez");
            return;
        }


        let newMarketList = {
            Subject,
            Description,
            StartDate,
            FinishDate,
            UserId: localStorage.getItem("user_")

        }

        this.setState({
            Subject: '',
            Description: '',
            StartDate: '',
            FinishDate: '',

        })

        this.props.Add(newMarketList);
    }

    HandleChange = (_e) => {

        const { name, value } = _e.target;

        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className="add-market" style={{ padding: 35 }}>

                <Grid container spacing={10} alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Başlangıç Tarihi"
                            type="date"
                            value={this.state.StartDate}
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
                            value={this.state.FinishDate}
                            name="FinishDate"
                            onChange={this.HandleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={this.state.Subject}
                            onChange={this.HandleChange}
                            name='Subject'
                            autoFocus
                            margin="dense"
                            label="Market Adı"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                             value={this.state.Description}
                            onChange={this.HandleChange}
                            name='Description'
                            autoFocus
                            margin="dense"
                            label="Açıklama"
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
    return;
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        Add: (_newMarketList) => _dispatch(MarketAction.Add(_newMarketList))
    }
}

export const AddMarket = connect(MapStateToProps, MapDispatchToProps)(AddMarketComponent);