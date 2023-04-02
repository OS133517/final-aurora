import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import hrmReducer from './HrmModule'

const rootReducer = combineReducers({
    addBookReducer,
    hrmReducer,
    memberReducer
});

export default rootReducer;