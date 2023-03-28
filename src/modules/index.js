import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer
});

export default rootReducer;