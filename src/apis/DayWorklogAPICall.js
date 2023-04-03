import {
    GET_DAY_WORKLOG,
    GET_DAY_WORKLOGS,
    POST_DAY_WORKLOG,
    PUT_DAY_WORKLOG,
    DELETE_DAY_WORKLOGS
} from '../modules/DayWorklogModule.js';

export const callDayWorklogListAPI = ({ memberCode, currentPage }) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/${memberCode}?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/${memberCode}`;
    }
    
    console.log('[ProduceAPICalls] requestURL : ' , requestURL);

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*" ,
                "Access-Control-Allow-Origin": "*"    
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ProduceAPICalls] callDaywWorklogListAPI RESULT : ', result);
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
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callDayWorklogDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ProduceAPICalls] callDayWorklogDetailAPI SUCCESS');
            dispatch({ type: GET_DAY_WORKLOG,  payload: result.data });
        }
    };
}

export const callDayWorklogInsertAPI = ({form}) => {

    console.log('[ProduceAPICalls] callDayWorklogInsertAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ProduceAPICalls] callDayWorklogInsertAPI RESULT : ', result);

        dispatch({ type : POST_DAY_WORKLOG, payload : result });
    }
}
