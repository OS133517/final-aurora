import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import approvalReducer from './ApprovalModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer,
    approvalReducer

});

export default rootReducer;