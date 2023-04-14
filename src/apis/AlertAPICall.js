import {
    GET_ALERT_LIST,

    // POST_BLACKLIST,

    // DELETE_BLACKLIST,
} from "../modules/AlertModule";

// 알림 목록 조회 
export const callSelectAlertListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/alerts`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[callSelectAlertListAPI] callSendMailAPI RESULT', result);
            dispatch({type : GET_ALERT_LIST, payload : result.data});
        }
    };
}
