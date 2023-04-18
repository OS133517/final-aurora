import React, { useEffect, useState, useRef  } from 'react';
import AttendanceCSS from "./Attendance.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { callEndTimeAPI,
        callSelectAttendanceAPI,
        callSelectMonthTimeAPI,
        callSelectTimeByDayAPI,
        callSelectUsedVacationAPI,
        callSelectVacationAPI,
        callSelectWorkStatus,
        callWorkTimeAPI
     } from '../../apis/AttendanceAPICall';
     import { callMemberDetailAPI
       } from '../../apis/HrmAPICall';

import Swal from "sweetalert2";     

export default function Attendance() {
    const dispatch = useDispatch();
    const workHours = useSelector(state => state.attendanceReducer?.inOutTime);
    const attendanceStatus = useSelector(state => state.attendanceReducer?.attendanceStatus);
    const monthTime = useSelector(state => state.attendanceReducer.workHours);
    const remainVacation = useSelector(state => state.attendanceReducer?.vacation);
    const memberInfo = useSelector(state => state.hrmReducer?.memberDetail);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    const [workStatus, setWorkStatus] = useState("퇴근");
    const currentDate = new Date();
    const usedVcation = useSelector(state => state.attendanceReducer?.usedVcations);
    const localDate3 = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    const formattedDate = localDate3.toISOString().substring(0, 10);
    const [selectDate , setSelectDate] = useState(formattedDate);
    let result = (12- usedVcation?.usedDay)
    console.log("workHours" , workHours);

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
    const avgMinutes = Math.floor(totalWorkedMinutes % 60);
    const avgWorked = `${agvHours||0}시간 ${avgMinutes||0}분`;

    console.log("workStatus", workStatus);
    console.log("attendanceStatus" ,attendanceStatus);
    console.log("monthTime", monthTime);
    remainVacation && console.log("remainVacation", remainVacation);
  
    const navLinkRef = useRef();
    
    const [disableStartWorkButton, setDisableStartWorkButton] = useState(false);
   
   
    useEffect(() => {

        dispatch(callSelectUsedVacationAPI({

            memberCode : memberCode
        }))
    },[usedVcation?.usedDay])

    useEffect(() => {

        dispatch(callSelectTimeByDayAPI({
          memberCode : memberCode,
          attRegDate : selectDate
        }))
      },[selectDate])

    useEffect(() => {
        if (workStatus === "근무") {
            setDisableStartWorkButton(true);
        } else {
            setDisableStartWorkButton(false);
        }
    }, [workStatus]);  


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

        if (workHours?.OFF_TIME) {
            Swal.fire({
                title: "Warning!",
                text: "당일 퇴근 시간이 이미 등록되어 있습니다. 다시 출근 처리할 수 없습니다.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }
    
        await dispatch(callWorkTimeAPI({
    
            memberCode: memberCode
    
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
        setDisableStartWorkButton(true);
        
    };

    const handleEndWork = async (memberCode) => {
        const now = new Date();
        const currentHours = now.getHours();

        if (currentHours < 18) {
            const result = await Swal.fire({
                title: "Warning!",
                text: "현재 오후 6시 이전입니다. 정말 퇴근하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "예",
                cancelButtonText: "아니오",
            });

            if (result.isDismissed) {
                return;
            }
        }
       
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
        setDisableStartWorkButton(true);
        window.location.reload()

    };

    useEffect(() => {
        const checkWorkStatus = async () => {
            const action = await dispatch(callSelectWorkStatus({ memberCode: memberCode }));
            if (action && action.payload) {
                const response = action.payload;
                setWorkStatus(response.WORK_STATUS);
                localStorage.setItem("workStatus", response.WORK_STATUS);
    
                if (response.WORK_STATUS === "근무") {
                    setDisableStartWorkButton(true);
                }
            }
        };
        
        checkWorkStatus();
    }, []);
  

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
            memberCode : memberCode,
            selectedDate :formattedDate
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
                                        <td>{attendanceStatus?.TARDY}회</td>
                                        <td>{attendanceStatus?.ABSENCE}회</td>
                                        <td>{attendanceStatus?.EARLY_OFF}회</td>
                                        <td>{attendanceStatus?.TRUANCY}회</td>
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
                                        {/* <td>{remainVacation?.REMAIN_VACATION}일</td> */}
                                        <td>{result}일</td>
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
                                <div className={AttendanceCSS.img}>
                                <img className={AttendanceCSS.responsiveImage} src={ process.env.PUBLIC_URL + "/" + "person" + ".png" } alt="이미지"/>
                                     </div>
                                     
                                <h3> {deptName} 부서, {memberName}님 환영합니다</h3>
                                <div className={AttendanceCSS.inOutButton}>
                              {workStatus === '퇴근' && (  
                                <button type="button" onClick={() => handleStartWork(memberCode)} disabled={disableStartWorkButton}>출근</button>   
                                )}                    
                              {workStatus === '근무' && (   
                                <button type="button" onClick={() => handleEndWork(memberCode)}>퇴근</button>   
                                 )}      
                                </div>
                            </div>
                        </div>
                        <div className={AttendanceCSS.boxWrapper3}>
                            <span>휴가 선호도<b>(월)</b> </span>
                            <div className={AttendanceCSS.Box3}>
                            {/* ?<iframe src={`http://localhost:5601/app/dashboards#/view/0bbdb7a0-da8d-11ed-ba2d-17b135d08f3b?embed=true&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'2023-03-31T15:31:56.476Z',to:now))&_a=(description:'',expandedPanelId:'49f1119c-4355-4a21-94e1-a5c9d4938e17',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'971e7b60-da8b-11ed-ba2d-17b135d08f3b',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'971e7b60-da8b-11ed-ba2d-17b135d08f3b',name:indexpattern-datasource-layer-2bc1086e-7243-4610-9bbe-63d9c5598311,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('2bc1086e-7243-4610-9bbe-63d9c5598311':(columnOrder:!(b715e65b-3238-4b1e-a2e3-0ce69760fb61,'49f6d1c9-9f68-4cbc-b663-59d443099433'),columns:('49f6d1c9-9f68-4cbc-b663-59d443099433':(dataType:number,isBucketed:!f,label:'95th%20percentile%20of%20month',operationType:percentile,params:(percentile:95),scale:ratio,sourceField:month),b715e65b-3238-4b1e-a2e3-0ce69760fb61:(dataType:number,isBucketed:!t,label:month,operationType:range,params:(maxBars:auto,ranges:!((from:0,label:'',to:1000)),type:histogram),scale:interval,sourceField:month)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!(b715e65b-3238-4b1e-a2e3-0ce69760fb61),layerId:'2bc1086e-7243-4610-9bbe-63d9c5598311',layerType:data,legendDisplay:default,metric:'49f6d1c9-9f68-4cbc-b663-59d443099433',nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'49f1119c-4355-4a21-94e1-a5c9d4938e17',w:24,x:24,y:0),panelIndex:'49f1119c-4355-4a21-94e1-a5c9d4938e17',type:lens,version:'7.17.5')),query:(language:kuery,query:'member_code:${memberCode}'),tags:!(),timeRestore:!f,title:%EA%B7%BC%ED%98%B82,viewMode:view)&hide-filter-bar=true`} height="450" width="800"></iframe>                         */}   
                            <iframe src={`http://localhost:5601/app/dashboards#/view/04aef2c0-dce1-11ed-9512-034efa2d02f3?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:10000),time:(from:now-15d,to:now))&_a=(description:'',expandedPanelId:'54c8ec05-1754-4ce2-8855-4fa9db61bca2',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:d4b43bc0-dce0-11ed-9512-034efa2d02f3,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:d4b43bc0-dce0-11ed-9512-034efa2d02f3,name:indexpattern-datasource-layer-326a6e96-bd82-4e2a-bb06-27a08984e393,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('326a6e96-bd82-4e2a-bb06-27a08984e393':(columnOrder:!(bc520ece-040b-436d-b561-33a4e6cf71a0,'7823aa30-479c-4f26-af28-8eaf58cb2cbd'),columns:('7823aa30-479c-4f26-af28-8eaf58cb2cbd':(dataType:number,isBucketed:!f,label:'95th%20percentile%20of%20month',operationType:percentile,params:(percentile:95),scale:ratio,sourceField:month),bc520ece-040b-436d-b561-33a4e6cf71a0:(dataType:number,isBucketed:!t,label:month,operationType:range,params:(maxBars:auto,ranges:!((from:0,label:'',to:1000)),type:histogram),scale:interval,sourceField:month)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!(bc520ece-040b-436d-b561-33a4e6cf71a0),layerId:'326a6e96-bd82-4e2a-bb06-27a08984e393',layerType:data,legendDisplay:default,metric:'7823aa30-479c-4f26-af28-8eaf58cb2cbd',nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'54c8ec05-1754-4ce2-8855-4fa9db61bca2',w:24,x:0,y:0),panelIndex:'54c8ec05-1754-4ce2-8855-4fa9db61bca2',type:lens,version:'7.17.5')),query:(language:kuery,query:'member_code:${memberCode}'),tags:!(),timeRestore:!f,title:%EA%B7%BC%ED%98%B8,viewMode:view)&hide-filter-bar=true`} height="450" width="800"></iframe></div> 
                        </div>  
                    </div>
                    
                </div>           
            </div>
        </>
    )
}
