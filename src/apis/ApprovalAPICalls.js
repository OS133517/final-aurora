//eslint-disable-next-line
import {GET_APPROVALS, GET_PENDING, GET_COMPLETED, GET_DETAIL, POST_APPROVALS, PUT_APPROVALS, DETELE_APPROVALS} from '../modules/ApprovalModule';

// 최근 미결재 서류 목록 출력
export const callGetApprovalsAPI = ({memberCode}) => {
    console.log(memberCode)
    //임시 
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/1`;

    return async(dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer" + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[callGetApprovalsAPI] RESULT', result);

        dispatch({type: GET_APPROVALS, payload : result});
    }
}