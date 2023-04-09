import {
    GET_WEEK_WORKLOG,
    GET_WEEK_WORKLOGS,
    POST_WEEK_WORKLOG,
    PUT_WEEK_WORKLOG,
    DELETE_WEEK_WORKLOG
} from '../modules/WeekWorklogModule.js';

export const callWeekWorklogListAPI = ({ memberCode, currentPage }) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks/${memberCode}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks/${memberCode}`;
    }
    
    console.log('[WeekWorklogAPICalls] requestURL : ' , requestURL);

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*" ,
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[WeekWorklogAPICalls] callWeekwWorklogListAPI RESULT : ', result);
            dispatch({ type : GET_WEEK_WORKLOGS, payload : result.data });
        }
    };
}

export const callWeekWorklogDetailAPI = ({ weekWorklogCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks/detail/${weekWorklogCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[WeekWorklogAPICalls] callWeekWorklogDetailAPI SUCCESS');
            dispatch({ type: GET_WEEK_WORKLOG, payload: result.data });
        }
    };
}

export const callWeekWorklogInsertAPI = ({form, memberCode}) => {

    console.log('[WeekWorklogAPICalls] callWeekWorklogInsertAPI Call');
    console.log(memberCode + "memberCode");
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },

            body : JSON.stringify({
                memberCode : memberCode,
                monContent : form.get("monContent"),
                tuesContent : form.get("monContent"),
                wedContent : form.get("monContent"),
                thurContent : form.get("monContent"),
                friContent : form.get("friContent"),
                weekNote : form.get("weekNote"),
                weekSpecialNote : form.get("weekSpecialNote")
            })
            })
            .then(response => response.json());

            console.log('[DayWorklogAPICalls] callDayWorklogInsertAPI RESULT : ', result);
            dispatch({ type : POST_WEEK_WORKLOG, payload : result });
    };
}

export const callWeekWorklogUpdateAPI = ({ form }) => {

    console.log('[WeekWorklogAPICalls] callWeekWorklogUpdateAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },

            body : JSON.stringify({
                weekWorklogCode : form.get("weekWorklogCode"),
                monContent : form.get("monContent"),
                tuesContent : form.get("monContent"),
                wedContent : form.get("monContent"),
                thurContent : form.get("monContent"),
                friContent : form.get("friContent"),
                weekNote : form.get("weekNote"),
                weekSpecialNote : form.get("weekSpecialNote")
            })
        })
        .then(response => response.json());

        console.log('[WeekWorklogAPICalls] callWeekWorklogUpdateAPI RESULT : ', result);
        dispatch({ type : PUT_WEEK_WORKLOG, payload : result });
    };
}

export const callWeekWorklogDeleteAPI = ({ weekWorklogCode }) => {

    console.log('[WeekWorklogAPICalls] callWeekWorklogDeleteAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/weeks/${weekWorklogCode}`;

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
            
            console.log('[WeekWorklogAPICalls] callWeekWorklogDeleteAPI Call RESULT', result);
            dispatch({ type: DELETE_WEEK_WORKLOG, payload: result });
        }
    };
}
