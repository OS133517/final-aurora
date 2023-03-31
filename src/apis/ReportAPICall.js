import { async } from "q";
import {
    GET_REPORT_SUMMARY,
    GET_ROUTINE_REPORT_LIST_BY_CONDITIONS,
    GET_CASUAL_REPORT_LIST_BY_CONDITIONS
} from "../modules/ReportModule";

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