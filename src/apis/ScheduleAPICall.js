import {
    GET_MY_SCHEDULE,
    GET_SCHEDULE,
    POST_SCHEDULE
    
} from "../modules/ScheduleModule";

export const callMyScheduleAPI = ({ memberCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar/my/${memberCode}`;
    console.log("memberCode : " + memberCode)
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
            console.log('[ScheduleAPICall] callMyScheduleAPI RESULT', result);
            dispatch({type : GET_MY_SCHEDULE, payload : result.data});
        }
    };
}

export const callScheduleAPI = ({ scheduleCode, schduleStartDay, scheduleEndDay }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar/${scheduleCode}?schduleStartDay=${schduleStartDay}&scheduleEndDay=${scheduleEndDay}`;

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
            console.log('[ScheduleAPICall] callScheduleAPI RESULT', result);
            dispatch({type : GET_SCHEDULE, payload : result.data});
        }
    };
}

export const callScheduleInsertAPI = ({form, memberCode}) => {

    console.log('[ScheduleAPICall] callScheduleInsertAPI Call');
    console.log(memberCode + "memberCode");
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                memberCode : memberCode,
                // scheduleName : form.get("scheduleName"),
                scheduleStartDay : form.get("scheduleStartDay"),
                scheduleEndDay : form.get("scheduleEndDay"),
                schduleStartTime : form.get("schduleStartTime.toLocaleString()"),
                schduleEndTime : form.get("schduleEndTime.toLocaleString()"),
                schdulePlace : form.get("schdulePlace"),
                schduleContent : form.get("schduleContent")
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[ScheduleAPICall] callScheduleInsertAPI RESULT', result);
            dispatch({type : POST_SCHEDULE, payload : result});
        }
    }

}