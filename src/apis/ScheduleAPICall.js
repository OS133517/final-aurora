import {
    DELETE_SCHEDULE,
    GET_MY_SCHEDULE,
    GET_SCHEDULE,
    POST_SCHEDULE,
    PUT_SCHEDULE
    
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

export const callScheduleDetailAPI = ({ scheduleCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar/${scheduleCode}`;
    
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
            console.log('[ScheduleAPICall] callScheduleDetailAPI RESULT', result);
            dispatch({type : GET_SCHEDULE, payload : result.data});
        }
    };
}

export const callScheduleInsertAPI = ({form, memberCode}) => {

    console.log('[ScheduleAPICall] callScheduleInsertAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                memberCode : memberCode,
                scheduleName : form.scheduleName,
                scheduleStartDay : form.scheduleStartDay,
                scheduleEndDay : form.scheduleEndDay,
                schedulePlace : form.schedulePlace,
                scheduleContent : form.scheduleContent
            })
            // body : form
        }).then(response => response.json())
        .then((data) => console.log(data));

        if(result.status === 200) {
            console.log('[ScheduleAPICall] callScheduleInsertAPI RESULT' + result);
            dispatch({type : POST_SCHEDULE, payload : result});
        }
    };
}

export const callScheduleUpdateAPI = ({ form }) => {

    console.log('[ScheduleAPICall] callScheduleUpdateAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/calendar`;

    // for(let key of form.keys()){
    //     console.log(key, form.get(key));
    // }
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                scheduleCode : form.get("scheduleCode"),
                scheduleName : form.get("scheduleName"),
                scheduleStartDay : form.get("scheduleStartDay"),
                scheduleEndDay : form.get("scheduleEndDay"),
                schedulePlace : form.get("schedulePlace"),
                scheduleContent : form.get("scheduleContent")
            })
        })
        .then(response => response.json());
        console.log('[ScheduleAPICall] callScheduleUpdateAPI RESULT : ', result);
        dispatch({ type : PUT_SCHEDULE, payload : result });
    };
}

export const callScheduleDeleteAPI = ({ scheduleCode }) => {

    console.log('[ScheduleAPICall] callScheduleDeleteAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/schedules/${scheduleCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[ScheduleAPICall] callScheduleDeleteAPI Call RESULT', result);
            dispatch({ type : DELETE_SCHEDULE, payload: result });
        }
    };
}