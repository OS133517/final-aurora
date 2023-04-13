import { createActions, handleActions } from 'redux-actions';

const initialState = {
    workHours: {
        memberCode: null,
        totalWorkedMinutes: 0,
        totalWorkDays: 0,
        avgWorkedMinutes: 0,

    },
    workHoursDetail: {
        extraWorkedMinutes: 0,
        remainingMinutes: 0,
        workedMinutesThisWeek: 0,
        workedMinutesThisMonth: 0
    },
    inOutTime: {
        workTime: 0,
        offTime: 0,
        ATT_REG_DATE: 0
    },

    attendanceStatus: {
        TARDY: 0,
        EARLY_OFF: 0,
        TRUANCY: 0,
        ABSENCE: 0
    },
    vacation: {
        vacationNo: 0,
        remainingVacation: 0,
    },
    usedVcations: {
        usedVacation: 0
    },

    vacationUsed: {
        vacationNo: 0,
        remainingVacation: 0,
        usedVacation: 0
    },
    attendanceMessage: [],
    attendanceList: {
        memberCode: 0,
        memberName: '',
        phone: '',
        memberEmail: '',
        deptName: '',
        taskName: '',
        jobName: '',
        tardy:  '',
        earlyOff:  '',
        truncy:  '',
        absence:  '',
        attRegDate : '',
        workStatus : '',
        workTime: '',
        offTime:''

    },
    vacationDetail: {
        vacationStartDate : '',
        vacationEndDate : '',
        appStatus: '',
        halfDay: ''
    },
    attendanceMessage : [],
    workStatus: ''
}

export const GET_SELECT_ATTENDANCE = 'attendance/GET_SELECT_ATTENDANCE';
export const GET_SELECT_TIME = 'attendance/GET_SELECT_TIME';
export const GET_SELECT_MONTH_TIME = 'attendance/GET_SELECT_MONTH_TIME';
export const POST_WORK_TIME = 'attendance/POST_WORK_TIME';
export const PUT_END_TIME = 'attendance/PUT_END_TIME';
export const GET_SELECT_VACATION = 'attendance/GET_SELECT_VACATION';
export const GET_SELECT_USED_VACATION = 'attendance/GET_SELECT_USED_VACATION';
export const GET_SELECT_WORK_STATUS = 'attendance/GET_SELECT_WORK_STATUS';
export const GET_SELECT_TIME_BY_DAT = 'attnedance/GET_SELECT_TIME_BY_DAT';
export const PUT_MODIFY_ATTENDANCE = 'attendance/PUT_MODIFY_ATTENDANCE';
export const GET_ATTENDANCE_LIST = 'attendance/GET_ATTENDANCE_LIST';
export const GET_VACATION_DETAIL = 'attendance/GET_VACATION_DETAIL';
// export const GET_ATTENDANCE_LIST_NAME ='attendance/GET_ATTENDANCE_LIST_NAME'
// export const PUT_REMAIN_VACATION = 'attendance/PUT_REMAIN_VACATION';

//eslint-disable-next-line
const actions = createActions({
    [GET_SELECT_ATTENDANCE] : () => {},
    [GET_SELECT_TIME] : () => {},
    [GET_SELECT_MONTH_TIME] : () => {},
    [POST_WORK_TIME] : () => {},
    [PUT_END_TIME] : () => {},
    [GET_SELECT_VACATION] : () => {},
    [GET_SELECT_USED_VACATION] : () => {},
    [GET_SELECT_WORK_STATUS] : () => {},
    [PUT_MODIFY_ATTENDANCE] : () => {},
    [GET_SELECT_TIME_BY_DAT] : () => {},
    [GET_ATTENDANCE_LIST] : () => {},
    [GET_VACATION_DETAIL] : () => {},
});

const attendanceReducer = handleActions({

    [GET_SELECT_ATTENDANCE]: (state, { payload }) => {
        return {
            ...state,
            attendanceStatus : payload
        }},
    [GET_SELECT_TIME] : (state , { payload }) => {
        return {
            ...state,
            workHoursDetail: payload
        }
    },
    [GET_SELECT_MONTH_TIME]: (state, { payload }) => {
        console.log(payload);
        return {
            ...state,
            workHours: payload
        }
    },
    [POST_WORK_TIME]: (state, { payload }) => {
        console.log(payload);
        return {
            ...state,
            attendanceMessage: payload
        }
    },
    [PUT_END_TIME]: (state, { payload }) => {
        return {
            ...state,
            attendanceMessage: payload
        }
    },
    [GET_SELECT_VACATION]: (state, { payload }) => {
        return {
            ...state,
            vacation: payload
        }
    },
    [GET_SELECT_USED_VACATION]: (state, { payload }) => {
        return {
            ...state,
            usedVcations : payload
        }},
    [GET_SELECT_WORK_STATUS] : (state , { payload }) => {
        console.log("payload" ,payload );
        return {
            ...state,
            workStatus: payload
        }
    },
    [PUT_MODIFY_ATTENDANCE]: (state, { payload }) => {
        console.log("payload", payload);
        return {
            ...state,
            attendanceStatus: payload
        }
    },
    [GET_SELECT_TIME_BY_DAT]: (state, { payload }) => {
        console.log("payload", payload);
        return {
            ...state,
            inOutTime : payload
        }},
    [GET_ATTENDANCE_LIST] : (state , { payload }) => {
        console.log("payload" ,payload );
        return {
            ...state,
            attendanceList : payload
        }},
    [GET_VACATION_DETAIL] : (state , { payload }) => {
        console.log("payload" ,payload );
        return {
            ...state,
            vacationDetail : payload
        }}
 
   
}, initialState);

export default attendanceReducer;