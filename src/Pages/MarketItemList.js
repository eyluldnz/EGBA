import React, { Component } from 'react'
import { connect } from 'react-redux';
import MarketItemAction from '../Actions/MarketItemAction';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '../Components/Modal';
import { Container } from '@material-ui/core';
import { MarketItemUpdate } from './MarketItemUpdate';


class ItemList extends Component {
    state = {
        Item: "",
        Count: "",
        showEditModal: false,
        ItemId:-1

    }

    showEditModal = (_marketItemId) => {
        this.setState({ showEditModal: true, ItemId:_marketItemId })
    }

    hideEditModal = () => {
        this.setState({ showEditModal: false })

    }

    componentDidMount() {
        this.props.GetAllItem(this.props.MarketId);
    }
    componentDidUpdate(prevProps) {

        if (prevProps.MarketId !== this.props.MarketId) {
            this.props.GetAllItem(this.props.MarketId);
        }
        if (prevProps.AllItem) {
            this.render();
        }
    }

    
    render() {


        const { AllItem } = this.props;
        if (!AllItem.Data) {
            return " ";
        }

        const list_item = items => {

            return (

                items.map(item => {

                    let button;
                    if (item.userId===parseInt(localStorage.getItem('user_'))){
                        button=<Button variant="contained" color="secondary" size="small" onClick={() => this.showEditModal(item.id)}>Düzenle</Button>;
                    }
                    else{
                        button=" ";
                    }
                        return (
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {item.marketName}
                                </TableCell>
                                <TableCell align="right"> {item.item}</TableCell>
                                <TableCell align="right"> {item.count}</TableCell>
                                <TableCell align="right"> {item.username}</TableCell>
                               

                                <TableCell align="right">{button}</TableCell>

                            </TableRow>

                        )
                })
            );
        }

        const _items = list_item(AllItem.Data);

        return (

            <div className="marketlist" style={{ padding: 25 }}>

                {this.state.ItemId != -1 && (
                    <Modal show={this.state.showEditModal} handleClose={this.hideEditModal}>
                        <Container>
                            <MarketItemUpdate ItemId={this.state.ItemId}/>
                        </Container>
                    </Modal>)}

                <TableContainer component={Paper}>
                    
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Market</TableCell>
                                <TableCell align="right">Alınacaklar</TableCell>
                                <TableCell align="right">Adet</TableCell>
                                <TableCell align="right">İsteyen kişi</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_items}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const MapStateToProps = _state => {
    const { AllItem } = _state.MarketItemReducer;
    return { AllItem };
}

const MapDispatchToProps = (_dispatch, _ownProps) => {

    return {
        GetAllItem: (_id) => _dispatch(MarketItemAction.GetAllItem(_id))
    };
}

export const MarketItemList = connect(MapStateToProps, MapDispatchToProps)(ItemList);