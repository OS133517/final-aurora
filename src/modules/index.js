import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import surveyReducer from './SurveyModule';

const rootReducer = combineReducers({
    addBookReducer,
    memberReducer,
    reservationReducer,
    surveyReducer
});

export default rootReducer;