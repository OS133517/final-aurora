import ReservationCalendarDayCSS from "./ReservationCalendarDay.module.css";
import { useSelector } from "react-redux";

function ReservationCalendarDay({day, setSelectedDate}) {

    const TIME_ZONE = 9 * 60 * 60 * 1000; 
    const startDateTime = new Date(day.year, day.month - 1, day.date);
    const endDateTime = new Date(day.year, day.month - 1, day.date + 1);

    const reservationList = useSelector(state => state.reservationReducer.reservations);
    const reservationBar = reservationList && reservationList.filter(reservation => (
        new Date(reservation.startTime).getDate() >= startDateTime.getDate() 
        && new Date(reservation.startTime).getDate() <= endDateTime.getDate())
        ||new Date(reservation.endTime).getDate() >= startDateTime.getDate() 
        && new Date(reservation.endTime).getDate() <= endDateTime.getDate());
    reservationBar.length > 0 && console.log(`날짜`, startDateTime.getDate(), reservationBar.length);
    reservationBar.length > 0 && console.log(`날짜`, startDateTime.getDate(), reservationBar);

    const setDate =() => {

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
            {Array.isArray(reservationBar) && reservationBar.length > 0 && reservationBar.map(item => (
                <div key={item.reservationNo}>
                    {item.team}
                </div>
            ))}
        </div>
    );
}

export default ReservationCalendarDay;