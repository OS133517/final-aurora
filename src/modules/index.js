import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import reportReducer from './ReportModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer,
    reportReducer
});

export default rootReducer;