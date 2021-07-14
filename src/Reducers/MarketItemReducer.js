import Constant from '../Constants/MarketConstant';

const initialState={
    AddedMarketItem:{
        Data:null,
        Error:null,
        Loading:false
    },
    AllItem:{
        Data:null,
        Error:null,
        Loading:false
    },
    UpdatedItem:{
        Data:null,
        Error:null,
        Loading:false
    },
    MarketItemById:{
        Data:null,
        Error:null,
        Loading:false
    }
}


export default function MarketItemReducer(state=initialState,_action){

    switch(_action.type){

        case Constant.AddMarketItemSuccess:
            return {
                ...state,
                AddedMarketItem:{
                    Data:_action.Payload,
                    Error:null,
                    Loading:false
                }
            }

        case Constant.GetAllItemSuccess:
            return{
                ...state,
                AllItem:{
                    Data:_action.Payload,
                    Error:null,
                    Loading:false
                }
            }
        case Constant.UpdateMarketItemSuccess:
            return{
                ...state,
                UpdatedItem:{
                    Data:_action.Payload,
                    Error:null,
                    Loading:false
                },
                AllItem:{
                    Data: state.AllItem.Data.map(x=>x.id !== _action.Payload.id ? x : {...x, ..._action.Payload}),
                    Error:null,
                    Loading:false
                }
            }
        case Constant.GetItemByIdSuccess:
            return{
                ...state,
                MarketItemById:{
                    Data:_action.Payload,
                    Error:null,
                    Loading:false
                }
            }

        default:
            return state

}

}