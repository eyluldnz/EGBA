import Constant from '../Constants/MarketConstant';
import{ MarketService } from '../Services/MarketService';

const AddMarketItem =(_value) =>{
    return _dispatch =>{
        MarketService.AddMarketItem(_value).
            then(_response =>{

                if(!_response.success){
                    return;
                }
                _dispatch(Success(_response.data));

            }).
            catch(_ex=>{

            })
    }

    function Success(_item) { return {type:Constant.AddMarketItemSuccess, Payload:_item};}
}

const GetAllItem=(_marketId) =>{
    return _dispatch =>{
        MarketService.GetAllItem(_marketId).
            then(_response=>{
                if(!_response.success){

                }
                _dispatch(Success(_response.data));
            }).
            catch(_ex=>{

            })
    }

    function Success(_item) {return {type:Constant. GetAllItemSuccess, Payload:_item};}

}

const UpdateItem=(_item) =>{
    return _dispatch =>{
        MarketService.UpdateItem(_item).
            then(_response =>{
                if(!_response.success){

                }
                _dispatch(Success(_response.data));
            }).
            catch(_ex=>{

            })
    }
    function Success(_data) {return {type:Constant.UpdateMarketItemSuccess, Payload:_data};}

}
const GetItem=(_id)=>{
    return _dispatch =>{
        MarketService.GetItemById(_id).
            then(_response=>{
                if(!_response.success){

                }
                _dispatch(Success(_response.data));
            }).
            catch(_ex=>{

            })
    }
    function Success(_data) {return { type:Constant.GetItemByIdSuccess, Payload:_data};}
}
export default {AddMarketItem,GetAllItem,UpdateItem,GetItem}