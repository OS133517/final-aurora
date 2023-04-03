import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { callReservationsAPI } from "../../apis/ReservationAPICall";
import ReservationCalendarDay from "../../components/reservation/ReservationCalendarDay";
import ReservationDayDetail from "../../components/reservation/ReservationDayDetail";
import ReservationCalendarCSS from "./ReservationCalendar.module.css";
import Swal from "sweetalert2";

function ReservationCalendar() {

    // TODO - 공휴일 체크
    const {assetCode} = useParams();
    const [searchParams] = useSearchParams();
    const assetName = searchParams.get("name");
    const [selectedMonth, setSelectedMonth] = useState([]);
    const [thisMonth, setThisMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({
        startDateTime : '',
        endDateTime : '',
        day : ''
    });
    const dispatch = useDispatch();
    const reservationResult = useSelector(state => state.reservationReducer.reservationMessage);

    useEffect(() => {

        if(reservationResult.status === 200) {
            Swal.fire({
                icon : 'success',
                text : reservationResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        } else if (reservationResult.status === 400) {
            Swal.fire({
                icon : 'error',
                text : reservationResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        }
    }, [reservationResult]);

    useEffect(() => {

        getCalendar(thisMonth);
    // eslint-disable-next-line
    }, [thisMonth, assetCode])

    useEffect(() => {

        selectedMonth.length > 0 && dispatch(callReservationsAPI({
            assetCode : assetCode,
            startTime : `${selectedMonth[0]?.year}-${selectedMonth[0]?.month}-${selectedMonth[0]?.date}`,
            endTime : `${selectedMonth[34]?.year}-${selectedMonth[34]?.month}-${selectedMonth[34]?.date}`
        }));
    // eslint-disable-next-line
    }, [selectedMonth, assetCode])

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
        for(let i = 0; i < 35; i++) {
            
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

        if(newDate.getMonth() - thisMonth.getMonth() === 2) {
            newDate.setMonth(newDate.getMonth() - 1);
        }

        setThisMonth(newDate);
    }

    return (
        <>
            <div className={ReservationCalendarCSS.calendarDiv}>
                <div className={ReservationCalendarCSS.calendarHeader}>
                    {assetName} 예약 현황
                </div>
                <div>   
                    <div className={ReservationCalendarCSS.monthDiv}>
                        <button onClick={() => onClickMonthChange('-')}>{'<'}</button>
                        {thisMonth.getMonth() + 1} 월
                        <button onClick={() => onClickMonthChange('+')}>{'>'}</button>
                    </div>
                    <div className={ReservationCalendarCSS.sunToSat}>
                        <span>일</span>
                        <span>월</span>
                        <span>화</span>
                        <span>수</span>
                        <span>목</span>
                        <span>금</span>
                        <span>토</span>
                    </div>
                    <div className={ReservationCalendarCSS.daysDiv}>
                        {selectedMonth.length !== 0 && selectedMonth.map((day, index) => <ReservationCalendarDay
                                                                                                            setSelectedDate={setSelectedDate}
                                                                                                            key={index} 
                                                                                                            day={day}/>)}
                    </div>
                </div>
                <div>
                    {selectedDate.date !== '' && <ReservationDayDetail assetCode={assetCode} assetName={assetName} selectedDate={selectedDate}/>}
                </div>
            </div>
        </>
    );
}

export default ReservationCalendar;