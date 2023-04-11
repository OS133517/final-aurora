import { POST_VACATION } from '../modules/VacationModule';


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

            dispatch({ type: POST_VACATION, payload: result.data });
        } catch (error) {
            console.error("callPostVacationAPI 에서 오류 발생 : ", error);

        }

    }

}

export const callPostVacationAPI = ({ memberCode }) => {
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
                    memberCode: memberCode
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