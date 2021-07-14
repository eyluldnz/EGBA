import Constant from '../Constants/UserConstant';

const initialState = {
    UserCourses:{
        Data:null,
        Error:null,
        Loading:false
    },
    UserMarketItems:{
        Data:null,
        Error:null,
        Loading:false
    }

}

export default function UserReducer(state = initialState,_action) {
    switch (_action.type) {

    case Constant.UserCoursesSuccess:
        return { 
            ...state,
             UserCourses:{
                 Data:_action.Payload,
                 Error:null,
                 Loading:true
             }
        };

        case Constant.UserMarketItemsSuccess:
        return { 
            ...state,
            UserMarketItems:{
                 Data:_action.Payload,
                 Error:null,
                 Loading:true
             }
        };

        case Constant.RemoveMarketItemSuccess:
            return{
                ...state,
                UserMarketItems:{
                    Data:state.UserMarketItems.Data.filter(x=>x.id!==_action.Payload),
                    Error:null,
                    Loading:false
                }
            }

            case Constant.RemoveCourseSuccess:
                return{
                    ...state,
                    UserCourses:{
                        Data:state.UserCourses.Data.filter(x=>x.id!== _action.Payload),
                        Error:null,
                        Loading:false
                    }

                }
    
    
        
        

    default:
        return state
    }
}
