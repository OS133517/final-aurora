import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { callScheduleDetailAPI } from '../../apis/ScheduleAPICall';
import { callScheduleUpdateAPI } from '../../apis/ScheduleAPICall';
import { callScheduleDeleteAPI } from '../../apis/ScheduleAPICall';
import ScheduleDetailModalCSS from "./ScheduleDetailModal.module.css";

function ScheduleDetailModal({ scheduleCode, setScheduleDetailModal }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const schedule = useSelector(state => state.scheduleReducer.scheduleDetail);
    
    // const [ScheduleDetailModal, setScheduleDetailModal] = useState(false);
    // const scheduleCode = useSelector(state => state.scheduleReducer.mySchedule);
    console.log("schedule : " + schedule);

    const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    useEffect (() => {
        dispatch(callScheduleDetailAPI({
            scheduleCode : scheduleCode
        }));
    },[] )

    useEffect(() => {
        setForm({
            scheduleCode : schedule.scheduleCode,
            scheduleName : schedule.scheduleName,
            scheduleStartDay : schedule.scheduleStartDay,
            scheduleEndDay : schedule.scheduleEndDay,
            schedulePlace : schedule.schedulePlace,
            scheduleContent : schedule.scheduleContent,
        });
    }, [schedule])
   
    console.log("scheduleCode : " + scheduleCode);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setScheduleDetailModal(false);
        }
    };

    const onClickScheduleUpdateHandler = () => {

        const formData = new FormData();

        formData.append("scheduleCode", scheduleCode);
        formData.append("scheduleName", form.scheduleName);
        formData.append("scheduleStartDay", form.scheduleStartDay);
        formData.append("scheduleEndDay", form.scheduleEndDay);
        formData.append("schedulePlace", form.schedulePlace);
        formData.append("scheduleContent", form.scheduleContent);
    
        dispatch(callScheduleUpdateAPI({
            form : formData
        }));

        navigate("/aurora/calendar/month", { replace : true });
        window.location.reload();
    }

    const onClickScheduleDeleteHandler = () => {

        console.log("deletescheduleCode : " + scheduleCode)
        dispatch(callScheduleDeleteAPI({
            scheduleCode : scheduleCode
        }));

        console.log("delete" + scheduleCode)
        navigate("/aurora/calendar/month", { replace : true });
        window.location.reload();
    }
    
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        
    }

    return (
        <div className={ScheduleDetailModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={ScheduleDetailModalCSS.modalContainer}>
                <div className={ScheduleDetailModalCSS.header}>
                    일정
                    <button className={ScheduleDetailModalCSS.xbutton} onClick={() => setScheduleDetailModal(false)}>X</button>
                </div>
                <div className={ScheduleDetailModalCSS.modalDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="scheduleName">일정명</label></td>
                                <td>
                                <input
                                    name='scheduleName'
                                    className={ ScheduleDetailModalCSS.scheduleDetailInfoInput }
                                    value={form.scheduleName || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="scheduleDay">일시</label></td>
                                <td className={ScheduleDetailModalCSS.scheduleDay}>
                                    <input
                                        type="date" 
                                        name="scheduleStartDay" 
                                        className={ ScheduleDetailModalCSS.scheduleDetailInfoInput}
                                        value={form.scheduleStartDay || ''}
                                        onChange={onChangeHandler}
                                        readOnly={ modifyMode ? false : true }
                                    />
                                &nbsp;~&nbsp;
                                    <input
                                        type="date" 
                                        name="scheduleEndDay"
                                        className={ ScheduleDetailModalCSS.scheduleDetailInfoInput}
                                        value={form.scheduleEndDay || ''}
                                        onChange={onChangeHandler}
                                        readOnly={ modifyMode ? false : true }
                                    /> 
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label htmlFor="schdulePlace">장소</label></td>
                                <td>
                                <input
                                    name='schedulePlace'
                                    className={ ScheduleDetailModalCSS.scheduleDetailInfoInput }
                                    value={ form.schedulePlace || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="schduleContent">내용</label></td>
                                <td>
                                <textarea 
                                    name='scheduleContent'
                                    className={ ScheduleDetailModalCSS.scheduleContentInfoInput }
                                    value={form.scheduleContent || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                <div className={ ScheduleDetailModalCSS.buttonDiv }>
                    <button        
                        onClick={ () => setScheduleDetailModal(false) }            
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
                            onClick={ onClickScheduleUpdateHandler }             
                        >
                            저장하기
                        </button>
                    }
                    {!modifyMode &&
                        <button       
                            onClick={ onClickScheduleDeleteHandler }             
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