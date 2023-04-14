import { POST_VACATION, POST_VACATION_USE, GET_VACATION } from '../modules/VacationModule';


export const callPostVacationUseAPI = ({ form }, memberCode) => {

    console.log('[callPostVacationUseAPI] in', form);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/remain/${memberCode}`;

    return async (dispatch, getState) => {

        try {
            const token = "Bearer " + window.localStorage.getItem("accessToken");

            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": token
                },
                body: JSON.stringify({
                    vacationNo: form.vacationNo,
                    memberCode: memberCode,
                    vacationStartDate: form.vacationStartDate,
                    vacationEndDate: form.vacationEndDate,
                    isHalfDay: form.isHalfDay
                })

            })
                .then(response => response.json());

            console.log('[callPostVacationUseAPI] RESULT : ', result);

            dispatch({ type: POST_VACATION_USE, payload: result.data });
        } catch (error) {
            console.error("callPostVacationAPI 에서 오류 발생 : ", error);

        }

    }

}

export const callPostVacationAPI = ({ memberCode }, remainVacation) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/${memberCode}`;

    return async (dispatch, getState) => {

        try {
            const token = "Bearer " + window.localStorage.getItem("accessToken");

            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": token
                },
                body: JSON.stringify({
                    memberCode: memberCode,
                    remainVacation: remainVacation
                })

            })
                .then(response => response.json());

            console.log('[callPostVacationAPI] RESULT : ', result);

            dispatch({ type: POST_VACATION, payload: result.data });
        } catch (error) {
            console.error("callPostVacationAPI 에서 오류 발생 : ", error);

        }

    }

}

export const callUpdateRemainVacationAPI = (memberCode, usedDay, vacationNo) => {
    console.log('member : ', memberCode, ' usedDay : ', usedDay, ' vacationNo : ', vacationNo);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/remain/${memberCode}`;

    return async (dispatch, getState) => {

        try {
            const token = "Bearer " + window.localStorage.getItem("accessToken");

            const result = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": token
                },
                body: JSON.stringify({
                    vacationNo: vacationNo,
                    memberCode: memberCode,
                    usedDay: usedDay
                })

            })
                .then(response => response.json());

            console.log('[callUpdateRemainVacationAPI] RESULT : ', result);

            dispatch({ type: POST_VACATION, payload: result.data });
        } catch (error) {
            console.error("callUpdateRemainVacationAPI 에서 오류 발생 : ", error);

        }

    }

}

export const callGetVacationAPI = ({ memberCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/vacation/${memberCode}`;
    console.log('callGetVacationAPI : ', requestURL)

    return async (dispatch, getState) => {

        try {
            const token = "Bearer " + window.localStorage.getItem("accessToken");

            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": token
                }

            })
                .then(response => response.json());

            console.log('[callGetVacationAPI] RESULT : ', result);

            dispatch({ type: GET_VACATION, payload: result.data });
        } catch (error) {
            console.error("callGetVacationAPI 에서 오류 발생 : ", error);

        }

    }

}