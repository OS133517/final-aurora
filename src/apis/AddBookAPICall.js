import {
    GET_ALL_MEMBER_ADDRESSES,
    GET_PERSONAL_GROUP
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

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/address-book/${memberCode}/groups`;

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