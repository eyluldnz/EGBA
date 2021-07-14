import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAction from '../Actions/UserAction';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class UserMarketItemsComps extends Component {
    componentDidMount() {
        this.props.GetMarketItems(this.props.UserId);
        this.render();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.UserMarketItems.Data!==null && prevProps.UserMarketItems.Data.length!==this.props.UserMarketItems.Data.length) {
            this.render();
        }
    }
  

    removeItem=(item)=>{
        swal({
            text: "Market isteğini silmek istiyor musunuz?"+ item.id,
            icon: "info",
            buttons: ["Hayır", "Evet"]
        }).then(_res => {
            if (_res === true) {
                this.props.RemoveMarket(item)  }
        })

    }


    render() {
        const { UserMarketItems } = this.props;
        if (UserMarketItems.Data == null) {
            return "";
        }
        const list_item = items => {

            return (

                items.map(item => {

                    let button;
                    if (item.userId === parseInt(localStorage.getItem('user_'))) {
                        button = <Button variant="contained" color="secondary" size="small" onClick={() => this.showEditModal(item.id)}>Düzenle</Button>;
                    }
                    else {
                        button = " ";
                    }
                    return (
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {item.marketName}
                            </TableCell>
                            <TableCell align="right"> {item.item}</TableCell>
                            <TableCell align="right"> {item.count}</TableCell>
                            <TableCell align="right"> {item.requestUserName}</TableCell>


                            <TableCell>  <Button  onClick={() => this.removeItem( item )} variant="contained" color="secondary"startIcon={<DeleteIcon />}>Kaldır</Button></TableCell>

                        </TableRow>

                    )
                })
            );
        }

        const _items = list_item(UserMarketItems.Data);
        return (
            <div>
                <div className="marketlist" style={{ padding: 25 }}>

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
                                    <TableCell>Market</TableCell>
                                    <TableCell align="right">Alınacaklar</TableCell>
                                    <TableCell align="right">Adet</TableCell>
                                    <TableCell align="right">Talebi Açan kişi</TableCell>

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

    const { UserMarketItems,} = _state.UserReducer;

    return { UserMarketItems };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetMarketItems: (_userId) => _dispatch(UserAction.GetMarketItems(_userId)),
        RemoveMarket:(_item) => _dispatch(UserAction.RemoveMarket(_item))
    }
}

export const UserMarketItems = connect(MapStateToProps, MapDispatchToProps)(UserMarketItemsComps);
