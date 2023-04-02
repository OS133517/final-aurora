import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import reportReducer from './ReportModule';
import approvalReducer from './ApprovalModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer,
    reportReducer,
    approvalReducer

});

export default rootReducer;