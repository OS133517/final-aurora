import { 
    GET_DEPT_SEARCH,
    GET_EMAIL_SEARCH,
    GET_MEMBER_DETAIL,
    GET_MEMBER_LIST,
    GET_NAME_SEARCH,
    GET_TASK_SEARCH,
    GET_JOB_SEARCH,
    POST_MEMBER_SIGN_UP,
    PUT_MEMBER_MODIFY,
    GET_CODE
 } from '../modules/HrmModule';

export const CallMemberListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm`;
    }

    console.log('[HrmAPICalls] requestURL :' , requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] CallMemberListAPI', result);
            console.log('[HrmAPICalls] CallMemberListAPI', result.data);

           // dispatch({type : GET_MEMBER_LIST, payload : result.data});
            dispatch({type : GET_MEMBER_LIST, payload : result.data});
        }
    }

}

export const callMemberDetailAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/${memberCode}`;
    
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
             method : "GET",
            headers : {
                "content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberDetailAPI', result);
            dispatch({type : GET_MEMBER_DETAIL, payload : result.data});
        }
    }
}

export const callMemberModifyAPI = ({memberCode, memberInfo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/${memberCode}`;

    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify(memberInfo),
       
            
        })
        .then(response => response.json());

        if(result.status === 201) {
            console.log('[HrmAPICalls] callMemberModifyAPI', result);
            dispatch({type : PUT_MEMBER_MODIFY, payload : result});
        }
    }
}

export const callMemberSignUpAPI = (form) => {
    console.log(form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
               memberName : form.memberName,
               memberId : form.memberId,
               memberEmail : form.memberEmail,
               memberPWD : form.memberPWD,
               deptCode : form.deptCode,
               jobCode : form.jobCode,               
               phone : form.phone,               
               taskCode : form.taskCode,               
               fileCode : form.fileCode === '' ? null : form.fileCode,
               address : form.address,
               teamCode : form.teamCode,
               gender : form.gender,
               birthDay : form.birthDay
                
            })
        })
        .then(response => response.json());

        if(result.status === 201) {
            console.log('[HrmAPICalls] callMemberSignUpAPI' , result);
            dispatch({type : POST_MEMBER_SIGN_UP, payload :result});
        }
    }
}

export const callMemberNameSearchAPI = ({searchValue, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/search?name=${searchValue}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/search?name=${searchValue}`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberNameSearchAPI' , result);
            dispatch({type : GET_NAME_SEARCH, payload : result.data});

        }
    }
}

    
export const callMemberEmailSearchAPI = ({searchValue, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/email?email=${searchValue}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/email?email=${searchValue}`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
                
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberEmailSearchAPI' , result);
            dispatch({type : GET_EMAIL_SEARCH, payload : result.data});

        }
    }
}
    
export const callMemberDeptSearchAPI = ({searchValue, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/dept?dept=${searchValue}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/dept?dept=${searchValue}`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberDeptSearchAPI' , result);
            dispatch({type : GET_DEPT_SEARCH, payload : result.data});

        }
    }
}

export const callMemberJobSearchAPI = ({searchValue, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/job?job=${searchValue}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/job?job=${searchValue}`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberJobSearchAPI' , result);
            dispatch({type : GET_JOB_SEARCH, payload : result.data});

        }
    }
}

export const callMemberTaskSearchAPI = ({searchValue, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/task?task=${searchValue}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/task?task=${searchValue}`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callMemberTaskSearchAPI' , result);
            dispatch({type : GET_TASK_SEARCH, payload : result.data});

        }
    }
}
    
export const callCodeAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/hrm/code`;
    
    return async (dispatch, getstate) => {

        const result = await fetch(requestURL, {
             method : "GET",
            headers : {
                "content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[HrmAPICalls] callCodeAPI', result);
            dispatch({type : GET_CODE, payload : result.data});
        }
    }
}





