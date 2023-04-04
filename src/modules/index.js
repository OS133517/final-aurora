import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import dayWorklogReducer from './DayWorklogModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import weekWorklogReducer from './WeekWorklogModule';
import scheduleReducer from './ScheduleModule';

const rootReducer = combineReducers({
    addBookReducer,
    dayWorklogReducer,
    weekWorklogReducer,
    memberReducer,
    reservationReducer,
    scheduleReducer
});

export default rootReducer;