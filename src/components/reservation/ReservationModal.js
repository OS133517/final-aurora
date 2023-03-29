import { useEffect, useState } from "react";
import ReservationModalCSS from "./ReservationModal.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { callReservationAPI, callReservationUpdateAPI } from "../../apis/ReservationAPICall";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Swal from "sweetalert2";

function ReservationModal({reservationNo, setReservationModal}) {

    const dispatch = useDispatch();
    const reservationDetail = useSelector(state => state.reservationReducer?.reservation);
   
    const [form, setForm] = useState({
        name : "",
        reservationDate : new Date(),
        startTime : new Date(),
        endTime : new Date(),
        team : "",
        description : "",
        assetName : ""
    });
    const [isSelect, setIsSelect] = useState(false);

    useEffect(() => {

        dispatch(callReservationAPI({
            reservationNo : reservationNo
        }));
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        setForm({
            ...form,
            aasetCode : reservationDetail?.assetCode,
            name : reservationDetail?.memberName,
            reservationDate : reservationDetail?.reservationDate,
            team : reservationDetail?.team,
            description : reservationDetail?.description,
            assetName : reservationDetail?.assetName
        });
    // eslint-disable-next-line
    }, [reservationDetail]);

  

    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setReservationModal(false);
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

    const onClickUpdate = () => {

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
        } else {

            dispatch(callReservationUpdateAPI({
                form : form,
                reservationNo : reservationNo
            }));

            setIsSelect(false);
            setReservationModal(!ReservationModal);
        }
    }

    return (
        <div className={ReservationModalCSS.modalBackground} onClick={onClickModalOff}>
        <div className={ReservationModalCSS.modalContainer}>
            <div className={ReservationModalCSS.header}>
                예약 수정
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
                                    value={form.assetName||''}
                                    readOnly
                                    disabled={true}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">이름</label></td>
                            <td><input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={form.name||''}
                                    readOnly
                                    disabled={true}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="reservationDate">예약일</label></td>
                            <td><input 
                                    type="text" 
                                    name="reservationDate" 
                                    id="reservationDate" 
                                    value={form.reservationDate||''}
                                    readOnly
                                    disabled={true}/></td>
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
                                    minDate={new Date()}
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
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
                                    minTime={setHours(setMinutes(form.startTime, 0), form.startTime.getHours())}
                                    maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                />}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="team">소속팀</label></td>
                            <td><input 
                                    type="text" 
                                    name="team" 
                                    id="team"
                                    value={form.team||''}
                                    readOnly
                                    disabled={true}/></td>
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
                <button onClick={() => setReservationModal(false)}>나가기</button>
                <button onClick={onClickUpdate}>수정하기</button>
            </div>
        </div>
    </div>
    );
}

export default ReservationModal;