import { useNavigate } from "react-router";
import CalendarCSS from "./CalendarInMain.module.css";
import { useEffect, useState } from "react";
import ScheduleCalendar from "../schedule/ScheduleCalendar";

function CalendarInMain() {

    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState([]);

    useEffect(() => {

        getCalendar(new Date());
    }, [])

    // 달력 구하기
    const getCalendar = (date) => {

        const month = date.getMonth();
        const firstDay = new Date(date.getFullYear(), month, 1).getDay();
        const lastDay = new Date(date.getFullYear(), month + 1, 0).getDate();
        const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
        const daysOfMonth = [];

        let j = 1;
        let k = 1;
        for (let i = 0; i < 35; i++) {

            if (i < firstDay) {

                daysOfMonth.push({
                    year: month > 1 ? date.getFullYear() : date.getFullYear() - 1,
                    month: month > 1 ? month : 12,
                    date: month > 1 ? new Date(date.getFullYear(), month, -(firstDay - i) + 1).getDate() : 31 - (firstDay - i) + 1,
                    day: weekDays[i % 7]
                });
            }

            if (i >= firstDay) {

                if (j <= lastDay) {

                    daysOfMonth.push({
                        year: date.getFullYear(),
                        month: month + 1,
                        date: new Date(date.getFullYear(), month, j++).getDate(),
                        day: weekDays[i % 7]
                    });
                } else {

                    daysOfMonth.push({
                        year: month === 12 ? date.getFullYear() + 1 : date.getFullYear(),
                        month: month === 12 ? 1 : month + 2,
                        date: new Date(date.getFullYear(), month, k++).getDate(),
                        day: weekDays[i % 7]
                    })
                }
            }
        }
        setSelectedMonth(daysOfMonth);
    }

    return (
        <div className={CalendarCSS.boxWrapper2}>
            <div className={CalendarCSS.Box2}>
                <div className={CalendarCSS.header}>
                    <div onClick={() => navigate("/aurora/calendar")} style={{ cursor: "pointer" }}>
                        일정
                    </div>
                </div>
                <div className={CalendarCSS.graphDiv}>
                    <div className={CalendarCSS.daysDiv}>
                        {selectedMonth.length !== 0 && selectedMonth.map((day, index) => <ScheduleCalendar
                            key={index}
                            day={day} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarInMain;