import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SchedulesCSS from "./Schedules.module.css";
import { callMyScheduleAPI } from "../../apis/ScheduleAPICall";
import ScheduleCalendar from "../../components/schedule/ScheduleCalendar";
import { decodeJwt } from "../../utils/tokenUtils";
import { useParams } from "react-router-dom";
import ScheduleDetailModal from "../../components/schedule/ScheduleDetailModal";

function Schedules({memberCode}) {
    
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [thisMonth, setThisMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({
        startDateTime : '',
        endDateTime : '',
        day : ''
    });
    const [scheduleDetailModal, setScheduleDetailModal] = useState(false);
    const [scheduleCode, setScheduleCode] = useState('');

    
    const dispatch = useDispatch();

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("loginMember : " + loginMember.memberCode);

    useEffect(() => {

        console.log('달력 출력', thisMonth);
        getCalendar(thisMonth);

        dispatch(callMyScheduleAPI({
            memberCode : loginMember.memberCode,
            startTime : `${selectedMonth[0]?.year}-${selectedMonth[0]?.month}-${selectedMonth[0]?.date}`,
            endTime : `${selectedMonth[35]?.year}-${selectedMonth[35]?.month}-${selectedMonth[35]?.date}`
        }))
    }, [thisMonth])

    // 달력 구하기
    const getCalendar = (date) => {

        const month = date.getMonth();
        const firstDay = new Date(date.getFullYear(), month, 1).getDay();
        const lastDay = new Date(date.getFullYear(), month + 1, 0).getDate();
        const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] 
        const daysOfMonth = [];

        console.log(`${month + 1}월은`, daysOfMonth);
        console.log(`${month + 1}월의 1번째 날의 요일은`, firstDay);
        console.log(`${month + 1}월의 마지막 날은`, lastDay);
        
        let j = 1;
        let k = 1;
        for(let i = 0; i < 42; i++) {
            
            if(i < firstDay) {

                daysOfMonth.push({
                    year : month > 1? date.getFullYear():date.getFullYear() - 1,
                    month : month > 1? month : 12,
                    date : month > 1? new Date(date.getFullYear(), month, -(firstDay - i) + 1).getDate():31 - (firstDay - i) + 1,
                    day : weekDays[i % 7]
                });
            }

            if(i >= firstDay) {

                if(j <= lastDay) {

                    daysOfMonth.push({
                        year : date.getFullYear(),
                        month : month + 1,
                        date : new Date(date.getFullYear(), month, j++).getDate(),
                        day : weekDays[i % 7]
                    });
                } else {

                    daysOfMonth.push({
                        year : month === 12? date.getFullYear() + 1 : date.getFullYear(),
                        month : month === 12? 1 : month + 2,
                        date : new Date(date.getFullYear(), month, k++).getDate(),
                        day : weekDays[i % 7]
                    })
                }
            }
        }
        setSelectedMonth(daysOfMonth);
    }

    const onClickMonthChange = (plusMinus) => {
        
        const newDate = new Date(thisMonth);
        console.log(newDate.getMonth(), thisMonth.getMonth());

        switch(plusMinus) {
            case '+' :
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case '-' :
                newDate.setMonth(newDate.getMonth() - 1);
                break;
            default :
                break;
        }

        if(newDate.getMonth() === thisMonth.getMonth()) {
            newDate.setMonth(newDate.getMonth() - 1);
        }

        console.log(newDate.getMonth(), thisMonth.getMonth());
        setThisMonth(newDate);
    }

    return (
        <>
        {scheduleDetailModal? <ScheduleDetailModal scheduleCode={scheduleCode} setScheduleDetailModal={setScheduleDetailModal}/>:null}
            <div className={SchedulesCSS.calendarDiv}>
                <div className={SchedulesCSS.calendarHeader}>
                    나의 캘린더
                </div>
                <div>   
                    <div className={SchedulesCSS.monthDiv}>
                        <button onClick={() => onClickMonthChange('-')}>{'<'}</button>
                        {thisMonth.getMonth() + 1} 월
                        <button onClick={() => onClickMonthChange('+')}>{'>'}</button>
                    </div>
                    <div className={SchedulesCSS.sunToSat}>
                        <span>일</span>
                        <span>월</span>
                        <span>화</span>
                        <span>수</span>
                        <span>목</span>
                        <span>금</span>
                        <span>토</span>
                    </div>
                    <div className={SchedulesCSS.daysDiv}>
                        {selectedMonth.length !== 0 && selectedMonth.map((day, index) => <ScheduleCalendar
                        setScheduleCode={setScheduleCode}
                        setScheduleDetailModal={setScheduleDetailModal}
                        setSelectedDate={setSelectedDate}
                        key={index} 
                        day={day}/>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Schedules;