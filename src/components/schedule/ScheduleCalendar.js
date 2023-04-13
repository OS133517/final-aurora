import ScheduleCalendarCSS from "./ScheduleCalendar.module.css";
import { useSelector, useDispatch } from "react-redux";
import ScheduleDetailModal from "./ScheduleDetailModal";
import ScheduleInsertModal from "./ScheduleInsertModal";
import { useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { useParams } from "react-router-dom";

function ScheduleCalendar({ setScheduleCode, setScheduleDetailModal, day, setSelectedDate }) {

    // const {scheduleCode} = useParams();


    // const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    // // console.log(loginMember);

    const [scheduleInsertModal, setScheduleInsertModal] = useState(false);
  
    const [form, setForm] = useState({});


    // const [form, setForm] = useState({

    //     memberCode : loginMember.memberCode,
    //     scheduleName : '',
    //     scheduleStartDay : '',
    //     scheduleEndDay : '',
    //     schedulePlace : '',
    //     scheduleContent : ''
    // });

    // console.log('day', day);
    const TIME_ZONE = 9 * 60 * 60 * 1000; 
    const startDateTime = new Date(day.year, day.month - 1, day.date);
    const endDateTime = new Date(day.year, day.month - 1, day.date + 1);
    const formattedDate =  `${day.year}-${`${day.month}`.length === 2? day.month:`0${day.month}`}-${`${day.date}`.length  === 2? day.date:`0${day.date}`}`;

    // const scheduleCode
    // console.log("scheduleCode : " + scheduleCode);

    const scheduleList = useSelector(state => state.scheduleReducer.calendar);

    // console.log('formattedDate', formattedDate);

    const scheduleBar = Array.isArray(scheduleList) && scheduleList.filter(schedule =>
           (new Date(schedule?.scheduleStartDay) >= new Date(formattedDate)
        && new Date(schedule?.scheduleStartDay) <= new Date(formattedDate))
        || (new Date(schedule?.scheduleEndDay) >= new Date(formattedDate) 
        && new Date(schedule?.scheduleEndDay) <= new Date(formattedDate))
        || (new Date(schedule?.scheduleStartDay) < new Date(formattedDate)
        && new Date(schedule?.scheduleEndDay) > new Date(formattedDate))
        );

    const setDate =() => {

        setSelectedDate({
            ...setSelectedDate,
            // startDateTime : new Date(startDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' '),
            // endDateTime : new Date(endDateTime.getTime() + TIME_ZONE).toISOString().replace('T', ' '),
            day : day.day
        });

        // const onClick={() => setScheduleInsertModal(false)}
        // dispatch(callScheduleInsertAPI({
        //     form : form,
        //     memberCode : loginMember.memberCode
        // }));
        
        // navigate("/aurora/calendar/month", { replace : true });
        // window.location.reload();
    }

    // const onClickScheduleDetailHandler = () => {
    //     setScheduleDetailModal(true)    
    // }
    
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

        return ({ backgroundColor: color, color: fontColor });
    }

    return (
        <>
            
            {/* {scheduleInsertModal? <ScheduleInsertModal setScheduleInsertModal={setScheduleInsertModal}/>:null} */}
            <div 
                className={ScheduleCalendarCSS.dayDiv} 
                style={day.day === '일요일'? {color : 'red', backgroundColor : '#e9e9e9'}:day.day === '토요일'? {color : 'blue', backgroundColor : '#e9e9e9'}:{color : 'black'}}
                // onClick={() => setScheduleInsertModal(true)}
            >
                <span>{day.date}</span>
                {
                // day.day !== '일요일' && day.day !== '토요일' && 
                Array.isArray(scheduleBar) && scheduleBar.map(item => (
                    <div
                        key={item.scheduleCode} onClick={() => {setScheduleCode(item.scheduleCode); setScheduleDetailModal(true);}}
                        style={seededRandomColor(item.scheduleCode)}>
                        <span>{Array.isArray(scheduleList) && `${item?.startTime}` !== `${day.year}-${`${day.month}`.length === 2? day.month:`0${day.month}`}-${`${day.date}`.length  === 2? day.date:`0${day.date}`}`? `${item?.scheduleName}`:'\u00A0'}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ScheduleCalendar;