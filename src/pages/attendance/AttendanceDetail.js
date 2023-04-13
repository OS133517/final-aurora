import React, { useEffect, useState, useRef } from 'react';
import AttendanceDetailCSS from "./AttendanceDetail.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from "../../utils/tokenUtils";
import { callSelectAttendanceAPI, callSelectTimeAPI, callSelectTimeByDayAPI, callSelectVacationAPI } from '../../apis/AttendanceAPICall';
import TimeChart from '../../components/attendance/TimeChart';
import AttendanceDoughnut from '../../components/attendance/AttendanceDoughnut';


export default function AttendanceDetail() {
    const dispatch = useDispatch();
    const attendanceStatus = useSelector(state => state.attendanceReducer?.attendanceStatus);
    // const attStatus = attendanceStatus.data;
  
    console.log("attendanceStatus",attendanceStatus);
    const workHours = useSelector(state => state.attendanceReducer?.inOutTime);
    const workHoursDetail = useSelector(state => state.attendanceReducer?.workHoursDetail);
    const vacation = useSelector(state => state.attendanceReducer?.vacation);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [workStart, setWorkStart] = useState(null);
    const [workEnd, setWorkEnd] = useState(null);

    //일일 총근무 시간 
    const [totalWorkTimeString, setTotalWorkTimeString] = useState("0시간 0분");
    
    // const workStartDate = new Date(workHours?.WORK_TIME);
    // const workEndDate = workHours?.OFF_TIME ? new Date(workHours?.OFF_TIME) : new Date();

    console.log("attendanceStatus" ,attendanceStatus);
    console.log("workHours", workHours);
    console.log("vacation", vacation);
    console.log("workHoursDetail" ,workHoursDetail);


    // const startWork = inOutTime.WORK_TIME(new Date().toISOString().split('T')[0]);
    // const endtWork = workHours.OFF_TIME(new Date().toISOString().split('T')[0]);

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
    

    //이번주 총 근무 시간
    const totalWeek = workHoursDetail?.worked_minutes_this_week;
    console.log("totalWeek", totalWeek);
    const totalWeekHours = Math.floor(totalWeek / 60);
    const totalWeekMinutes = totalWeek % 60;
    const totalWorkedWeek = `${totalWeekHours||0}시간 ${totalWeekMinutes||0}분`;
    console.log("totalWorkedWeek" ,totalWorkedWeek);

    //이번주 초과 
    const extraWeek = workHoursDetail?.extra_worked_minutes;
    console.log("extraWeek", extraWeek);
    const extraWeekHours = Math.floor(extraWeek / 60);
    const extraWeekMinutes = extraWeek % 60;
    const extraWorkedWeek = `${extraWeekHours||0}시간 ${extraWeekMinutes||0}분`;

    //이번주 잔여
    const remainWeek = workHoursDetail?.remaining_minutes;
    console.log("remainWeek", remainWeek);
    const remainWeekHours = Math.floor(remainWeek / 60);
    const remainWeekMinutes = remainWeek % 60;
    const remainWorkedWeek = `${remainWeekHours||0}시간 ${remainWeekMinutes||0}분`;

    //이번달 누적
    const totalMonth = workHoursDetail?.worked_minutes_this_month;
    console.log("totalMonth", totalMonth);
    const totalMonthHours = Math.floor(totalMonth / 60);
    const totalMonthMinutes = totalMonth % 60;
    const totalWorkedMonth = `${totalMonthHours||0}시간 ${totalMonthMinutes||0}분`;

    const handleDateChange = (e) => {
      const date = e.target.value;
      setSelectedDate(date);

      setWorkStart(workHours.WORK_TIME);
      setWorkEnd(workHours.OFF_TIME);
    };

    useEffect(() => {
      const updateTotalWorkTime = () => {
       if (workHours?.WORK_TIME) {
        const workStartDate = new Date(workHours?.WORK_TIME);
        const workEndDate = workHours?.OFF_TIME ? new Date(workHours?.OFF_TIME) : new Date();
        const totalWorkTime = Math.abs(workEndDate - workStartDate);
        const totalWorkTimeHours = Math.floor(totalWorkTime / (1000 * 60 * 60));
        const totalWorkTimeMinutes = Math.floor((totalWorkTime / (1000 * 60)) % 60);
        const newTotalWorkTimeString = `${totalWorkTimeHours}시간 ${totalWorkTimeMinutes}분`;
        setTotalWorkTimeString(newTotalWorkTimeString);
      } else {
        setTotalWorkTimeString("0시간 0분");
      }
    };

      updateTotalWorkTime(); // Initialize the total work time
      const interval = setInterval(() => {
        updateTotalWorkTime();
      }, 60000); 
    
      return () => clearInterval(interval); 
    }, [workHours]);

    // const isToday = (date) => {
    //   const today = new Date();
    //   const selectedDate = new Date(date);
    //   return selectedDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    // };

    // const wokrTimeBarChart = () => {

    //   const [charData, setCharData] = useState({});
    //  }


    


    useEffect(() => {

      dispatch(callSelectTimeAPI({ 
          
          memberCode : memberCode,
          selectTime : selectedDate

        }))
        },[selectedDate ,memberCode ]);




    useEffect(() => {

      dispatch(callSelectVacationAPI({ 
          memberCode : memberCode,          
      }));
      dispatch(callSelectAttendanceAPI({ 
          memberCode : memberCode,
          selectedDate :selectedDate
      }));

      
  },[memberCode]);

  useEffect(() => {

    dispatch(callSelectTimeByDayAPI({
      memberCode : memberCode,
      attRegDate : selectedDate
    }))
  },[selectedDate])

  // useEffect(() => {
  //   const selectedWorkHours = workHours[selectedDate];
  //   if (selectedWorkHours) {
  //     setWorkStart(selectedWorkHours.WORK_TIME);
  //     setWorkEnd(selectedWorkHours.OFF_TIME);
  //   } else {
  //     setWorkStart(null);
  //     setWorkEnd(null);
  //   }
  // }, [selectedDate, workHours]);



    return (
       <> 
       
        <div className={AttendanceDetailCSS.allContainer}>
            <div className={AttendanceDetailCSS.attHeader}>
                <span>근태 상세</span>
            </div>
            <div className={AttendanceDetailCSS.calender}>
            <div className={AttendanceDetailCSS.centerAlign}>
                <input type="date" value={selectedDate}
                  onChange={handleDateChange}/>
                </div>
            </div>
            <div className={AttendanceDetailCSS.topContent}>
               <div className={AttendanceDetailCSS.topBoxWrap1}>
                <div className={AttendanceDetailCSS.topBox1}>
                  <table className={AttendanceDetailCSS.table}>
                  <tbody>
                    <tr>
                      <td>이번주 누적</td>
                      <td>이번주 초과</td>
                      <td>이번주 잔여</td>
                      <td>이번달 누적</td>
                    </tr>
                    <tr>
                      <td>{totalWorkedWeek}</td>
                      <td>{extraWorkedWeek}</td>
                      <td>{remainWorkedWeek}</td>
                      <td>{totalWorkedMonth}</td>
                    </tr>
                  </tbody>
                </table>

                </div>
              </div>
            </div> 
                
            <div className={AttendanceDetailCSS.topContent2}>
              <div className={AttendanceDetailCSS.topBoxWrap2}>
               <div className={AttendanceDetailCSS.topBox2}>
               <table className={AttendanceDetailCSS.table2}>
                  <tbody>
                    <tr>
                      <td>지각</td>
                      <td>결근</td>
                      <td>조퇴</td>
                      <td>무단결근</td>
                    </tr>
                    <tr>
                      <td>{attendanceStatus?.TARDY}회</td>
                      <td>{attendanceStatus?.ABSENCE}회</td>
                      <td>{attendanceStatus?.EARLY_OFF}회</td>
                      <td>{attendanceStatus?.TRUANCY}회</td>
                    </tr>
                  </tbody>
                </table>
              
               </div>                 
              </div> 
            </div>
            <div className={AttendanceDetailCSS.topContent3}>
            <table className={AttendanceDetailCSS.table3}>
                  <tbody>
                    <tr className={AttendanceDetailCSS.tr1}>
                      <td>일자</td>
                      <td>업무시작</td>
                      <td>업무종료</td>
                      <td>총근무시간</td>
                    </tr>
                    <tr>
                      <td>{selectedDate}</td>
                      <td>{timeOnly}</td>
                      <td>{timeOnly2}</td>
                      <td>{totalWorkTimeString}</td>
                    </tr>
                  </tbody>
                </table>
              
            </div>
            <div className={AttendanceDetailCSS.topContent4}>
              <div className={AttendanceDetailCSS.chart}>
                <TimeChart hours={parseInt(hours)} hours2={hours2 ? parseInt(hours2) : null} />
              </div> 
              <div className={AttendanceDetailCSS.chart}>
                <AttendanceDoughnut attendanceStatus={attendanceStatus} />
              </div> 

            
            </div>
        </div>
       </> 
    );
}

