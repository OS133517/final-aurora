import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import hrmReducer from './HrmModule'
import attendanceReducer from './AttendanceModule';

const rootReducer = combineReducers({
    addBookReducer,
    hrmReducer,
    memberReducer,
    attendanceReducer
});

export default rootReducer;