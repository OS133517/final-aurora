import { POST_SURVEY,
         GET_SURVEYS } from "../modules/SurveyModule";

export const callSurveyRegistAPI = ({form, questions}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey`;
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
                surveySubject : form.surveySubject,
                startDate :  new Date(form.startDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                endDate :  new Date(form.endDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                questions : questions
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[SurveyAPICalls] callSurveyRegistAPI RESULT', result);
            dispatch({type : POST_SURVEY, payload : result});
        }
    }
}

export const callAllSurveysAPICall = ({currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/surveys?offset=${currentPage}`;

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
            console.log('[SurveyAPICalls] callAllSurveysAPICall RESULT', result);
            dispatch({type : GET_SURVEYS, payload : result.data});
        }
    }
}