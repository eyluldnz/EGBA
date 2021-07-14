import Constant from '../Constants/EducationConstant';

const initialState = {
    Currentcourses:{
        Data:null,
        Error:null,
        Loading:false
    },
    AddCourse:{
        Data:null,
        Error:null,
        Loading:false
    },

    UpdatedCourse:{
        Data:null,
        Error:null,
        Loading:false

    },
    AddUserToCourse:{
        Data:null,
        Error:null,
        Loading:false
    },
    GetAllUsers:{
        Data:null,
        Error:null,
        Loading:false
    }

}

export default function EducationReducer(state = initialState,_action) {
    switch (_action.type) {

    case Constant.GetCurrentCourse:
        return { 
            ...state,
             Currentcourses:{
                 Data:null,
                 Error:null,
                 Loading:true
             }
        };
    
    case Constant.GetCurrentCourseSuccess:
        return {
            ...state,
            Currentcourses:{
                Data:_action.Payload,
                Error:null,
                Loading:false
            }
        };

        case Constant.GetCurrentCourseFail:
            return {
                ...state,
                Currentcourses:{
                    Data:null,
                    Error:_action.Payload,
                    Loading:false
                }
            };
    

    case Constant.AddCourseRequest:
        return{
            ...state,
            AddCourse:{
                Data:null,
                Error:null,
                Loading:true
            }
        };                                                
    
        case Constant.AddCourseSuccess:
            return {
                ...state,
                AddCourse:{
                    Data:_action.Payload,
                    Error: null,
                    Loading:false
                },
                Currentcourses:{
                    Data:[...state.Currentcourses.Data,_action.Payload],
                    Error:null,
                    Loading:false
                }
            };
        
        case Constant.AddCourseFail:
            return {
                ...state,
                AddCourse:{
                    Data:null,
                    Error:_action.Payload,
                    Loading:false
                }
            };
            case Constant.WillBeMentorSuccess:
                return { 
                    ...state,
                     UpdatedCourse:{
                         Data:_action.Payload,
                         Error:null,
                         Loading:false
                     }
                };

            case Constant.JoinCourseSuccess:
                return{
                    ...state,
                    AddUserToCourse:{
                        Data:_action.Payload,
                        Error:null,
                        Loading:false
                    }
                };
            
            case Constant.GetAllJoinUsers:
                return {
                    ...state,
                    GetAllUsers:{
                        Data:_action.Payload,
                        Error:null,
                        Loading:false
                    }
                };

    default:
        return state
    }
}
