import Constant from '../Constants/MarketConstant';

const initialState={
    CurrentMarketList:{
        Data:null,
        Error:null,
        Loading:false
    },
    AddedMarketList:{
        Data:null,
        Error:null,
        Loading:false
    },
    MarketItem:{
        Data:null,
        Error:null,
        Loading:false

    }
  
}

export default function MarketReducer(state=initialState,_action){

    switch(_action.type){

        case Constant.GetMarketListSuccess:
            return{
                ...state,
                CurrentMarketList:{
                    Data:_action.Payload,
                    Error:null,
                    Loading:false
                },

            }
        
            case Constant.GetMarketListFail:
                return {
                    ...state,
                    CurrentMarketList:{
                        Data:null,
                        Error:_action.Payload,
                        Loading:false
                    }
                }

            case Constant.AddMarketListSuccess:
                return {
                    ...state,
                    AddedMarketList:{
                        Data:_action.Payload,
                        Error:null,
                        Loading:false
                    },
                    CurrentMarketList:{
                        Data:[...state.CurrentMarketList.Data,_action.Payload],
                        Error:null,
                        Loading:false
                    }
                }

            case Constant.AddMarketListFail:
                return{
                    ...state,
                    AddedMarketList:{
                        Data:null,
                        Error:_action.Payload,
                        Loading:false
                    }
                }

            case Constant.GetMarketItemByIdSuccess:
                return{
                    ...state,
                    MarketItem:{
                        Data:_action.Payload,
                        Error:null,
                        Loading:false
                    }
                }
            default:
                return state

    }

}