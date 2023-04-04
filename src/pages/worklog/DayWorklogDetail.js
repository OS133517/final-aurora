import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import DayWorklogDetailCSS from './DayWorklogDetail.module.css';
import DayWorklogInsertCSS from './DayWorklogInsert.module.css'
import { callDayWorklogDetailAPI } from '../../apis/DayWorklogAPICall';
import { callDayWorklogUpdateAPI } from '../../apis/DayWorklogAPICall';
import { callDayWorklogDeleteAPI } from '../../apis/DayWorklogAPICall';
import { callMemberInfoAPI } from '../../apis/MemberAPICall';

function DayWorklogDetail() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const {dayWorklogCode} = useParams(); // 패스배리어블을 쓰면 유즈파람을 쓴다??

    const dayWorklog = useSelector(state => state.dayWorklogReducer.dayWorklog);

    const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    //DB에 없는 내용은 멤버코드에 담겨있다.
    //그거는 토큰에 멤버코드를 담아놔서 꺼내쓸수 있따. token.memberCode 를 이용해서 사용할 수 있음??
    
    const memberInfo = useSelector(state => state.memberReducer);
    
    useEffect (() => {
        console.log("dayWorklog.memberCode" + dayWorklog.memberCode);
        dispatch(callMemberInfoAPI({
            memberCode : dayWorklog.memberCode
        }));
    },[dayWorklog]
    );

    useEffect (() => { // 백에서 패스발리어블?로 넘겨서 이렇게 씀? 패스배리어블을 쓰면 유즈파람을 쓴다??
        dispatch(callDayWorklogDetailAPI({
            dayWorklogCode : dayWorklogCode
        })
        );
    },[]
    );
    console.log("dayWorklogCode : " + dayWorklogCode)

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickDayWorklogUpdateHandler = () => {

        const formData = new FormData();

        formData.append("dayWorklogCode", dayWorklogCode);
        formData.append("morningDayContent", form.morningDayContent);
        formData.append("morningDayNote", form.morningDayNote);
        formData.append("afternoonDayContent", form.afternoonDayContent);
        formData.append("afternoonDayNote", form.afternoonDayNote);
        formData.append("daySpecialNote", form.daySpecialNote);

        dispatch(callDayWorklogUpdateAPI({
            form: formData
        }));

        navigate("/aurora/worklog/day", { replace : true });
        window.location.reload();
    }

    const onClickDayWorklogDeleteHandler = () => {

        dispatch(callDayWorklogDeleteAPI({
            dayWorklogCode : dayWorklogCode
        }));
        console.log("delete" + dayWorklogCode)
        navigate("/aurora/worklog/day", { replace : true });
        window.location.reload();
    }

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        // 수정하기 가면 그 전에 쓴 내용이 나온다
        setForm({
            morningDayContent : dayWorklog.morningDayContent,
            morningDayNote : dayWorklog.morningDayNote,
            afternoonDayContent : dayWorklog.afternoonDayContent,
            afternoonDayNote : dayWorklog.afternoonDayNote,
            daySpecialNote : dayWorklog.daySpecialNote
        });
    }

    
    return (
        <div>
            <div className={ DayWorklogDetailCSS.DetailDiv }>
                <div className={ DayWorklogDetailCSS.dayWorklogsHeader }>일일 업무일지</div>
                <div className={ DayWorklogDetailCSS.descriptionDiv }>일일 업무일지</div>    
                <table className={ DayWorklogDetailCSS.descriptionTable }>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>{ dayWorklog.dayReportingDate || '' }</td>
                            <td>작성자</td>
                            <td>{ memberInfo.memberName || '' }</td>
                        </tr>
                        <tr>
                            <td>부서</td>
                            <td>{ memberInfo.deptName || '' }</td>
                            <td>직급</td>
                            <td>{ memberInfo.jobName || '' }</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>금일 사항</td></tr>
                        <tr>
                            <td></td>
                            <td>업무내용</td>
                            <td>비고</td>
                        </tr>
                        <tr>
                            <td>오전</td>
                            <td>
                                {/* { dayWorklog.morningDayContent || ''} */}
                                <input
                                    name='morningDayContent'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    value={ (!modifyMode ? dayWorklog.morningDayContent : form.morningDayContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                            <td>
                                {/* { dayWorklog.morningDayNote || ''} */}
                                <input
                                    name='morningDayNote'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    value={ (!modifyMode ? dayWorklog.morningDayNote : form.morningDayNote) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: '#c9c9c9'} : null}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>오후</td>
                            <td>
                                {/* { dayWorklog.afternoonDayContent || ''} */}
                                <input
                                    name='afternoonDayContent'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    value={ (!modifyMode ? dayWorklog.afternoonDayContent : form.afternoonDayContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                            <td>
                                {/* { dayWorklog.afternoonDayNote || ''} */}
                                <input
                                    name='afternoonDayNote'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    value={ (!modifyMode ? dayWorklog.afternoonDayNote : form.afternoonDayNote) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>
                    <tr><td>특이 사항</td></tr>
                        <tr>
                            <td>
                        {/* { dayWorklog.daySpecialNote || ''} */}
                                <input
                                    name='daySpecialNote'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    value={ (!modifyMode ? dayWorklog.daySpecialNote : form.daySpecialNote) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>   
            <div className={ DayWorklogDetailCSS.dayWorklogButtonDiv }>
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
                        onClick={ onClickDayWorklogUpdateHandler }             
                    >
                        저장하기
                    </button>
                }
                {!modifyMode &&
                    <button       
                        onClick={ onClickDayWorklogDeleteHandler }             
                    >
                        삭제하기
                    </button>
                }
            </div>                 
        </div>
    )
}

export default DayWorklogDetail;