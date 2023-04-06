import { GET_LIST, GET_DETAIL } from "../modules/MessengerModule";


export const callMessengerListAPI = ({ memberCode }) => {

    // console.log('[callMessengerListAPI] in');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/messenger-lists/${memberCode}`;

    const token = "Bearer " + window.localStorage.getItem("accessToken");

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": token
                }
            })
                .then(response => response.json());

            console.log('[callMessengerListAPI] RESULT : ', result);

            dispatch({ type: GET_LIST, payload: result.data })
        } catch (error) {
            console.error("callMessengerListAPI 에서 오류 발생 : ", error);
        }

    }
}

