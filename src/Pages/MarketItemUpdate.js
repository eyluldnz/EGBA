import React, { Component } from 'react'
import { connect } from 'react-redux';
import MarketAction from '../Actions/MarketAction';
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import MarketItemAction from '../Actions/MarketItemAction';
import {toast} from 'react-toastify'

class MarketItemUpdateComponent extends Component {

    state = {
        request: "",
        count: "",
        loaded: false
    }
 

    componentDidMount() {

        this.props.GetItem(this.props.ItemId);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.ItemId !== this.props.ItemId) {

            this.props.GetItem(this.props.ItemId);
            this.setState({ request: "" });
        }


    }
    

    static getDerivedStateFromProps(props,state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (!state.loaded && props.MarketItemById && props.MarketItemById.Data) {

          return {
              loaded: true,
                request: props.MarketItemById.Data.item,
                count:props.MarketItemById.Data.count
          };
        }
        return null;
      }
    Update = (_id) => {
        const {request,count}=this.state;

        if(!request && !count){
            toast.warning("Alanlar boş geçilemez");
            return;

        }

        let updateState = {
            Id: _id,
            Item: this.state.request,
            Count: this.state.count,
        }

        this.props.UpdateItem(updateState);
    }

    render() {

        const { MarketItemById } = this.props;
        if (!MarketItemById.Data) {
            console.log("Data yok");
            return "";
        }


        return (
            <div className="update-marketlist" style={{ padding: 70 }}>

                <Grid container spacing={5} alignItems="center">
                    <Grid item>
                        <TextField
                            value={MarketItemById.Data.startDate.toString().slice(0, 10)}
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
                            value={MarketItemById.Data.finishDate.toString().slice(0, 10)}
                            name="FinishDate"

                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={MarketItemById.Data.subject}
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
                            value={MarketItemById.Data.username}
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
                            value={MarketItemById.Data.description}
                            name='Description'
                            autoFocus
                            margin="dense"
                            label="Açıklama"
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            value={MarketItemById.Data.item}

                            onChange={(_e) => this.setState({ request: _e.target.value })}
                            name='Item'
                            autoFocus
                            margin="dense"
                            label="İstekler"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField

                            value={this.state.count}

                            onChange={(_e) => this.setState({ count: _e.target.value })}
                            name='Count'
                            autoFocus
                            margin="dense"
                            label="Adet"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button style={{ marginTop: 20 }} onClick={()=>this.Update(MarketItemById.Data.id)} color="primary" variant="contained"> Düzenle</Button>
                    </Grid>

                </Grid>



            </div>
        )
    }
}

const MapStateToProps = _state => {
    const { MarketItemById } = _state.MarketItemReducer;

    return { MarketItemById };

}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetItem: (_id) => _dispatch(MarketItemAction.GetItem(_id)),
        UpdateItem: (_id) => _dispatch(MarketItemAction.UpdateItem(_id))

    }
}
export const MarketItemUpdate = connect(MapStateToProps, MapDispatchToProps)(MarketItemUpdateComponent);