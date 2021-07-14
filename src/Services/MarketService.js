import {RequestTool} from '../Tools/RequestTool';

const GetAll=() =>RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/Market/GetAll");

const Add=(_item) => RequestTool.PostRequest(process.env.REACT_APP_API_URL+"/Market/Add",_item);

const GetById=(_item) =>RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/Market/Get/"+_item);

const AddMarketItem=(_item) => RequestTool.PostRequest(process.env.REACT_APP_API_URL+"/MarketItem/Add",_item);

const GetAllItem=(_id) => RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/MarketItem/GetAll/"+_id);

const UpdateItem=(_data) => RequestTool.PutRequest(process.env.REACT_APP_API_URL+"/MarketItem/Update",_data);

const GetItemById=(_id) => RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/MarketItem/Get/"+_id);

export const MarketService= {GetAll, Add,GetById,AddMarketItem,GetAllItem,UpdateItem,GetItemById}