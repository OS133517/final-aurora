import {
    GET_MAILS, 
    GET_NEW_MAILS,
    GET_MAIL_DETAIL,
    GET_TAGS,
    GET_BLACKLIST,

    POST_MAIL,
    POST_MAIL_TAGS,
    POST_TAGS,
    POST_BLACKLIST,

    PUT_IMPORTANT_STATUS,
    PUT_TAGS,

    DELETE_MAIL,
    DELETE_MAIL_FOREVER,
    DELETE_TAGS,
    DELETE_BLACKLIST,
} from "../modules/MailModule";

// 메일 작성 
export const callSendMailAPI = ({formData}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                // "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : formData
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callSendMailAPI RESULT', result);
            dispatch({type : POST_MAIL, payload : result.data});
        }
    };
}

// 조건별 메일 목록 조회 
export const callSelectMailListByConditionsAPI = (searchCriteria) => {

    const params = new URLSearchParams();

    Object.keys(searchCriteria).forEach((key) => {

        if (searchCriteria[key] !== undefined && searchCriteria[key] !== null) {
            
            params.append(key, searchCriteria[key]);
        }
    });

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails?${params.toString()}`;

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
            console.log('[MailAPICalls] callSelectMailListByConditionsAPI RESULT', result);
            dispatch({type : GET_MAILS, payload : result.data});
        }
    };
}

// 메일 목록 갱신 
export const callSelectNewMailListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/unseen`;

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
            console.log('[MailAPICalls] callSelectNewMailListAPI RESULT', result);
            dispatch({type : GET_NEW_MAILS, payload : result.data});
        }
    };
}

// 메일 상세 조회 
export const callSelectMailDetailAPI = ({mailCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/${mailCode}`;

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
            console.log('[MailAPICalls] callSelectMailDetailAPI RESULT', result);
            dispatch({type : GET_MAIL_DETAIL, payload : result.data});
        }
    };
}

// 메일 중요 상태 수정 
export const callUpdateImportantStatusAPI = ({mailCode, importantStatus}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/${mailCode}/important-status/${importantStatus}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callUpdateimportantStatusAPI RESULT', result);
            dispatch({type : PUT_IMPORTANT_STATUS, payload : result.data});
        }
    };
}

// 메일 삭제 상태 수정 
export const callUpdateDeleteStatusAPI = ({mailCodeList, deleteStatus}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/delete-status/${deleteStatus}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify(mailCodeList) 
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callUpdateDeleteStatusAPI RESULT', result);
            dispatch({type : DELETE_MAIL, payload : result.data});
        }
    };
}

// 메일 태그 변경  
export const callUpdateMailTagAPI = ({mailCode, tagCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/${mailCode}/tags/${tagCode}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callUpdateMailTagAPI RESULT', result);
            dispatch({type : POST_MAIL_TAGS, payload : result.data});
        }
    };
}

// 메일 완전 삭제 
export const callDeleteMailAPI = ({mailCodeList}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify(mailCodeList) 
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callDeleteMailAPI RESULT', result);
            dispatch({type : DELETE_MAIL_FOREVER, payload : result.data});
        }
    };
}

// 태그 생성 
export const callRegisterTagsAPI = ({tagName, tagColor}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/tags`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                tagName : tagName,
                tagColor : tagColor
            }) 
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callRegisterTagAPI RESULT', result);
            dispatch({type : POST_TAGS, payload : result.data});
        }
    };
}

// 태그 목록 조회 
export const callSelectTagsAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/tags`;

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
            console.log('[MailAPICalls] callSelectTagsAPI RESULT', result);
            dispatch({type : GET_TAGS, payload : result.data});
        }
    };
}

// 태그 수정 
export const callUpdateTagsAPI = ({tagCode, tagName, tagColor}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/tags`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                tagCode : tagCode,
                tagName : tagName,
                tagColor : tagColor
            }) 
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callUpdateTagsAPI RESULT', result);
            dispatch({type : PUT_TAGS, payload : result.data});
        }
    };
}

// 태그 삭제 
export const callDeleteTagsAPI = ({tagCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/tags/${tagCode}`;

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
            console.log('[MailAPICalls] callDeleteTagsAPI RESULT', result);
            dispatch({type : DELETE_TAGS, payload : result.data});
        }
    };
}

// 블랙리스트 등록 
export const callRegisterBlackListAPI = ({emails}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/black-list`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({
                emails: emails,
            }),
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callRegisterBlackListAPI RESULT', result);
            dispatch({type : POST_BLACKLIST, payload : result.data});
        }
    };
}

// 블랙리스트 목록 조회 
export const callSelectBlackListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/black-list`;

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
            console.log('[MailAPICalls] callSelectBlackListAPI RESULT', result);
            dispatch({type : GET_BLACKLIST, payload : result.data});
        }
    };
}

// 블랙리스트에서 삭제 
export const callDeleteBlackListAPI = ({emails}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/mails/black-list`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : 'DELETE',
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : {
                emails : emails
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MailAPICalls] callDeleteBlackListAPI RESULT', result);
            dispatch({type : DELETE_BLACKLIST, payload : result.data});
        }
    };
}