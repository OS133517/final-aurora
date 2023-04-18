import {
    GET_ALL_MEMBER_ADDRESSES,
    GET_PERSONAL_GROUP,
    GET_TEAM_GROUP,
    GET_GROUP_ADDRESSES,
    POST_GROUP_REGIST,
    POST_ADD_BOOK_REGIST,
    DELETE_ADD_BOOK_DELETE,
    GET_MEMBER_SEARCH,
    GET_GROUP_SEARCH,
    POST_MEMBER_TO_GROUP,
    DELETE_GROUP,
    PUT_GROUP,
    GET_ADDRESS,
    PUT_ADDRESS
} from "../modules/AddBookModule";

export const callAllMemberAddressesAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/addresses?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/addresses`;
    }

    console.log('[AddBookAPICalls] requestURL : ', requestURL);

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
            console.log('[AddBookAPICalls] callAllMemberAddressesAPI RESULT', result);
            dispatch({type : GET_ALL_MEMBER_ADDRESSES, payload : result.data});
        }
    }
}

export const callPersonalGroupAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/personal-groups/${memberCode}`;

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
            console.log('[AddBookAPICalls] callPersonalGroupAPI RESULT', result);
            dispatch({type : GET_PERSONAL_GROUP, payload : result.data});
        }
    } 
}

export const callTeamGroupAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/team-groups/${memberCode}`;

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
            console.log('[AddBookAPICalls] callTeamGroupAPI RESULT', result);
            dispatch({type : GET_TEAM_GROUP, payload : result.data});
        }
    } 
}

export const callGroupAddressAPI = ({groupCode, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups/${groupCode}?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups/${groupCode}`;
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
            console.log('[AddBookAPICalls] callGroupAddressAPI RESULT', result);
            dispatch({type : GET_GROUP_ADDRESSES, payload : result.data});
        }
    } 
}

export const callGroupRegistAPI = ({groupName, memberCode, teamCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/group`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                groupName : groupName,
                memberCode : memberCode,
                teamCode : teamCode
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callGroupRegistAPI RESULT', result);
            dispatch({type : POST_GROUP_REGIST, payload : result});
        }
    }
}

export const callAddBookRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                name : form.name,
                phone : form.phone,
                email : form.email,
                company : form.company,
                department : form.department,
                jobName : form.jobName,
                groupCode : form.groupCode
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAddBookRegistAPI RESULT', result);
            dispatch({type : POST_ADD_BOOK_REGIST, payload : result});
        }
    }
}

export const callAddBookDeleteAPI = ({addBookNos}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                addBookNos : addBookNos
            })
        }).then(response => response.json());
        
        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAddBookDeleteAPI RESULT', result);
            dispatch({type : DELETE_ADD_BOOK_DELETE, payload : result});
        }
    }
}

export const callMemberSearchAPI = ({searchForm, currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/search?offset=${currentPage}&searchCondition=${searchForm.searchCondition}&searchValue=${searchForm.searchValue}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/search?searchCondition=${searchForm.searchCondition}&searchValue=${searchForm.searchValue}`;
    }

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
            console.log('[AddBookAPICalls] callMemberSearchAPI RESULT', result);
            dispatch({type : GET_MEMBER_SEARCH, payload : result.data});
        }
    }
}

export const callAddBookSearchAPI = ({searchForm, currentPage, groupCode}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups/${groupCode}/search?offset=${currentPage}&searchCondition=${searchForm.searchCondition}&searchValue=${searchForm.searchValue}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/groups/${groupCode}/search?searchCondition=${searchForm.searchCondition}&searchValue=${searchForm.searchValue}`;
    }

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
            console.log('[AddBookAPICalls] callAddBookSearchAPI RESULT', result);
            dispatch({type : GET_GROUP_SEARCH, payload : result.data});
        }
    }
}

export const callMemberToGroupsAPI = ({memberCodes, groupCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/member-to-group`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                memberCodes : memberCodes,
                groupCode : groupCode
            }
        )}).then(response => response.json());
        
        if(result.status === 200) {
            console.log('[AddBookAPICalls] callMemberToGroupsAPI RESULT', result);
            dispatch({type : POST_MEMBER_TO_GROUP, payload : result});
        }
    }
}

export const callGroupDeleteAPI = ({groupCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/group/${ groupCode }`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            }
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callGroupDeleteAPI RESULT', result);
            dispatch({type : DELETE_GROUP, payload : result});
        }
    }
}

export const callGroupUpdateAPI = ({groupCode, groupName}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/group`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                groupCode : groupCode,
                groupName : groupName
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callGroupUpdateAPI RESULT', result);
            dispatch({type : PUT_GROUP, payload : result});
        }
    }
}

export const callAddBookForUpdateAPI = ({addBookNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/${addBookNo}`;

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
            console.log('[AddBookAPICalls] callAddBookForUpdateAPI RESULT', result);
            dispatch({type : GET_ADDRESS, payload : result.data});
        }
    }
}

export const callAddBookUpdateAPI = ({addBookNos, form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/address?addBookNos=${addBookNos}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                name : form.name||'',
                phone : form.phone||'',
                company : form.company||'',
                department : form.department||'',
                jobName : form.jobName||'',
                groupCode : form.groupCode||'',
                email : form.email||''
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAddBookUpdateAPI RESULT', result);
            dispatch({type : PUT_ADDRESS, payload : result});
        }
    }
}
