import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './userReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        user
    });
