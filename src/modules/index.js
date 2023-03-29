import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer
});

export default rootReducer;