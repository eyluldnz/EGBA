import { applyMiddleware, createStore } from 'redux';
import RootReducer from '../Reducers/RootReducer';
import thunkMiddleware from 'redux-thunk'

export const Store =createStore(RootReducer, applyMiddleware(thunkMiddleware));