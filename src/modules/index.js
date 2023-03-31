import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import dayWorklogReducer from './DayWorklogModule';

const rootReducer = combineReducers({
    addBookReducer,
    dayWorklogReducer
});

export default rootReducer;