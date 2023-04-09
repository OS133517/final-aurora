import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { callScheduleDetailAPI } from '../../apis/ScheduleAPICall';
import { callScheduleUpdateAPI } from '../../apis/ScheduleAPICall';
import { callScheduleDeleteAPI } from '../../apis/ScheduleAPICall';

function ScheduleDetailModal() {

    const dispatch = useDispatch();

    // const navigate = useNavigate();

    // const { scheduleCode } = useParams();

    const scheduleList = useSelector(state => state.scheduleReducer.schedule);
    
    const [ScheduleInsertModal, setScheduleInsertModal] = useState(false);

    const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    useEffect (() => {
        dispatch(callScheduleDetailAPI({
            scheduleCode :scheduleCode
        }));
    },[]
    )

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickScheduleUpdateHandler = () => {

        const formData = new FormData();

        formData.append("scheduleCode", scheduleCode);
        formData.append("scheduleCategoryCode", form.scheduleCategoryCode);
        formData.append("scheduleName", form.scheduleName);
        formData.append("scheduleStartDay", form.scheduleStartDay);
        formData.append("scheduleEndDay", form.scheduleEndDay);
        formData.append("scheduleStartTime", form.scheduleStartTime);
        formData.append("scheduleEndTime", form.scheduleEndTime);
        formData.append("schedulePlace", form.schedulePlace);
        formData.append("scheduleContent", form.scheduleContent);
    }

    dispatch(callScheduleUpdateAPI({
        form : formData
    }));

    // navigate("/aurora/schedule", { replace : true });
    // window.location.reload();

    const onClickScheduleDeleteHandler = () => {

        dispatch(callScheduleDeleteAPI({
            scheduleCode : scheduleCode
        }));

        // navigate("/aurora/schedule", { replace : true });
        // window.location.reload();
    }

    const onClickModifyModeHandler = () => {

        setModifyMode(true);
        setForm({
            scheduleCategoryCode : schedule.scheduleCategoryCode,
            scheduleName : schedule.scheduleName,
            scheduleStartDay : schedule.scheduleStartDay,
            scheduleEndDay : schedule.scheduleEndDay,
            scheduleStartTime : schedule.scheduleStartTime,
            scheduleEndTime : schedule.scheduleEndTime,
            schedulePlace : schedule.schedulePlace,
            scheduleContent : schedule.scheduleContent,
        });
    }

    return (
        <div className={ScheduleInsertModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={ScheduleInsertModalCSS.modalContainer}>
                <div className={ScheduleInsertModalCSS.header}>
                    일정
                    <button onClick={() => setScheduleInsertModal(false)}>X</button>
                </div>
                <div className={ScheduleInsertModalCSS.modalDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="scheduleName">일정명</label></td>
                                <td>
                                <input
                                    name='scheduleName'
                                    className={ ScheduleInsertModalCSS.scheduleDetailInfoInput }
                                    value={ (!modifyMode ? schedule.scheduleName : form.scheduleName) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleStartDay">일시</label></td>
                                <td><input 
                                        type="text" 
                                        name="scheduleStartDay" 
                                        id="scheduleStartDay" 
                                        value={form.scheduleStartDay}
                                        onChange={onChangeHandler}/>
                                        ~
                                        <input 
                                        type="text" 
                                        name="scheduleEndDay" 
                                        id="scheduleEndDay" 
                                        value={form.scheduleEndDay}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleStartDay">시간</label></td>
                                <td><input 
                                        type="text" 
                                        name="schduleStartTime" 
                                        id="schduleStartTime" 
                                        value={form.scheduleStartDay}
                                        onChange={onChangeHandler}/>
                                        ~
                                        <input 
                                        type="text" 
                                        name="schduleEndTime" 
                                        id="schduleEndTime" 
                                        value={form.schduleEndTime}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="schdulePlace">일정명</label></td>
                                <td>
                                <input
                                    name='schdulePlace'
                                    className={ ScheduleInsertModalCSS.scheduleDetailInfoInput }
                                    value={ (!modifyMode ? schedule.schdulePlace : form.schdulePlace) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="schduleContent">내용</label></td>
                                <td>
                                <input
                                    name='schduleContent'
                                    className={ ScheduleInsertModalCSS.scheduleDetailInfoInput }
                                    value={ (!modifyMode ? schedule.schduleContent : form.schduleContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                                </td>
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
                <div className={ WeekWorklogDetailCSS.weekWorklogButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                {!modifyMode &&
                    <button       
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정하기
                    </button>
                }
                {modifyMode &&
                    <button       
                        onClick={ onClickWeekWorklogUpdateHandler }             
                    >
                        저장하기
                    </button>
                }
                {!modifyMode &&
                    <button       
                        onClick={ onClickWeekWorklogDeleteHandler }             
                    >
                        삭제하기
                    </button>
                }
                </div>     
            </div>
        </div>
    );
}

export default ScheduleDetailModal;