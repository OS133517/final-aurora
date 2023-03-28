import { POST_LOGIN } from "../modules/MemberModule";

export const  callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Access-Control-Allow-Origin" : "*"
            },
            body : JSON.stringify({
                memberId : form.memberId,
                memberPWD : form.memberPWD
            })
        }).then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);

        if(result.status === 200) {
            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch({type : POST_LOGIN, payload : result});
    }
}