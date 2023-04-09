import { useDispatch } from "react-redux";
import ScheduleInsertModalCSS from "./ScheduleInsertModal.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { callMyScheduleAPI, callScheduleInsertAPI } from "../../apis/ScheduleAPICall"
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

function ScheduleInsertModal({ scheduleStartDay, sechduleName, scheduleCode, setScheduleInsertModal }) {

    const dispatch = useDispatch();

    // const { memberCode } = jwtDecode(window.localStorage.getItem("accessToken"));
    // const thisMember = useSelector(state => state.scheduleReducer.memberInfo);
    // const scheduleList = useSelector(state => state.scheduleReducer.schedule)

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(loginMember);
   
    const [form, setForm] = useState({
        scheduleName : '',
        scheduleStartDay : '',
        scheduleEndDay : '',
        schduleStartTime : '',
        schduleEndTime : '',
        schdulePlace : '',
        schduleContent : '',
    });

    useEffect(() => {

        // dispatch(callMyScheduleAPI({
        //     memberCode : memberCode
        // }))
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
        
        const formData = new FormData();

        formData.append("scheduleName", form.scheduleName);
        formData.append("scheduleStartDay", form.scheduleStartDay);
        formData.append("scheduleEndDay", form.scheduleEndDay);
        formData.append("schduleStartTime", form.schduleStartTime);
        formData.append("schduleEndTime", form.schduleEndTime);
        formData.append("schdulePlace", form.schdulePlace);
        formData.append("schduleContent", form.schduleContent);
     
        dispatch(callScheduleInsertAPI({
            form : FormData,
            memberCode : loginMember.memberCode
        }));

        // navigate("aurora/calendar/month", { replace : true });
        // window.location.reload();
    }


    return (
        <div className={ScheduleInsertModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.header}>
                    일정 등록
                    <button onClick={() => setScheduleInsertModal(false)}>X</button>
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
                                <td><input 
                                        type="date" 
                                        name="scheduleStartDay" 
                                        id="scheduleStartDay" 
                                        value={form.scheduleStartDay}
                                        onChange={onChangeHandler}/>
                                        ~
                                        <input 
                                        type="date" 
                                        name="scheduleEndDay" 
                                        id="scheduleEndDay" 
                                        value={form.scheduleEndDay}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleTime">시간</label></td>
                                <td><input 
                                        type="time" 
                                        name="schduleStartTime" 
                                        id="schduleStartTime" 
                                        value={form.scheduleStartDay}
                                        onChange={onChangeHandler}/>
                                        ~
                                        <input 
                                        type="time" 
                                        name="schduleEndTime" 
                                        id="schduleEndTime" 
                                        value={form.schduleEndTime}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td>카테고리</td>
                                <td>
                                    <select name="scheduleCategoryCode" onChange={onChangeHandler} value={form.scheduleCategoryCode}>
                                        <option value="requireSelect">카테고리 선택</option>
                                        {/* {
                                            Array.isArray()
                                        } */}
                                    </select>
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label htmlFor="schdulePlace">장소</label></td>
                                <td><input 
                                        type="text" 
                                        name="schdulePlace" 
                                        id="schdulePlace" 
                                        value={form.email}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="schduleContent">내용</label></td>
                                <td><input 
                                        type="text" 
                                        name="schduleContent" 
                                        id="schduleContent" 
                                        value={form.company}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            
                            {/* <tr>
                                <td>그룹</td>
                                <td>
                                    <select name="groupCode" onChange={onChangeHandler} value={form.groupCode}>
                                        <option value="requireSelect">그룹 선택</option>
                                    {
                                        Array.isArray(teamGroupList) && teamGroupList.map(group => (
                                        <option key={group.groupCode} value={group.groupCode}>팀 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    {
                                        Array.isArray(personalGroupList) && personalGroupList.map(group => (
                                        <option key={group.groupCode} value={group.groupCode}>개인 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                            </tr> */}
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