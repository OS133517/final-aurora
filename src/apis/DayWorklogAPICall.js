import {
    GET_DAY_WORKLOG,
    GET_DAY_WORKLOGS,
    POST_DAY_WORKLOG,
    PUT_DAY_WORKLOG,
    DELETE_DAY_WORKLOG
} from '../modules/DayWorklogModule.js';

export const callDayWorklogListAPI = ({ memberCode, currentPage }) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/${memberCode}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/${memberCode}`;
    }
    
    console.log('[DayWorklogAPICalls] requestURL : ' , requestURL);

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
            console.log('[DayWorklogAPICalls] callDaywWorklogListAPI RESULT : ', result);
            dispatch({ type : GET_DAY_WORKLOGS, payload : result.data });
        }
    };
}

export const callDayWorklogDetailAPI = ({ dayWorklogCode }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/detail/${dayWorklogCode}`;

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

        console.log('[DayWorklogAPICalls] callDayWorklogDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[DayWorklogAPICalls] callDayWorklogDetailAPI SUCCESS');
            dispatch({ type: GET_DAY_WORKLOG, payload: result.data });
        }
    };
}

export const callDayWorklogInsertAPI = ({form, memberCode}) => {

    console.log('[DayWorklogAPICalls] callDayWorklogInsertAPI Call');
    console.log(memberCode + "memberCode");
    
    // for(let key of form.keys()){
    //     console.log(key, form.get(key));
    // }
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days`;

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
                morningDayContent : form.get("morningDayContent"),
                morningDayNote : form.get("morningDayNote"),
                afternoonDayContent : form.get("afternoonDayContent"),
                afternoonDayNote : form.get("afternoonDayNote"),
                daySpecialNote : form.get("daySpecialNote")
                
            })
            })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[DayWorklogAPICalls] callDayWorklogDetailAPI SUCCESS');
            dispatch({ type: GET_DAY_WORKLOG, payload: result.data });
        }
    }
}

export const callDayWorklogUpdateAPI = ({ form }) => {

    console.log('[DayWorklogAPICalls] callDayWorklogUpdateAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days`;


    for(let key of form.keys()){
        console.log(key, form.get(key));
    }
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                dayWorklogCode : form.get("dayWorklogCode"),
                morningDayContent : form.get("morningDayContent"),
                morningDayNote : form.get("morningDayNote"),
                afternoonDayContent : form.get("afternoonDayContent"),
                afternoonDayNote : form.get("afternoonDayNote"),
                daySpecialNote : form.get("daySpecialNote")
            })
        })
        .then(response => response.json());
        console.log('[DayWorklogAPICalls] callDayWorklogUpdateAPI RESULT : ', result);
        dispatch({ type : PUT_DAY_WORKLOG, payload : result });
    };
}

export const callDayWorklogDeleteAPI = ({ dayWorklogCode }) => {

    console.log('[DayWorklogAPICalls] callDayWorklogDeleteAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/${dayWorklogCode}`;

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
            
            console.log('[DayWorklogAPICalls] callDayWorklogDeleteAPI Call RESULT', result);
            dispatch({ type: DELETE_DAY_WORKLOG, payload: result });
        }
        console.log('[DayWorklogAPICalls] callDayWorklogDetailAPI SUCCESS');
    };
}
