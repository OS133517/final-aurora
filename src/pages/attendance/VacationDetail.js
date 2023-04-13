import React, { useEffect, useState, useRef } from 'react';
import VacationDetailCSS from "./VacationDetail.module.css"
import { NavLink } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { useDispatch, useSelector } from 'react-redux';
import { callSelectUsedVacationAPI, callSelectVacationAPI, callVacationDetailAPI } from '../../apis/AttendanceAPICall';
import Swal from "sweetalert2";     


function countWorkdays(startDate, endDate) {
    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
}

export default function VacationDetail() {
    const dispatch = useDispatch();
    const remainVcation = useSelector(state => state.attendanceReducer?.vacation);
    const usedVcation = useSelector(state => state.attendanceReducer?.usedVcations);
    const vacationDetail = useSelector(state => state.attendanceReducer?.vacationDetail);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    console.log("remainVcation", remainVcation);
    console.log("usedVcation", usedVcation);
    console.log("vacationDetail", vacationDetail);

    const navLinkRef = useRef();

    const handleClick = () => {
        Swal.fire({
          title: '휴가 신청',
          text: '휴가를 신청하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '확인',
          cancelButtonText: '취소'
        }).then((result) => {
          if (result.isConfirmed) {
            
            navLinkRef.current.click();
          }
        });
      };

    useEffect(() => {

        dispatch(callSelectUsedVacationAPI({

            memberCode : memberCode
        }))
    },[usedVcation?.usedDay])

    useEffect(() => {
        
        dispatch(callSelectVacationAPI({

            memberCode : memberCode
        }))
    },[remainVcation?.REMAIN_VACTION])

    useEffect(() => {

        dispatch(callVacationDetailAPI({

            memberCode : memberCode
        }))
    },[])

    return (

    
        <div className={VacationDetailCSS.vacationDiv}>
            <div className={VacationDetailCSS.vacationHeader}>
                <span>휴가 상세</span>
            </div>
            <div className={VacationDetailCSS.topContainer}>
                <div className={VacationDetailCSS.topContentWrapper}>
                    <span className={VacationDetailCSS.topContentTitle}>휴가관리</span>
                <div className={VacationDetailCSS.topContent}>
                    
                
                    <div className={VacationDetailCSS.topBox}>
                        <div className={VacationDetailCSS.inBox}>
                        <table className={VacationDetailCSS.inBoxTable}>
                                <thead>
                                <tr>
                                    <th>총 휴가일수</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>12일</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className={VacationDetailCSS.inBox}>
                        <table className={VacationDetailCSS.inBoxTable}>
                                <thead>
                                <tr>
                                    <th>휴가 사용일 수</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{usedVcation?.usedDay}일</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className={VacationDetailCSS.inBox}>
                        <table className={VacationDetailCSS.inBoxTable}>
                                <thead>
                                <tr>
                                    <th>휴가 잔여일 수</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{remainVcation?.REMAIN_VACATION}일</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        
                    </div>
                    
                </div>
                <div className={VacationDetailCSS.buttonWrapper}>
                
                    <button className={VacationDetailCSS.VacationButton} type="button" onClick={handleClick}>휴가신청</button>
                    <NavLink
                        to={`/aurora/approval/form/7`}
                        ref={navLinkRef}
                        style={{ display: 'none' }}
                    ></NavLink>
                </div>
                </div>
            </div>
            <div className={VacationDetailCSS.lowContainer}>
            <div className={VacationDetailCSS.tableWrapper}>  
                <table className={VacationDetailCSS.collapsedTable}>
                    <thead>
                        <tr>
                        <th></th>
                        <th>휴가 구분</th>
                        <th>시작-종료일자</th>
                        <th>차감일수</th>
                        <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          Array.isArray(vacationDetail) && vacationDetail.map((vacation) => { 
                            const startDate = new Date(vacation?.vacationStartDate);
                            const endDate = new Date(vacation?.vacationEndDate);
                            const workdays = countWorkdays(startDate, endDate);
                            
                            return (
                            <tr key={vacation?.vacationNo} id={vacation?.vacationNo}>
                            <td></td>
                            <td>{vacation?.halfDay ? "반차" : "종일휴가"}</td>
                            <td>{vacation?.vacationStartDate} - {vacation?.vacationEndDate}</td>
                            <td>&nbsp;&nbsp;{workdays}일</td>
                            <td>
                                {vacation?.appStatus === "Y" ? "승인" :
                                vacation?.appStatus === "N" ? "대기" :
                                vacation?.appStatus === "P" ? "진행중" :
                                vacation?.appStatus === "W" ? "반려" :
                                ""}
                            </td>
                        </tr>
                           )
                        })
                      }
                  </tbody>
              
                    </table>
                </div>   
            </div>
        </div>
    
    );
}

