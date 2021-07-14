import {RequestTool} from '../Tools/RequestTool';


const GetAllItems=(_userId) =>RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/User/GetMarkets/"+_userId);

const GetUser=(_id) =>RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/User/Get/"+_id);

const GetAllCourses=(_userid) =>RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/User/GetCourses/"+_userid);

const RemoveMarketItem=(_item) =>RequestTool.DeleteRequest(process.env.REACT_APP_API_URL+"/User/RemoveMarketItem",_item);

const RemoveCourse=(_item) =>RequestTool.DeleteRequest(process.env.REACT_APP_API_URL+"/User/RemoveCourse",_item);

export const UserService= {GetAllItems,GetUser,GetAllCourses,RemoveMarketItem,RemoveCourse}