import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import dayWorklogReducer from './DayWorklogModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';

const rootReducer = combineReducers({
    addBookReducer,
    dayWorklogReducer,
    memberReducer,
    reservationReducer
});

export default rootReducer;