import { useEffect } from "react";
import ReservationCalendarDayCSS from "./ReservationCalendarDay.module.css";

function ReservationCalendarDay({day, setSelectedDate}) {


    useEffect(() => {

    }, [])

    const setDate =() => {

        const thisDay = new Date(day.year, day.month - 1, day.date).toLocaleDateString();
        setSelectedDate({
            date : thisDay,
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