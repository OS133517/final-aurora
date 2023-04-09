import React, { useEffect, useState, useRef  } from 'react';
import AttendanceCSS from "./Attendance.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { callEndTimeAPI,
        callSelectAttendanceAPI,
        callSelectMonthTimeAPI,
        callSelectVacationAPI,
        callSelectWorkStatus,
        callWorkTimeAPI
     } from '../../apis/AttendanceAPICall';
     import { callMemberDetailAPI
       } from '../../apis/HrmAPICall';

import Swal from "sweetalert2";     

export default function Attendance() {
    const dispatch = useDispatch();
    const attendanceStatus = useSelector(state => state.attendanceReducer.attendanceStats);
    const monthTime = useSelector(state => state.attendanceReducer.workHours);
    const remainVacation = useSelector(state => state.attendanceReducer.vacation);
    const memberInfo = useSelector(state => state.hrmReducer?.memberDetail);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    const [workStatus, setWorkStatus] = useState("퇴근");

    const memberName = memberInfo?.memberDTO?.memberName;
    const deptName = memberInfo?.memberDTO?.deptName;
    //  console.log(memberInfo);
    //  console.log(deptName);   
    //총근무시간
    const workedMinutes = monthTime?.total_worked_minutes ;
    const hours = Math.floor(workedMinutes / 60);
    const minutes = workedMinutes % 60;
    const totalWorked = `${hours||0}시간 ${minutes||0}분`;
    //평균근무시간
    const totalWorkedMinutes = monthTime?.avg_worked_minutes ;
    const agvHours = Math.floor(totalWorkedMinutes / 60);
    const avgMinutes = totalWorkedMinutes % 60;
    const avgWorked = `${agvHours||0}시간 ${avgMinutes||0}분`;

    console.log("workStatus", workStatus);
    console.log("attendanceStatus" ,attendanceStatus);
    console.log("monthTime", monthTime);
    console.log("remainVacation", remainVacation);
  
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
        const savedWorkStatus = localStorage.getItem("workStatus");
        if (savedWorkStatus) {
          setWorkStatus(savedWorkStatus);
        } else {
          setWorkStatus("퇴근");
        }
      }, []);

    const handleStartWork =async (memberCode) => {
        console.log(memberCode);

        await dispatch(callWorkTimeAPI({

            memberCode : memberCode
            
        }));

        const action = await dispatch(callSelectWorkStatus({ memberCode: memberCode }));
        console.log("action" ,action);
       
        if (action && action.payload) {
            const response = action.payload;
            setWorkStatus(response.WORK_STATUS);
            localStorage.setItem("workStatus", "근무");

            Swal.fire({
                title: "Success!",
                text: "출근 처리되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "출근 처리에 실패하였습니다.",
                icon: "error",
                confirmButtonText: "확인",
              });
              localStorage.setItem("workStatus", "근무");
        }
    };

    const handleEndWork = async (memberCode) => {
        await dispatch(callEndTimeAPI({     

            memberCode : memberCode

          
        }));
        const action = await dispatch(callSelectWorkStatus({ memberCode: memberCode }));
        if (action && action.payload) {
            const response = action.payload;
            setWorkStatus(response.WORK_STATUS);
            localStorage.setItem("workStatus", "퇴근");

            Swal.fire({
                title: "Success!",
                text: "퇴근 처리되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "퇴근 처리에 실패하였습니다.",
                icon: "error",
                confirmButtonText: "확인",
              });
              localStorage.setItem("workStatus", "퇴근");
        }
    };

  

    useEffect(() => {

        dispatch(callMemberDetailAPI({

            memberCode: memberCode

        }))
    },[])

    useEffect(() => {

        dispatch(callSelectWorkStatus({ memberCode: memberCode }));

      }, []);

    useEffect(() => {

        dispatch(callSelectMonthTimeAPI({ 
            memberCode : memberCode,
        }));
       
        dispatch(callSelectVacationAPI({ 
            memberCode : memberCode,          
        }));
        dispatch(callSelectAttendanceAPI({ 
            memberCode : memberCode
        }));
        
    },[memberCode]);






    return (
        <>
        <div className={AttendanceCSS.allArea}>
            <div className={AttendanceCSS.hrmHeader}>
                <span>근태 목록</span>
            </div>
            <div className={AttendanceCSS.attDiv}> 
                <div className={AttendanceCSS.boxContainer}>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>근태현황</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>지각</th>
                                        <th>결근</th>
                                        <th>조퇴</th>
                                        <th>무단결근</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* 이부분에서 db에 데이터가 없으면 아예 안보임 처리해야 할거 */}
                                        <td>{attendanceStatus?.TARDY}</td>
                                        <td>{attendanceStatus?.ABSENCE}</td>
                                        <td>{attendanceStatus?.EARLY_OFF}</td>
                                        <td>{attendanceStatus?.TRUANCY}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>근무시간</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>근무일수</th>
                                        <th>총근무시간</th>
                                        <th>평균근무시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{monthTime?.total_work_days}일</td>
                                        <td>{totalWorked}</td>
                                        <td>{avgWorked}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>휴가현황</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>잔여 휴가</th>
                                        <th></th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{remainVacation.REMAIN_VACATION}</td>
                                        <div>
                                        <button type='button' className={AttendanceCSS.VacationButton} onClick={handleClick}>휴가신청</button>
                                        <NavLink
                                            to={`/aurora/approval/form/7`}
                                            ref={navLinkRef}
                                            style={{ display: 'none' }}
                                        ></NavLink>
                                        </div>
                                            
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div> 
                        </div>
                        <br/>
                      <div className={AttendanceCSS.boxContainer2}>
                        <div className={AttendanceCSS.boxWrapper2}>
                            <span></span>
                            <div className={AttendanceCSS.Box2}>
                                <div className={AttendanceCSS.img}> </div>
                                <h3> {deptName} 부서, {memberName}님 환영합니다</h3>
                                <div className={AttendanceCSS.inOutButton}>
                              {workStatus === '퇴근' && (  
                                <button type="button" onClick={() => handleStartWork(memberCode)}>출근</button>   
                                )}                    
                              {workStatus === '근무' && (   
                                <button type="button" onClick={() => handleEndWork(memberCode)}>퇴근</button>   
                                 )}      
                                </div>
                            </div>
                        </div>
                        <div className={AttendanceCSS.boxWrapper3}>
                            <span></span>
                            <div className={AttendanceCSS.Box3}>
                        
                            </div>
                        </div>  
                    </div>
                    
                </div>           
            </div>
        </>
    )
}
