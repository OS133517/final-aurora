import { useEffect } from "react";
import ReservationCalendarDayCSS from "./ReservationCalendarDay.module.css";

function ReservationCalendarDay({day, setSelectedDate}) {

    const setDate =() => {

        const TIME_ZONE = 9 * 60 * 60 * 1000; 
        const startDateTime = new Date(day.year, day.month - 1, day.date);
        const endDateTime = new Date(day.year, day.month - 1, day.date + 1);

        setSelectedDate({
            ...setSelectedDate,
            startDateTime : new Date(startDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
            endDateTime : new Date(endDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
            day : day.day
        });
    }

    return (
        <div 
            className={ReservationCalendarDayCSS.dayDiv} 
            style={day.day === '일요일'? {color : 'red', backgroundColor : '#e9e9e9'}:day.day === '토요일'? {color : 'blue', backgroundColor : '#e9e9e9'}:{color : 'black'}}
            onClick={() => setDate()}>
            <span>{day.date}</span>
        </div>
    );
}

export default ReservationCalendarDay;