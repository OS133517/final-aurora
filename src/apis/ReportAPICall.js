import { updateReportStatus } from "../modules/ReportModule";
import {
    GET_MATCHING_MEMBERS,

    GET_REPORT_SUMMARY,
    GET_ROUTINE_REPORT_LIST_BY_CONDITIONS,
    GET_CASUAL_REPORT_LIST_BY_CONDITIONS,
    GET_REPORT_ROUND_LIST,
    GET_REPORT_ROUND_DETAIL,
    GET_REPORT_DETAIL_LIST,
    GET_REPORT_ROUND_REPLY_LIST,

    POST_REPORT,
    POST_REPORT_DETAIL,
    POST_REPORT_ROUND_REPLY,

    PUT_REPORT_ROUND_REPLY,
    PUT_REPORT_DETAIL,

    DELETE_REPORT_ROUND_REPLY,
} from "../modules/ReportModule";

export const callSelectSearchListAboutNameAPI = ({name}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/search?name=${name}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }                
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callSelectSearchListAboutNameAPI RESULT', result);
            dispatch({type : GET_MATCHING_MEMBERS, payload : result.data});
                // dispatch({type : GET_MATCHING_MEMBERS, payload : result});
        }
    };
}

export const callReportSummaryAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/summary`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callReportSummaryAPI RESULT', result);
            dispatch({type : GET_REPORT_SUMMARY, payload : result.data});
        }
    };
}

export const callRoutineReportListByConditionsAPI = ({completionStatus, offset}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/routines?completionStatus=${completionStatus}&offset=${offset}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }                
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callRoutineReportListByConditionsAPI RESULT', result);
            dispatch({type : GET_ROUTINE_REPORT_LIST_BY_CONDITIONS, payload : result.data});
        }
    };
}

export const callCasualReportListByConditionsAPI = ({completionStatus, offset}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/casuals?completionStatus=${completionStatus}&offset=${offset}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }                
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callCasualReportListByConditionsAPI RESULT', result);
            dispatch({type : GET_CASUAL_REPORT_LIST_BY_CONDITIONS, payload : result.data});
        }
    };
}

export const callRegisterReportAPI = ({formData}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : formData
        })
        .then(response => response.json());

        if(result.status === 201) {
            console.log('[ReportAPICalls] callRegisterReportAPI RESULT', result);
            dispatch({type : POST_REPORT, payload : result.data});

            // 상태 변경 액션 디스패치
            dispatch(updateReportStatus(true));
        }
    };
}

export const callSelectReportRoundListAPI = ({reportCode, offset}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/routine/${reportCode}/rounds?offset=${offset}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callSelectReportRoundListAPI RESULT', result);
            dispatch({type : GET_REPORT_ROUND_LIST, payload : result.data});
        }
    };
}

export const callselectReportRoundDetailAPI = ({reportCode, roundCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/routine/${reportCode}/rounds/${roundCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callselectReportRoundDetailAPI RESULT', result);
            dispatch({type : GET_REPORT_ROUND_DETAIL, payload : result.data});
        }
    };
}

export const callSelectReportDetailListByRoundCodeAPI = ({reportCode, roundCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}/rounds/${roundCode}/detail-reports`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callSelectReportDetailListByRoundCodeAPI RESULT', result);
            dispatch({type : GET_REPORT_DETAIL_LIST, payload : result.data});
        }
    };
}

export const callSelectReportRoundReplyListAPI = ({reportCode, roundCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}/rounds/${roundCode}/comments`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callSelectReportRoundReplyListAPI RESULT', result);
            dispatch({type : GET_REPORT_ROUND_REPLY_LIST, payload : result.data});
        }
    };
}

export const callUpdateReportRoundReplyAPI = ({roundCode, replyCode, replyBody}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds/${roundCode}/comments/${replyCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : replyBody
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callUpdateReportRoundReplyAPI RESULT', result);
            dispatch({type : PUT_REPORT_ROUND_REPLY, payload : result.data});
        }
    };
}

export const callRegisterReportRoundReplyAPI = ({roundCode, replyBody}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds/${roundCode}/comments`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : replyBody
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callRegisterReportRoundReplyAPI RESULT', result);
            dispatch({type : POST_REPORT_ROUND_REPLY, payload : result.data});
        }
    };
}
    
export const callDeleteReportRoundReplyAPI = ({replyCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds/comments/${replyCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callDeleteReportRoundReplyAPI RESULT', result);
            dispatch({type : DELETE_REPORT_ROUND_REPLY, payload : result.data});
        }
    };
}

export const callRegisterReportDetailAPI = ({reportCode, roundCode, detailBody}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}/rounds/${roundCode}/detail-reports`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : detailBody
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callRegisterReportDetailAPI RESULT', result);
            dispatch({type : POST_REPORT_DETAIL, payload : result.data});
        }
    };
}

export const callUpdateReportDetailAPI = ({reportCode, roundCode, detailCode, detailBody}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}/rounds/${roundCode}/detail-reports`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                detailBody : detailBody,
                detailCode : detailCode
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callUpdateReportDetailAPI RESULT', result);
            dispatch({type : PUT_REPORT_DETAIL, payload : result.data});
        }
    };
}
