import {RequestTool} from '../Tools/RequestTool';



const GetAll= () =>
    RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/Education/GetAll");

const Add= (_item) => RequestTool.PostRequest(process.env.REACT_APP_API_URL+"/Education/Add",_item);

const Update=(_item) => RequestTool.PutRequest(process.env.REACT_APP_API_URL+"/Education/Update",_item);

const AddUser=(_item) => RequestTool.PostRequest(process.env.REACT_APP_API_URL+"/JoinEducation/Add",_item);

const GetAllUsers=(_courseId) => RequestTool.GetRequest(process.env.REACT_APP_API_URL+"/JoinEducation/GetAll/"+_courseId);

export const EducationService= {GetAll,Add,Update,AddUser,GetAllUsers}