import Constant from '../Constants/MarketConstant';
import{ MarketService } from '../Services/MarketService';
import {toast} from "react-toastify";




const GetCurrentMarketList =()=>{
    return _dispatch =>{
        MarketService.GetAll().
        then(_response=>{
            if(!_response.success){

                _dispatch(Fail("Market Listeleri getirilmedi"));
            }
            _dispatch(Success(_response.data));
            ;
        }).
        catch(_ex=>{

            _dispatch(Fail("Beklenmeyen bir hata oluştu"));

        });
    };

    function Success(_item) {return {type:Constant.GetMarketListSuccess,Payload:_item};}
    function Fail(_item) {return {type:Constant.GetMarketListFail,Payload:_item};}
}

const Add =(_value) =>{
    return _dispatch =>{
        MarketService.Add(_value).
        then(_response => {
                if(!_response.success){

                    _dispatch(Fail("Liste eklenemedi"));
                    toast.error("Market listesine eklenemedi.");

                    return;
                }
                _dispatch(Success(_response.data));
                toast.success("Market listesine eklendi.");
              
               
            }).
            catch(_ex=>{
                _dispatch(Fail("Beklenmeyen bir hata oluştu"));

            });
    };

    function Success(_item) {return{type:Constant.AddMarketListSuccess,Payload:_item}; }

    function Fail(_item) { return {type:Constant.AddMarketListFail,Payload:_item};  }


}

const GetMarketById=(_id) =>{

    return _dispatch =>{
        MarketService.GetById(_id).
        then(_response=>{
            if(!_response.success){
                console.log("İlgili item getirelemedi");
                return;
            }
            _dispatch(Success(_response.data));
            toast.success("İlgili talep başarılı bir şekilde getirildi.");

        }).
        catch(_ex=>{
            console.log("Beklenmeyen bir hata oluştu");
        })
    }

    function Success(_item) {return { type:Constant.GetMarketItemByIdSuccess,Payload:_item}; }
}


export default {GetCurrentMarketList,Add,GetMarketById}