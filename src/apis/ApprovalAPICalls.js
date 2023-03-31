//eslint-disable-next-line
import { GET_APPROVALS, GET_PENDING, GET_COMPLETED, GET_DETAIL, POST_APPROVALS, PUT_APPROVALS, DETELE_APPROVALS} from '../modules/ApprovalModule';

// 최근 미결재 서류 목록 출력
export const callGetApprovalsAPI = ({memberCode}) => {
    //임시 
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/${memberCode}`;

    return async(dispatch, getState) => {

        const token = "Bearer" + window.localStorage.getItem("accessToken");
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : token
            }
        })
        .then(response => response.json());

        console.log('[callGetApprovalsAPI] RESULT : ', result);

        dispatch({type: GET_APPROVALS, payload : result.data});
    }
}

export const callApprovalDetailAPI = ({appCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/detail/${appCode}`;

    return async(dispatch, getState) => {
        try {
            const token = "Bearer" + window.localStorage.getItem("accessToken");
      
            const result = await fetch(requestURL, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": token,
              },
            }).then((response) => response.json());
      
            console.log("[callApprovalDetailAPI] RESULT :", result);
      
            dispatch({ type: GET_DETAIL, payload: result.data });
          } catch (error) {
            console.error("Error occurred in callApprovalDetailAPI:", error);
          };
    };
}

// 최근 미결재 서류 목록 출력
export const callGetpendingAPI = ({memberCode}) => {
  console.log('memberCode', memberCode)
  //임시 
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/pending/${memberCode}`;

  return async(dispatch, getState) => {

      const token = "Bearer" + window.localStorage.getItem("accessToken");
      // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
      // 서버에서 cors 허용을 해주어야 함
      const result = await fetch(requestURL, {
          method : "GET",
          headers : {
              "Content-Type" : "application/json",
              "Accept": "*/*",
              "Authorization" : token
          }
      })
      .then(response => response.json());

      console.log('[callGetpendingAPI] RESULT : ', result);

      dispatch({type: GET_PENDING, payload : result.data});
  }
}