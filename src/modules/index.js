import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';

const rootReducer = combineReducers({
    addBookReducer
});

export default rootReducer;