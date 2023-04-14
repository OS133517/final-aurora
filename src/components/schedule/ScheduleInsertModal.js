import { useDispatch, useSelector } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { callMyScheduleAPI, callScheduleInsertAPI } from "../../apis/ScheduleAPICall"
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

function ScheduleInsertModal({ setScheduleInsertModal }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const myScheduleList = useSelector(state => state.scheduleReducer.calendar)
    console.log(JSON.stringify(myScheduleList))

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(loginMember);

    const [form, setForm] = useState({

        memberCode : loginMember.memberCode,
        scheduleName : '',
        scheduleStartDay : '',
        scheduleEndDay : '',
        schedulePlace : '',
        scheduleContent : ''
    });

    useEffect(() => {

        dispatch(callMyScheduleAPI({
            memberCode : loginMember.memberCode
        }))
    },[]
    );

    const  onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    };

    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setScheduleInsertModal(false);
        }
    };

    const onClickScheduleInsert = () => {
        
        // const formData = new FormData();
        
        // formData.append("scheduleCategoryCode", form.scheduleCategoryCode);
        // formData.append("scheduleName", form.scheduleName);
        // formData.append("scheduleStartDay", form.scheduleStartDay);
        // formData.append("scheduleEndDay", form.scheduleEndDay);
        // formData.append("scheduleStartTime", form.schduleStartTime);
        // formData.append("scheduleEndTime", form.scheduleEndTime);
        // formData.append("schedulePlace", form.schedulePlace);
        // formData.append("scheduleContent", form.scheduleContent);
     
        dispatch(callScheduleInsertAPI({
            form : form,
            memberCode : loginMember.memberCode
        }));

        navigate("/aurora/calendar/month", { replace : true });
        window.location.reload();
    }

    return (
        <div className={ScheduleInsertModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.header}>
                    일정 등록
                    <button className={ScheduleInsertModalCSS.xbutton} onClick={() => setScheduleInsertModal(false)}>X</button>
                </div>
                <div className={ScheduleInsertModalCSS.modalDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="scheduleName">일정명</label></td>
                                <td><input 
                                        type="text" 
                                        name="scheduleName" 
                                        id="scheduleName" 
                                        value={form.scheduleName}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleDay">일시</label></td>
                                <td className={ScheduleInsertModalCSS.scheduleDay}>
                                    <input
                                        type="date" 
                                        name="scheduleStartDay" 
                                        id="scheduleStartDay" 
                                        value={form.scheduleStartDay}
                                        onChange={onChangeHandler}
                                    />
                                &nbsp;~&nbsp;
                                    <input
                                        type="date" 
                                        name="scheduleEndDay" 
                                        id="scheduleEndDay" 
                                        value={form.scheduleEndDay}
                                        onChange={onChangeHandler}
                                    /> 
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label htmlFor="schdulePlace">장소</label></td>
                                <td><input 
                                        type="text" 
                                        name="schedulePlace" 
                                        id="schedulePlace" 
                                        value={form.schedulePlace}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleContent">내용</label></td>
                                <td><textarea 
                                        type="text" 
                                        name="scheduleContent" 
                                        className={ ScheduleInsertModalCSS.scheduleContentInfoInput }
                                        id="scheduleContent" 
                                        value={form.scheduleContent}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
                <div className={ScheduleInsertModalCSS.buttonDiv}>
                    <button onClick={onClickScheduleInsert}>저장</button>
                </div>
            </div>

        </div>
    )
}

export default ScheduleInsertModal;