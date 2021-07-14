import { combineReducers } from 'redux';
import AuthenticationReducer from './AuthenticationReducer';
import EducationReducer from '../Reducers/EducationReducer';
import MarketReducer from '../Reducers/MarketReducer';
import MarketItemReducer from '../Reducers/MarketItemReducer';
import UserReducer from '../Reducers/UserReducer';

export default combineReducers({
    AuthenticationReducer,
    EducationReducer,
    MarketReducer,
    MarketItemReducer,
    UserReducer
});