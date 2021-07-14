import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import MarketAction from '../Actions/MarketAction';
import MarketItemAction from '../Actions/MarketItemAction';
import {toast} from 'react-toastify'


class AddMarketItemComponent extends Component {

    state = { 
        request: "",
        count:""
     }

    Add = () => {
        const {request, count}=this.state;

        if(!request && !count){
            toast.warning("Alanlar boş geçilemez");
            return;

        }

        let addState={
            Item: this.state.request,
            Count:this.state.count,
            MarketId:this.props.MarketId,
            UserId:localStorage.getItem("user_")
        }

        this.props.AddMarketItem(addState);

        console.log({ Item: this.state.request, MarketId: this.props.MarketId });
    }

    componentDidMount() {
        this.props. GetMarketById(this.props.MarketId);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.MarketId !== this.props.MarketId) {
            this.props. GetMarketById(this.props.MarketId);
            this.setState({ request: "" });
        }
    }

    render() {

        const { MarketItem} = this.props;

        if (!MarketItem.Data) {
            console.log("Data yok");
            return "";
        }
       
        return (
            <div className="add-marketlist" style={{ padding: 70 }}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item>
                        <TextField
                            value={MarketItem.Data.startDate.toString().slice(0, 10)}
                            fullWidth
                            disabled={true}
                            label="Başlangıç Tarihi"
                            type="date"
                            name="StartDate"

                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={true}
                            fullWidth
                            label="Bitiş Tarihi"
                            type="date"
                            value={MarketItem.Data.finishDate.toString().slice(0, 10)}
                            name="FinishDate"

                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                        value={MarketItem.Data.subject}
                            disabled={true}
                            name='Subject'
                            autoFocus
                            margin="dense"
                            label="Market Adı"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={true}
                            value={MarketItem.Data.username}
                            name='Username'
                            autoFocus
                            margin="dense"
                            label="Talebi Açan kişi"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            disabled={true}
                            value={MarketItem.Data.description}
                            name='Description'
                            autoFocus
                            margin="dense"
                            label="Açıklama"
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField value={this.state.request}

                            onChange={(_e) => this.setState({ request: _e.target.value })}
                            name='Item'
                            autoFocus
                            margin="dense"
                            label="İstekler"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField value={this.state.count}

                            onChange={(_e) => this.setState({ count: _e.target.value })}
                            name='Count'
                            autoFocus
                            margin="dense"
                            label="Adet"
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

    const { MarketItem} = _state.MarketReducer;
    const {AddedMarketItem} =_state.MarketItemReducer;
    return { MarketItem,AddedMarketItem};
}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetMarketById: (_id) => _dispatch(MarketAction.GetMarketById(_id)),
        AddMarketItem: (_data) => _dispatch(MarketItemAction.AddMarketItem(_data))
    }
}

export const AddMarketItem = connect(MapStateToProps, MapDispatchToProps)(AddMarketItemComponent);
