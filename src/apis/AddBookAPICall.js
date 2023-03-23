import {
    GET_ALL_MEMBER_ADDRESSES,
    GET_PERSONAL_GROUP,
    GET_TEAM_GROUP,
    GET_GROUP_ADDRESSES,
    POST_GROUP_REGIST
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
                "Accept" : "*/*"
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
                "Accept" : "*/*"
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
                "Accept" : "*/*"
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
                "Accept" : "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callGroupAddressAPI RESULT', result);
            dispatch({type : GET_GROUP_ADDRESSES, payload : result.data});
        }
    } 
}

export const callGroupRegistAPI = ({groupName, memberCode, team}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/group`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                groupName : groupName,
                memberCode : memberCode,
                team : team
            })
        }).then(response => response.json())

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callGroupRegistAPI RESULT', result);
            dispatch({type : POST_GROUP_REGIST, payload : result});
        }
    }
}