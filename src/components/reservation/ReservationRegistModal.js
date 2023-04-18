import { useEffect, useState } from "react";
import ReservationModalCSS from "./ReservationModal.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { callMemberInfoForRegist, callReservationRegistAPI } from "../../apis/ReservationAPICall";

function ReservationRegistModal({startDate, assetName, assetCode, setRegistModal}) {

    const dispatch = useDispatch();
    const { memberCode, team } = jwtDecode(window.localStorage.getItem("accessToken"));
    const thisMember = useSelector(state => state.reservationReducer.memberInfo);
    const reservationList = useSelector(state => state.reservationReducer.reservationsByDate);

    const [form, setForm] = useState({
        reservationDate : `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        startTime : new Date(startDate),
        endTime : new Date(),
        teamCode : "",
        description : "",
        assetCode : assetCode,
        memberCode : memberCode
    });
    const [isSelect, setIsSelect] = useState(false);

    useEffect(() => {

        dispatch(callMemberInfoForRegist({
            memberCode : memberCode
        }))
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        setForm({
            ...form,
            teamCode : team
        });
    // eslint-disable-next-line
    }, [thisMember]);

    // TODO - 이거 더 손대야됨...일단 화면에 막대기 출력부터하자
    // 예약된 시간 제거하기 위한 함수
    // function getExcludeTimes(check) {
    const getExcludeTimes = (check) => {

        let excludeTimes = [];
        if(check === 'start') {

            const sameDay = Array.isArray(reservationList) && reservationList.filter(day => day.startTime.slice(0, -8) === startDate.slice(0, -8));
            for(let i = 0; i < sameDay.length; i++) {
                for(let startHour = new Date(sameDay[i].startTime).getHours(); startHour < new Date(sameDay[i].endTime).getHours(); startHour++) {
                    excludeTimes.push(startHour);
                }    
            }
        } else if(check === 'end') {

            const sameDay = Array.isArray(reservationList) && reservationList.filter(day => day.startTime.slice(0, -8) === startDate.slice(0, -8));
            for(let i = 0; i < sameDay.length; i++) {
                for(let startHour = new Date(sameDay[i].startTime).getHours() + 1; startHour <= new Date(sameDay[i].endTime).getHours(); startHour++) {
                    excludeTimes.push(startHour);
                }    
            }
        } else if(check === 'maxTime') {

            const sameDay = Array.isArray(reservationList) && reservationList.filter(day => day.startTime.slice(0, -8) === startDate.slice(0, -8)).sort((a, b) => new Date(a.startTime).getHours() - new Date(b.startTime).getHours());
            console.log('sameDay1212', sameDay);
            return sameDay.length === 0? 18 : sameDay.filter(item => new Date(item.startTime).getHours() > new Date(form.startTime).getHours()).map(item => new Date(item.startTime).getHours())[0]||18;
        }
        
        return excludeTimes.map(time => setHours(setMinutes(new Date(), 0), time));
    }
   
    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setRegistModal(false);
        }
    }

    const onChangeHandler = (e) => {
        
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const setDate = (target, date) => {

        if(target === 'startTime') {
            setForm({
                ...form,
                startTime : date,
                endTime : date
            });

            setIsSelect(true);
        } else if (target === 'endTime') {
            setForm({
                ...form,
                endTime : date
            });
        }
    }

    const onClickRegist = () => {

        if(!isSelect) {
            Swal.fire({
                icon : 'warning',
                text : '예약 시간을 선택하세요.',
                confirmButtonText : '확인'
            }).then(() => {
                return;
            });
        } else if(form.startTime.getTime() === form.endTime.getTime()) {
            Swal.fire({
                icon : 'warning',
                text : '시작시간과 끝시간이 같습니다.',
                confirmButtonText : '확인'
            }).then(() => {
                return;
            }); 
        } else if(form.description.trim().length === 0) {
            Swal.fire({
                icon : 'warning',
                text : '내용을 입력하세요.',
                confirmButtonText : '확인'
            }).then(() => {
                return;
            });
        } else {

            dispatch(callReservationRegistAPI({
                form : form
            }));

            setIsSelect(false);
            setRegistModal(false);
        }
    }

    return (
        <div className={ReservationModalCSS.modalBackground} onClick={onClickModalOff}>
        <div className={ReservationModalCSS.modalContainer}>
            <div className={ReservationModalCSS.header}>
                예약 등록
            </div>
            <div className={ReservationModalCSS.modalDiv}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="assetName">자산</label></td>
                            <td><input 
                                    type="text" 
                                    name="assetName" 
                                    id="assetName" 
                                    value={assetName}
                                    disabled={true}
                                    /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">이름</label></td>
                            <td><input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={thisMember.memberName||''}
                                    disabled={true}
                                    /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reservationDate">예약일</label></td>
                            <td><input 
                                    type="text" 
                                    name="reservationDate" 
                                    id="reservationDate" 
                                    value={form.reservationDate}
                                    disabled={true}
                                    /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="startTime">시작 시간</label></td>
                            <td>
                                <DatePicker 
                                    className={ReservationModalCSS.datePicker}
                                    locale={ko}  
                                    selected={form.startTime||''}
                                    value={form.startTime||''}
                                    onChange={(date) => setDate("startTime", date)}
                                    showTimeSelect
                                    timeIntervals={60}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    minDate={new Date(startDate)}
                                    maxDate={new Date(startDate)}
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                    excludeTimes={getExcludeTimes('start')}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>종료 시간</label></td>
                            <td>
                               {isSelect && <DatePicker 
                                    className={ReservationModalCSS.datePicker}
                                    locale={ko}  
                                    selected={form.endTime||''}
                                    value={form.endTime||''}
                                    onChange={(date) => setDate("endTime", date)}
                                    showTimeSelect
                                    timeIntervals={60}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    minDate={form.startTime}
                                    maxDate={form.startTime}
                                    minTime={setHours(setMinutes(new Date(), 0), form.startTime.getHours())}
                                    maxTime={setHours(setMinutes(new Date(), 0), getExcludeTimes('maxTime'))}
                                    excludeTimes={getExcludeTimes('end')}
                                />}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="team">소속팀</label></td>
                            <td><input 
                                    type="text" 
                                    name="teamName" 
                                    id="teamName"
                                    value={thisMember?.teamName||''}
                                    disabled={true}
                                    /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description">내용</label></td>
                            <td><input 
                                    type="text" 
                                    name="description" 
                                    id="description" 
                                    value={form.description||''}
                                    onChange={onChangeHandler}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={ReservationModalCSS.buttonDiv}>
                <button onClick={() => setRegistModal(false)}>나가기</button>
                <button onClick={onClickRegist}>예약하기</button>
            </div>
        </div>
    </div>
    );
}

export default ReservationRegistModal;