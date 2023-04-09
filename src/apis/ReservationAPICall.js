import { GET_ASSET_CATEGORY,
         GET_ASSETS,
         GET_MY_RESERVATION,
         GET_RESERVATION,
         PUT_RESERVATION,
         DELETE_RESERVATION,
         GET_RESERVATIONS,
         GET_RESERVATIONS_BY_DATE,
         GET_MEMBER_INFO,
         POST_RESERVATION,
         GET_ASSETS_FOR_MANAGEMENT,
         PUT_ASSET_STATUS,
         DELETE_ASSET,
         POST_ASSET } from "../modules/ReservationModule";

export const callAssetCategoryAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-category`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callAssetCategoryAPI RESULT', result);
            dispatch({ type: GET_ASSET_CATEGORY, payload: result.data });
        }
    }
}

export const callAllAssetsAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/assets`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callAllAssetsAPI RESULT', result);
            dispatch({ type: GET_ASSETS, payload: result.data });
        }
    }
}

export const callMyReservationAPI = ({ memberCode, currentPage }) => {

    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/my-reservation/${memberCode}?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/my-reservation/${memberCode}?`;
    }

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callAssetCategoryAPI RESULT', result);
            dispatch({ type: GET_MY_RESERVATION, payload: result.data });
        }
    }
}



export const callReservationUpdateAPI = ({ form, reservationNo }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/${reservationNo}`;
    const TIME_ZONE = 9 * 60 * 60 * 1000; 

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                startTime : form.startTime.toLocaleString(),
                endTime : form.endTime.toLocaleString(),
                reservationDate : new Date(form.reservationDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -13),
                description : form.description
            })
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callReservationUpdateAPI RESULT', result);
            dispatch({ type: PUT_RESERVATION, payload: result });
        }
    }
}

export const callReservationDeleteAPI = ({ reservationNos }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                reservationNos: reservationNos
            })
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callReservationDeleteAPI RESULT', result);
            dispatch({ type: DELETE_RESERVATION, payload: result });
        }
    }
}

export const callReservationsAPI = ({ assetCode, startTime, endTime }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservations/${assetCode}?startTime=${startTime}&endTime=${endTime}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callAllAssetsAPI RESULT', result);
            dispatch({ type: GET_RESERVATIONS, payload: result.data });
        }
    }
}

export const callReservationAPI = ({ reservationNo }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/${reservationNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[AddBookAPICalls] callReservationAPI RESULT', result);
            dispatch({ type: GET_RESERVATION, payload: result.data });
        }
    }
}

export const callReservationByDateAPI = ({assetCode, startDateTime, endDateTime}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservations/${assetCode}/date?startDateTime=${startDateTime}&endDateTime=${endDateTime}`;

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
            console.log('[AddBookAPICalls] callReservationByDateAPI RESULT', result);
            dispatch({type : GET_RESERVATIONS_BY_DATE, payload : result.data});
        }
    }
}

export const callMemberInfoForRegist = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/member-info/${memberCode}`;

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
            console.log('[AddBookAPICalls] callMemberInfoForRegist RESULT', result);
            dispatch({type : GET_MEMBER_INFO, payload : result.data});
        }
    }
}

export const callReservationRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation`;
    const TIME_ZONE = 9 * 60 * 60 * 1000; 

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                assetCode : form.assetCode,
                memberCode : form.memberCode,
                teamCode : form.teamCode,
                reservationDate : form.reservationDate,
                startTime : new Date(form.startTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                endTime : new Date(form.endTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                description : form.description
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callReservationRegistAPI RESULT', result);
            dispatch({type : POST_RESERVATION, payload : result});
        }
    }
}

export const callAllAssetsForManagementAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-management`;

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
            console.log('[AddBookAPICalls] callAllAssetsForManagementAPI RESULT', result);
            dispatch({type : GET_ASSETS_FOR_MANAGEMENT, payload : result.data});
        }
    }
}

export const callAssetStatusChangeAPI = ({assetCode, status}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                assetCode : assetCode,
                status : status
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAssetStatusChangeAPI RESULT', result);
            dispatch({type : PUT_ASSET_STATUS, payload : result});
        }
    }
}

export const callAssetDeleteAPI = ({assetCodes}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                assetCodes : assetCodes
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAssetDeleteAPI RESULT', result);
            dispatch({type : DELETE_ASSET, payload : result});
        }
    }
}

export const callAssetRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                assetCode : form.assetCode,
                assetName : form.assetName,
                assetCategory : form.assetCategory,
                status : form.status
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[AddBookAPICalls] callAssetRegistAPI RESULT', result);
            dispatch({type : POST_ASSET, payload : result});
        }
    }
}