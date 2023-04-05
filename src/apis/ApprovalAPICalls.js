//eslint-disable-next-line
import { useState } from 'react';
//eslint-disable-next-line
import { GET_APPROVALS, GET_PENDING, GET_COMPLETED, GET_DETAIL, POST_APPROVALS, PUT_APPROVALS, DETELE_APPROVALS, POST_APPROVALLINE, GET_WAIT } from '../modules/ApprovalModule';

// 최근 미결재 서류 목록 출력
export const callGetApprovalsAPI = ({ memberCode }) => {
  //임시 
  console.log('callGetApprovalsAPI', memberCode);
  console.log('callGetApprovalsAPI', typeof memberCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/${memberCode}`;

  return async (dispatch, getState) => {
    try {
      const token = "Bearer" + window.localStorage.getItem("accessToken");
      // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
      // 서버에서 cors 허용을 해주어야 함
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token
        }
      })
        .then(response => response.json());

      console.log('[callGetApprovalsAPI] RESULT : ', result);

      dispatch({ type: GET_APPROVALS, payload: result.data });
    } catch (error) {
      console.error("callGetApprovalsAPI 에서 오류 발생 : ", error);
    };
  };
}

export const callApprovalDetailAPI = ({ appCode }) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/detail/${appCode}`;

  return async (dispatch, getState) => {
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
export const callGetpendingAPI = ({ memberCode }) => {
  console.log('memberCode', memberCode)
  //임시 
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/pending/${memberCode}`;

  return async (dispatch, getState) => {
    try {
      const token = "Bearer " + window.localStorage.getItem("accessToken");
      // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
      // 서버에서 cors 허용을 해주어야 함
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token
        }
      })
        .then(response => response.json());

      console.log('[callGetpendingAPI] RESULT : ', result);

      dispatch({ type: GET_PENDING, payload: result.data });
    }
    catch (error) {
      console.error("callGetpendingAPI 에서 오류 발생 : ", error);
    };
  }
}

// 결재서류 등록`
export const callPostApprovalAPI = ({ form }, docNum, memberCode, setResponseStatus) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/draft/form/${docNum}`;

  return async (dispatch, getState) => {
    try {

      const token = "Bearer" + window.localStorage.getItem("accessToken");

      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token
        },
        body: JSON.stringify({
          appTitle: form.appTitle,
          appDescript: form.appDescript,
          appEndDate: form.appEndDate,
          appOpen: form.appOpen,
          memberDTO: { memberCode: memberCode }
        })
      })
      setResponseStatus(response.status);
      const result = await response.json();

      console.log('[callPostApprovalAPI] RESULT : ', result);

      dispatch({ type: POST_APPROVALS, payload: result.data })

      // const appCode = result.appCode;

    } catch (error) {
      console.error("callPostApprovalAPI 에서 오류 발생 : ", error);
    };


  }
}

// 결재선 등록
export const callPostApprovalLineAPI = (appCode, selectedMember, setResponseStatus) => {

  return async (dispatch, getState) => {
    try {
      const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/draft/form/line/${appCode}`;

      const requestBody = selectedMember.map((member) => ({
        appCode: member.appCode,
        memberDTO: { memberCode: member.memberCode },
        appStatus: "n",
      }));

      const token = "Bearer " + window.localStorage.getItem("accessToken");


      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token

        },
        body: JSON.stringify(requestBody)
      });
      setResponseStatus(response.status);

      const result = await response.json();
      console.log("[callApprovalDetailAPI] RESULT :", result);

      dispatch({ type: POST_APPROVALLINE, payload: result.data })

    } catch (error) {
      console.error("callPostApprovalAPI 에서 오류 발생 : ", error);
    }
  }
}

// 결재 대기
export const callGetwaitingAPI = ({ memberCode }) => {
  console.log('memberCode', memberCode)
  //임시 
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/approvalLine/${memberCode}`;

  return async (dispatch, getState) => {
    try {
      const token = "Bearer" + window.localStorage.getItem("accessToken");
      // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
      // 서버에서 cors 허용을 해주어야 함
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token
        }
      })
        .then(response => response.json());

      console.log('[callGetwaitingAPI] RESULT : ', result);

      dispatch({ type: GET_WAIT, payload: result.data });
    }
    catch (error) {
      console.error("callGetwaitingAPI 에서 오류 발생 : ", error);
    };
  }
}

//결재선 수정
export const callPutApprovalLine = ({ appCode, approvalDTO, appStatus }, setResponseStatus) => {
  console.log('approvalDTO.memberDTO.memberCode : ', approvalDTO.memberDTO.memberCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/draft/form/line/${appCode}`;
  try {
    const token = "Bearer " + window.localStorage.getItem("accessToken");
    return async (dispatch, getState) => {

      const response = await fetch(requestURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": token
        },
        body: JSON.stringify({
          appCode: appCode,
          memberDTO: { memberCode: approvalDTO.memberDTO.memberCode },
          appStatus: appStatus

        })
      })
      setResponseStatus(response.status);

      const result = await response.json();

      console.log('[callPutApprovalLine] RESULT', result);

      dispatch({ type: PUT_APPROVALS, payload: result.data });
    }

  } catch (error) {
    console.error("callGetwaitingAPI 에서 오류 발생 : ", error);
  }

}

export const callDeleteApprovalAPI = ({ appCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/approvals/${appCode}`;
  try {
    const token = "Bearer " + window.localStorage.getItem("accessToken");
    return async (dispatch, getState) => {

      const response = await fetch(requestURL, {
        method: "DELETE"
      })

      const result = await response.json();

      console.log('[callDeleteApprovalAPI] RESULT', result);
    }

  } catch (error) {
    console.error("callDeleteApprovalAPI 에서 오류 발생 : ", error);
  }

}