import { POST_LOGIN, GET_LIST, GET_DETAIL, GET_MEMEBER_INFO } from "../modules/MemberModule";

export const callLoginAPI = ({ form }) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPWD: form.memberPWD
            })
        }).then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);

        if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }

        dispatch({ type: POST_LOGIN, payload: result });
    }
}

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: '' });// 이렇게 로컬스토리지에서 토큰 지우고 아무것도 없는 걸로 로그인하는 식으로 로그아웃하는구나
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    }
}

export const callMemberListAPI = () => {

    console.log('[callMemberListAPI] in');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members`;

    const token = "Bearer" + window.localStorage.getItem("accessToken");

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": token
                }
            })
                .then(response => response.json());

            console.log('[callMemberListAPI] RESULT : ', result);

            dispatch({ type: GET_LIST, payload: result.data })
        } catch (error) {
            console.error("callMemberListAPI 에서 오류 발생 : ", error);
        }

    }
}

export const callMemberDetailAPI = ({ memberCode }) => {

    console.log('[callMemberDetailAPI] in', memberCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/${memberCode}`;

    const token = "Bearer" + window.localStorage.getItem("accessToken");

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": token
                }
            })
                .then(response => response.json());

            console.log('[callMemberDetailAPI] RESULT : ', result);

            dispatch({ type: GET_DETAIL, payload: result.data })
        } catch (error) {
            console.error("callMemberListAPI 에서 오류 발생 : ", error);
        }

    }
}

export const callMemberInfoAPI = ({memberCode}) => {
    console.log(memberCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/worklogs/days/member/${memberCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },

            // body : JSON.stringify({
            //     memberCode : memberCode,
            //     morningDayContent : form.get("morningDayContent"),
            //     morningDayNote : form.get("morningDayNote"),
            //     afternoonDayContent : form.get("afternoonDayContent"),
            //     afternoonDayNote : form.get("afternoonDayNote"),
            //     daySpecialNote : form.get("daySpecialNote")
                
            // })
            })
        .then(response => response.json());

        if(result.status === 200){
            console.log('[callMemberInfoAPI] callDayWorklogDetailAPI SUCCESS' + result);
            dispatch({ type: GET_MEMEBER_INFO, payload: result.data });
        }
    }
}