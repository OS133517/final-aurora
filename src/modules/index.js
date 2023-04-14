import { combineReducers } from 'redux';
import addBookReducer from './AddBookModule';
import memberReducer from './MemberModule';
import reservationReducer from './ReservationModule';
import reportReducer from './ReportModule';
import mailReducer from './MailModule';
import approvalReducer from './ApprovalModule';
import hrmReducer from './HrmModule'
import dayWorklogReducer from './DayWorklogModule';
import surveyReducer from './SurveyModule';
import attendanceReducer from './AttendanceModule';
import messengerReducer from './MessengerModule';
import weekWorklogReducer from './WeekWorklogModule';
import scheduleReducer from './ScheduleModule';
import vacationReducer from './VacationModule';
import alertReducer from './AlertModule';

const rootReducer = combineReducers({
    addBookReducer,
    hrmReducer,
    memberReducer,
    reservationReducer,
    mailReducer,
    reportReducer,
    approvalReducer,
    messengerReducer,
    dayWorklogReducer,
    surveyReducer,
    attendanceReducer,
    weekWorklogReducer,
    scheduleReducer,
    vacationReducer,
    alertReducer
});

export default rootReducer;