import { useEffect, useState } from "react";
import AttendanceCSS from "./AttInMain.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useDispatch, useSelector } from "react-redux";
import { callEndTimeAPI, callSelectTimeByDayAPI, callSelectWorkStatus, callWorkTimeAPI } from "../../apis/AttendanceAPICall";
import Swal from "sweetalert2";
import TimeChart from '../../components/attendance/TimeChart';
import { callMemberDetailAPI } from "../../apis/HrmAPICall";
import { useNavigate } from "react-router";

function AttInMain() {

    const workHours = useSelector(state => state.attendanceReducer?.inOutTime);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [workStatus, setWorkStatus] = useState("퇴근");
    const memberInfo = useSelector(state => state.hrmReducer?.memberDetail);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    const memberName = memberInfo?.memberDTO?.memberName;
    const deptName = memberInfo?.memberDTO?.deptName;

    console.log("workHours" , workHours);
    const [disableStartWorkButton, setDisableStartWorkButton] = useState(false);
    const currentDate = new Date();
    const localDate3 = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    const formattedDate = localDate3.toISOString().substring(0, 10);
    const [selectDate , setSelectDate] = useState(formattedDate);

    const date = workHours?.WORK_TIME ? new Date(workHours.WORK_TIME): null;
    const localDate = date ? new Date(date.getTime() + (date.getTimezoneOffset()  + 9 * 60) * 60 * 1000): null;
    const hours = localDate ? localDate.getHours().toString().padStart(2, '0'): "0";
    const minutes = localDate ? localDate.getMinutes().toString().padStart(2, '0'): "0";
    const seconds = localDate ? localDate.getSeconds().toString().padStart(2, '0'): "0";
    const timeOnly = localDate ? `${hours}시 ${minutes}분 ${seconds}초` : "0시 0분 0초";

    const date2 = workHours?.OFF_TIME ? new Date(workHours.OFF_TIME) : null;
    const localDate2 = date2 ? new Date(date2.getTime() + (date2.getTimezoneOffset()  + 9 * 60) * 60 * 1000): null;
    const hours2 = localDate2 ? localDate2.getHours().toString().padStart(2, '0'): "0";
    const minutes2 = localDate2 ? localDate2.getMinutes().toString().padStart(2, '0'): "0";
    const seconds2 = localDate2 ? localDate2.getSeconds().toString().padStart(2, '0'): "0";
    const timeOnly2 = localDate2 ? `${hours2}시 ${minutes2}분 ${seconds2}초` : "0시 0분 0초";
    
    const [elapsedTime, setElapsedTime] = useState("00시 00분 00초");


    useEffect(() => {

        dispatch(callSelectTimeByDayAPI({
          memberCode : memberCode,
          attRegDate : selectDate
        }))
      },[selectDate])

    useEffect(() => {

        dispatch(callMemberDetailAPI({

            memberCode: memberCode
        }));
    }, [])

    useEffect(() => {
        const savedWorkStatus = localStorage.getItem("workStatus");
        if (savedWorkStatus) {
          setWorkStatus(savedWorkStatus);
        } else {
          setWorkStatus("퇴근");
        }
      }, []);

      useEffect(() => {
        if (workStatus === '근무') {
          const interval = setInterval(() => {
            const now = new Date();
            const elapsedTime = now - localDate;
            const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
            const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
            const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
            setElapsedTime(`${elapsedHours}시 ${elapsedMinutes}분 ${elapsedSeconds}초`);
          }, 1000);
    
          return () => clearInterval(interval);
        }
      }, [workStatus, localDate]);

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
        setDisableStartWorkButton(true);
        window.location.reload()
        
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

        memberCode: memberCode

    }));
       
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
        window.location.reload();

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

    return (
        <div className={AttendanceCSS.boxWrapper2}>
            <div className={AttendanceCSS.Box2}>
                <div className={AttendanceCSS.header}>
                    <div onClick={() => navigate("/aurora/attendance")} style={{ cursor: "pointer" }}>
                        근태
                    </div>
                    <div>
                        {new Date().toLocaleDateString('kr')}
                    </div>
                </div>
                <div className={AttendanceCSS.graphDiv}>
                <TimeChart hours={parseInt(hours)} hours2={hours2 ? parseInt(hours2) : null} />
                <div className={AttendanceCSS.time}>
               <span className={AttendanceCSS.attendance}> 출근: {timeOnly}</span><br/>
               {/* <div> */}
               {workStatus === '근무' && (
                    <span>근무 시간: {elapsedTime}</span>
                )}
                {/* </div> */}
                </div>
                </div>
                <div className={AttendanceCSS.footer}>
                    <span> {deptName} 부서,<b> {memberName}</b>님 환영합니다 </span>
                    <div>
                        {workStatus === '퇴근' && (
                            <button type="button" onClick={() => handleStartWork(memberCode)} disabled={disableStartWorkButton}>출근</button>
                        )}
                        {workStatus === '근무' && (
                            <button type="button" onClick={() => handleEndWork(memberCode)}>퇴근</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttInMain;