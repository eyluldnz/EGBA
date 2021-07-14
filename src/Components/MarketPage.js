import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import StoreIcon from '@material-ui/icons/Store';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { green } from '@material-ui/core/colors';
import { AddMarket } from '../Pages/AddMarket';
import { AddMarketItem } from "../Pages/AddMarketItem";
import {MarketItemList} from "../Pages/MarketItemList";
import Modal from './Modal';


import { IconButton, TableRow, Container } from '@material-ui/core';
import MarketAction from '../Actions/MarketAction';
import { connect } from 'react-redux';


class MarketComponent extends Component {

    constructor() {
        super();
        this.state = {
            showAddModal: false,
            showAddItemModal: false,
            Id: 0,
            StartDate: '',
            FinishDate: '',
            Subject: '',
            Description: '',
            Id: 0,
            MarketId: 0,
            PanelId:0,
        };
     }

    showAddModal = (_marketId,_panel) => {
        this.setState({ showAddModal: true, MarketId: _marketId, PanelId:_panel})
    }

    hideAddModal = () => {
        this.setState({ showAddModal: false })
    }

    showAddItemModal = () => {
        this.setState({ showAddItemModal: true })
    }

    hideAddItemModal = () => {
        this.setState({ showAddItemModal: false })
    }
    showItemListModal = (_marketId,_panel) => {
        this.setState({ showItemListModal: true, MarketId: _marketId, PanelId:_panel })
    }

    hideItemListModal = () => {
        this.setState({ showItemListModal: false })
    }


    componentDidMount() {
        this.props.GetCurrentMarketList();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.CurrentMarketList.Data!==null && prevProps.CurrentMarketList.Data.length!==this.props.CurrentMarketList.Data.length) {
            
            this.render();
            
        }
        
       
    }


    render() {

        const { CurrentMarketList,AddedMarketList,AddedMarketItem} = this.props;

        if (!CurrentMarketList.Data) {
            console.log("Data yok");
            return " ";

        }

        if (AddedMarketList.Data!==null && this.state.showAddItemModal) {
            this.hideAddItemModal();
            AddedMarketList.Data = null;
        }
        if (AddedMarketItem.Data==0 && this.state.showAddModal) {
            this.hideAddModal();
            AddedMarketItem.Data = null;
        }

        const item_market = markets => {
            return (
                markets.map(market => {
                    return (
                        <TableRow>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <StoreIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={market.subject}
                                    secondary={market.description}
                                />

                                <IconButton aria-label="Add" onClick={() => this.showItemListModal(market.id,1)} style={{ display: 'block', margin: 'auto' }}>
                                    <ListIcon />
                                </IconButton>
                                <IconButton  onClick={() => this.showAddModal(market.id,2)} style={{ display: 'block', margin: 'auto' }}>
                                    <PersonAddIcon />
                                </IconButton>

                            </ListItem>
                        </TableRow>
                    );

                })
            )
        }
        return (
            <div>
                <h3>Market</h3>

                {this.state.MarketId != 0 && this.state.PanelId==2 && (
                    <Modal show={this.state.showAddModal} handleClose={this.hideAddModal}>
                        <Container>
                            <AddMarketItem MarketId={this.state.MarketId} />
                        </Container>
                    </Modal>)}

                    {this.state.MarketId != 0 && this.state.PanelId==1 && (
                    <Modal show={this.state.showItemListModal} handleClose={this.hideItemListModal}>
                        <Container>
                        <MarketItemList MarketId={this.state.MarketId}  />
                        </Container>
                    </Modal>)}

                <TableContainer  style={{overflowY:"scroll", height:620}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <Modal show={this.state.showAddItemModal} handleClose={this.hideAddItemModal}>
                                    <Container>
                                        <AddMarket/>
                                    </Container>
                                </Modal>
                                <IconButton className="float-right" edge="end" aria-label="Add" onClick={this.showAddItemModal} style={{ display: 'block', margin: 'auto' }}>
                                    <AddIcon style={{ color: green[400] }} />
                                </IconButton>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item_market(CurrentMarketList.Data)}
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>

        )
    }
}
const MapStateToProps = _state => {

    const { CurrentMarketList,AddedMarketList }=_state.MarketReducer;

    const {AddedMarketItem} = _state.MarketItemReducer;

    return { CurrentMarketList, AddedMarketList , AddedMarketItem};
}

const MapDispatchToProps = (_dispatch, _ownProps) => {
    return {
        GetCurrentMarketList: () => _dispatch(MarketAction.GetCurrentMarketList())
    }
}
export const MarketPage = connect(MapStateToProps, MapDispatchToProps)(MarketComponent);
