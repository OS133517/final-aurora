import {
    GET_SCHEDULE_MONTH

} from '../modules/ScheduleModule.js';

export const callReservationsAPI = ({scheduleCode, startTime, endTime}) => {
// export const callScheduleAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar/month/${scheduleCode}?startTime=${startTime}&endTime=${endTime}`;
    // const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar/month/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callReservationsAPI RESULT', result);
            dispatch({type : GET_SCHEDULE_MONTH, payload : result.data});
        }
    }
}