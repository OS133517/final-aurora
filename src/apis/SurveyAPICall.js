import { POST_SURVEY,
         GET_SURVEYS,
         GET_SURVEYS_FOR_MANAGEMENT,
         GET_SURVEYS_SEARCH,
         POST_SURVEY_REPLY,
         DELETE_SURVEYS,
         GET_SURVEY,
         PUT_SURVEY,
         DELETE_QUESTIONS,
         GET_SURVEY_REPLY_DETAIL, 
         INIT_ACTION} from "../modules/SurveyModule";

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
                surveyCode : form?.surveyCode||'',
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

export const callAllSurveysAPICall = ({currentPage, memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/surveys/${memberCode}?offset=${currentPage}`;

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

export const callAllSurveysForManagementAPICall = ({currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/surveys-management?offset=${currentPage}`;

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
            console.log('[SurveyAPICalls] callAllSurveysForManagementAPICall RESULT', result);
            dispatch({type : GET_SURVEYS_FOR_MANAGEMENT, payload : result.data});
        }
    }
}

export const callSurveySearchAPICall = ({searchCondition, searchValue, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/surveys-management?offset=${currentPage}&searchCondition=${searchCondition}&searchValue=${searchValue}`;

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
            console.log('[SurveyAPICalls] callSurveySearchAPICall RESULT', result);
            dispatch({type : GET_SURVEYS_SEARCH, payload : result.data});
        }
    }
}

export const callSurveyReplyRegistAPICall = ({form, replyStatus, memberCode, surveyCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/${surveyCode}?memberCode=${memberCode}&replyStatus=${replyStatus}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                form : form
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[SurveyAPICalls] callSurveyReplyRegistAPICall RESULT', result);
            dispatch({type : POST_SURVEY_REPLY, payload : result});
        }
    }
}

export const callSurveyDeleteAPI = ({surveyCodes}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                surveyCodes : surveyCodes
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[SurveyAPICalls] callSurveyDeleteAPI RESULT', result);
            dispatch({type : DELETE_SURVEYS, payload : result});
        }
    }
}

export const callSurveyForUpdateAPI = ({surveyCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/${surveyCode}`;

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
            console.log('[SurveyAPICalls] callSurveyForUpdateAPI RESULT', result);
            dispatch({type : GET_SURVEY, payload : result.data});
        }
    }
}

export const callSurveyUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey`;
    const TIME_ZONE = 9 * 60 * 60 * 1000; 

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                surveyCode : form.surveyCode,
                surveySubject : form.surveySubject,
                startDate : new Date(form.startDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                endDate : new Date(form.endDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5)
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[SurveyAPICalls] callSurveyUpdateAPI RESULT', result);
            dispatch({type : PUT_SURVEY, payload : result});
        }
    }
}

export const callQuestionDeleteAPI = ({questionNos}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/questions`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body : JSON.stringify({
                questionNos : questionNos
            })
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[SurveyAPICalls] callQuestionDeleteAPI RESULT', result);
            dispatch({type : DELETE_QUESTIONS, payload : result});
        }
    }
}

export const callSruveyReplyDetailAPI = ({surveyCode, memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/survey/member/${memberCode}?surveyCode=${surveyCode}`;

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
            console.log('[SurveyAPICalls] callSruveyReplyDetailAPI RESULT', result);
            dispatch({type : GET_SURVEY_REPLY_DETAIL, payload : result.data});
        }
    }
}

export function callInitAction() {
    console.log('이거 되는건가?');
    return {
      type: INIT_ACTION,
      payload : ''
    };
  }