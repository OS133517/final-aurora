import { async } from "q";
import { GET_ASSET_CATEGORY,
         GET_ASSETS } from "../modules/ReservationModule";

export const callAssetCategoryAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/asset-category`;

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
            console.log('[AddBookAPICalls] callAssetCategoryAPI RESULT', result);
            dispatch({type : GET_ASSET_CATEGORY, payload : result.data});
        }
    }
}

export const callAllAssetsAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/reservation/assets`;

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
            console.log('[AddBookAPICalls] callAllAssetsAPI RESULT', result);
            dispatch({type : GET_ASSETS, payload : result.data});
        }
    }
}