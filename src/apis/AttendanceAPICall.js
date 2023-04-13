import {
    GET_ATTENDANCE_LIST,
     GET_ATTENDANCE_LIST_NAME,
     GET_SELECT_ATTENDANCE,
     GET_SELECT_MONTH_TIME,
     GET_SELECT_TIME,
     GET_SELECT_TIME_BY_DAT,
     GET_SELECT_USED_VACATION,
     GET_SELECT_VACATION,
     GET_SELECT_WORK_STATUS,
     GET_VACATION_DETAIL,
     POST_WORK_TIME,
     PUT_END_TIME,
     PUT_MODIFY_ATTENDANCE
     } from '../modules/AttendanceModule';

export const  callSelectAttendanceAPI = ({memberCode,  selectedDate }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/${memberCode}?selectedDate=${selectedDate}`;
    
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectAttendanceAPI', result);
            dispatch({ type: GET_SELECT_ATTENDANCE, payload: result.data });
        }
    }
}

export const callSelectTimeAPI = ({ memberCode, selectTime }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/time/${memberCode}?selectTime=${selectTime}`;

    console.log("selectTime", selectTime);
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());
        console.log(result)
        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectTimeAPI', result);

            dispatch({ type: GET_SELECT_TIME, payload: result.data });
        }
    }
}

export const callSelectMonthTimeAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/month-time/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectMonthTimeAPI', result);
            dispatch({ type: GET_SELECT_MONTH_TIME, payload: result.data });
        }
    }
}

export const callWorkTimeAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }


        })
            .then(response => response.json());

        if (result.status === 201) {
            console.log('[AttendanceCalls] callWorkTimeAPI', result);
            dispatch({ type: POST_WORK_TIME, payload: result });
        }
    }
}

export const callEndTimeAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },


        })
            .then(response => response.json());

        if (result.status === 201) {
            console.log('[callEndTimeAPI] callEndTimeAPI', result);
            dispatch({ type: PUT_END_TIME, payload: result });
        }
    }
}

export const callSelectVacationAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectVacationAPI', result);
            dispatch({ type: GET_SELECT_VACATION, payload: result.data });
        }
    }
}

export const callSelectUsedVacationAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/used/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectUsedVacationAPI', result);
            dispatch({ type: GET_SELECT_USED_VACATION, payload: result.data });
        }
    }
}

// 휴가 일 수 수정 
export const callPutVacationAPI = ({ day }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/used/${day}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectUsedVacationAPI', result);
            dispatch({ type: GET_SELECT_USED_VACATION, payload: result.data });
        }
    }
}

export const callSelectWorkStatus = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/work-status/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectWorkStatus', result);
            const action = { type: GET_SELECT_WORK_STATUS, payload: result.data };
            dispatch(action);
            return action;
        } else {
            console.log("Error in callSelectWorkStatus:", result);
            return null;
        }
    }
}

export const callSelectTimeByDayAPI = ({ memberCode, attRegDate }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/time-day/${memberCode}?attRegDate=${attRegDate}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            console.log('[AttendanceCalls] callSelectTimeByDayAPI', result);
            dispatch({ type: GET_SELECT_TIME_BY_DAT, payload: result.data });
        }
    }
}

export const  callModifyAttendance = ({memberCode,form,selectedDate}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/modify/${memberCode}?selectedDate=${selectedDate}`;
   
    console.log("form", form);
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                memberCode : memberCode,
                tardy : form.tardy,
                truancy : form.truancy,
                earlyOff : form.earlyOff,
                absence : form.absence,
            
                 
             })
         })
      
        .then(response => response.json());


        if(result.status === 201) {
            console.log('[AttendanceCalls] callModifyAttendance', result);
            dispatch({ type: PUT_MODIFY_ATTENDANCE, payload: result.data });
        }
    }
}

export const callAttendanceListAPI = ({currentPage, selectedDate}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/list?offset=${currentPage}&selectedDate=${selectedDate}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/list?selectedDate=${selectedDate}`;
    }

    console.log('[AttendanceCalls] requestURL :' , requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceCalls] callAttendanceListAPI', result);
            console.log('[AttendanceCalls] callAttendanceListAPI', result.data);

            dispatch({type : GET_ATTENDANCE_LIST, payload : result.data});
        }
    }

}

export const  callVacationDetailAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/detail/${memberCode}`;
    
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {          
            method : "GET",
            headers : {
                "content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AttendanceCalls] callVacationDetailAPI', result);
            dispatch({type : GET_VACATION_DETAIL, payload : result.data});
        }
    }
}


// export const callAttendanceListNameAPI = ({currentPage, selectedDate ,searchValue}) => {

//     let requestURL;

//     if(currentPage !== undefined || currentPage !== null) {
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/list/name?offset=${currentPage}&selectedDate=${selectedDate}&name=${searchValue}`;
//     } else {
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/list/name?selectedDate=${selectedDate}&name=${searchValue}`;
//     }

//     console.log('[AttendanceCalls] requestURL :' , requestURL);

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "GET",
//             headers : {
//                 "content-Type" : "application/json",
//                 "Accept" : "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[AttendanceCalls] callAttendanceListNameAPI', result);
//             console.log('[AttendanceCalls] callAttendanceListNameAPI', result.data);

