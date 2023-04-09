import ScheduleCalendarCSS from "./ScheduleCalendar.module.css";
import { useSelector } from "react-redux";

function ScheduleCalendar({ day, setSelectedDate }) {

    const TIME_ZONE = 9 * 60 * 60 * 1000; 
    const startDateTime = new Date(day.year, day.month - 1, day.date);
    const endDateTime = new Date(day.year, day.month - 1, day.date + 1);
    const formattedDate = `${day.year}-${`${day.month}`.length === 2? day.month:`0${day.month}`}-${`${day.date}`.length  === 2? day.date:`0${day.date}`}`;

    const scheduleList = useSelector(state => state.scheduleReducer.schedules);
    const scheduleBar = Array.isArray(scheduleList) && scheduleList.filter(schedule =>
           (new Date(schedule?.scheduleStartTime.slice(0, -6)) >= new Date(formattedDate)
        && new Date(schedule?.scheduleStartTime.slice(0, -6)) <= new Date(formattedDate))
        || (new Date(schedule?.scheduleEndTime.slice(0, -6)) >= new Date(formattedDate) 
        && new Date(schedule?.scheduleEndTime.slice(0, -6)) <= new Date(formattedDate))
        || (new Date(schedule?.scheduleStartTime.slice(0, -6)) < new Date(formattedDate)
        && new Date(schedule?.scheduleEndTime.slice(0, -6)) > new Date(formattedDate))
        );

        const setDate =() => {

            setSelectedDate({
                ...setSelectedDate,
                startDateTime : new Date(startDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                endDateTime : new Date(endDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5),
                day : day.day
            });
        }
    
        function seededRandomColor(seed) {
    
            const rand = function() {
              seed = (seed * 9301 + 49297) % 233280;
              return seed / 233280;
            };
            const r = Math.floor(rand() * 256); // Generate a random value for red component
            const g = Math.floor(rand() * 256); // Generate a random value for green component
            const b = Math.floor(rand() * 256); // Generate a random value for blue component
            
            const color = `rgb(${r}, ${g}, ${b})`;
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const fontColor = luminance > 0.5 ? '#000000' : '#FFFFFF';
    
            return { backgroundColor: color, color: fontColor };
          }

          return (
            <div 
                className={ScheduleCalendarCSS.dayDiv} 
                style={day.day === '일요일'? {color : 'red', backgroundColor : '#e9e9e9'}:day.day === '토요일'? {color : 'blue', backgroundColor : '#e9e9e9'}:{color : 'black'}}
                onClick={() => setDate()}>
                <span>{day.date}</span>
                {day.day !== '일요일' && day.day !== '토요일' && Array.isArray(scheduleBar) && scheduleBar.map(item => (
                    <div 
                        key={item.scheduleCode}
                        style={seededRandomColor(item.scheduleCode)}>
                        <span>{Array.isArray(scheduleList) && `${item?.startTime.slice(0, -6)}` === `${day.year}-${`${day.month}`.length === 2? day.month:`0${day.month}`}-${`${day.date}`.length  === 2? day.date:`0${day.date}`}`? `${item.scheduleName}`:'\u00A0'}</span>
                    </div>
                ))}
            </div>
        );
}

export default ScheduleCalendar;