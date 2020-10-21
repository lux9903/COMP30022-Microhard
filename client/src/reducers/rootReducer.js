import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './userReducer';
import photo from './photoReducer';
import document from './documentReducer'

export default history =>
    combineReducers({
        router: connectRouter(history),
        user,
        photo,
        document
    });
