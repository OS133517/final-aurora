import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReservationCalendarCSS from "./ReservationCalendar.module.css";

function ReservationCalendar({assetCode}) {

    const [selectedMonth, setSelectedMonth] = useState([]);

    useEffect(() => {

        getMonth(new Date());
    }, [])

    const getMonth = (date) => {

        const month = date.getMonth() + 1;
        const firstDay = new Date(date.getFullYear(), month - 1, 1).getDay();
        const lastDay = new Date(date.getFullYear(), month - 1, 0).getDate();
        const daysOfMonth = [];

        // for(let i = 0; i <= 35; i++) {
            
        //     daysOfMonth.push(i);
        //     if(i >= firstDay) {
        //         daysOfMonth.push({
        //             date : firstDay,

        //         })
        //     }
        // }

        setSelectedMonth(daysOfMonth);
        console.log(`${month}월은`, daysOfMonth);
        console.log(`${month}월의 1번째 날의 요일은`, firstDay);
    }

    return (
        <>
            <div className={ReservationCalendarCSS.calendarDiv}>
                <div className={ReservationCalendarCSS.calendarHeader}>
                    {assetCode} 예약 현황
                </div>
                <div>
                    <table className={ReservationCalendarCSS.calendarTable} style={{borderCollapse : 'collapse', width: '1514px'}}>
                        <colgroup>
                            <col width='233px'/>
                            <col width='233px'/>
                            <col width='233px'/>
                            <col width='233px'/>
                            <col width='233px'/>
                            <col width='233px'/>
                            <col width='233px'/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>일</td>
                                <td>월</td>
                                <td>화</td>
                                <td>수</td>
                                <td>목</td>
                                <td>금</td>
                                <td>토</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ReservationCalendar;