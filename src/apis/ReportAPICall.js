import { updateReportStatus } from "../modules/ReportModule";
import {
    GET_MATCHING_MEMBERS,

    GET_REPORT_SUMMARY,
    GET_REPORT_DETAIL,
    GET_ROUTINE_REPORT_LIST_BY_CONDITIONS,
    GET_CASUAL_REPORT_LIST_BY_CONDITIONS,
    GET_REPORT_ROUND_LIST,
    GET_REPORT_ROUND_DETAIL,
    GET_REPORT_DETAIL_LIST,
    GET_REPORT_ROUND_REPLY_LIST,

    POST_REPORT,
    POST_REPORT_DETAIL,
    POST_REPORT_ROUND_REPLY,

    PUT_REPORT,
    PUT_REPORT_ROUND,
    PUT_REPORT_DETAIL,
    PUT_REPORT_ROUND_REPLY,

    DELETE_REPORT,
    DELETE_REPORT_ROUND,
    DELETE_REPORT_DETAIL,
    DELETE_REPORT_ROUND_REPLY,
} from "../modules/ReportModule";

// 이름으로 멤버 검색 
export const callSelectSearchListAboutNameAPI = ({name}) => {

    // const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/search?name=${name}`;
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/search?name=${name}`;

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
            dispatch({type : GET_MATCHING_MEMBERS, payload : result.data.data});
                // dispatch({type : GET_MATCHING_MEMBERS, payload : result});
        }
    };
}

// 보고 등록 
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

// 보고 요약 조회 
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

// 보고 상세 조회 
export const callSelectReportDetailAPI = ({reportCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}`;

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
            console.log('[ReportAPICalls] callReportDetailAPI RESULT', result);
            dispatch({type : GET_REPORT_DETAIL, payload : result.data});
            // console.log("result.data : " + JSON.stringify(result.data));
        }
    };
}

// 정기보고 목록 조회 
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

// 비정기 보고 목록 조회 
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

// 보고 수정 
export const callUpdateReportAPI = ({formData}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : formData
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callUpdateReportAPI RESULT', result);
            dispatch({type : PUT_REPORT, payload : result.data});

            // 상태 변경 액션 디스패치
            dispatch(updateReportStatus(true));
        }
    };
}

// 보고 삭제 
export const callDeleteReportAPI = ({reportCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callDeleteReportAPI RESULT', result);
            dispatch({type : DELETE_REPORT, payload : result.data});

            // 상태 변경 액션 디스패치
            dispatch(updateReportStatus(true));
        }
    };
}

// 보고 회차 목록 조회 
export const callSelectReportRoundListAPI = ({reportCode, offset}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/${reportCode}/rounds?offset=${offset}`;

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

// 보고 회차 상세 조회 
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

// 보고 회차 수정 
export const callUpdateReportRoundAPI = ({reportCode, roundCode, roundTitle, roundBody}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                reportCode : reportCode,
                roundCode : roundCode,
                roundTitle : roundTitle,
                roundBody : roundBody
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callUpdateReportRoundAPI RESULT', result);
            dispatch({type : PUT_REPORT_ROUND, payload : result.data});
        }
    };
}

// 보고 회차 삭제 
export const callDeleteReportRoundAPI = ({roundCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : roundCode
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callDeleteReportRoundAPI RESULT', result);
            dispatch({type : DELETE_REPORT_ROUND, payload : result.data});
        }
    };
}

// 상세보고 등록 
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

// 상세보고 목록 조회 
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

// 상세보고 수정 
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
                detailCode : detailCode,
                detailBody : detailBody
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReportAPICalls] callUpdateReportDetailAPI RESULT', result);
            dispatch({type : PUT_REPORT_DETAIL, payload : result.data});
        }
    };
}

// 상세보고 삭제 
export const callDeleteReportDetailAPI = ({detailCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reports/rounds/detail-reports/${detailCode}`;

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
            console.log('[ReportAPICalls] callDeleteReportDetailAPI RESULT', result);
            dispatch({type : DELETE_REPORT_DETAIL, payload : result.data});
        }
    };
}

// 보고 댓글 등록 
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

// 보고 댓글 목록 조회 
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

// 보고 댓글 수정 
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

// 보고 댓글 삭제 
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
