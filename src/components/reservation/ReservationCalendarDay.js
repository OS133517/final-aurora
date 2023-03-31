import { useEffect } from "react";
import ReservationCalendarDayCSS from "./ReservationCalendarDay.module.css";

function ReservationCalendarDay({day}) {


    useEffect(() => {


    }, [])

    return (
        <div className={ReservationCalendarDayCSS.dayDiv} style={day.day === 0? {color : 'red'}:day.day === 6? {color : 'blue'}:{color : 'black'}}>
            <span>{day.date}</span>
        </div>
    );
}

export default ReservationCalendarDay;