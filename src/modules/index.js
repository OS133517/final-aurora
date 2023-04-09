import {combineReducers} from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import reportReducer from './ReportModule';
import approvalReducer from './ApprovalModule';
import hrmReducer from './HrmModule'
import dayWorklogReducer from './DayWorklogModule';
import surveyReducer from './SurveyModule';
import attendanceReducer from './AttendanceModule';

const rootReducer = combineReducers({
    addBookReducer,
    hrmReducer,
    memberReducer,
    reservationReducer,
    reportReducer,
    approvalReducer,
    dayWorklogReducer,
    surveyReducer,
    attendanceReducer
});

export default rootReducer;