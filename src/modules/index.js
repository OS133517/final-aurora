import { combineReducers } from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import approvalReducer from './ApprovalModule';
import messengerReducer from './MessengerModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer,
    approvalReducer,
    messengerReducer

});

export default rootReducer;