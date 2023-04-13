import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import WeekWorklogDetailCSS from './WeekWorklogDetail.module.css';
// import WeekWorklogInsertCSS from './WeekWorklogInsert.module.css'
import { callWeekWorklogDetailAPI } from '../../apis/WeekWorklogAPICall';
import { callWeekWorklogUpdateAPI } from '../../apis/WeekWorklogAPICall';
import { callWeekWorklogDeleteAPI } from '../../apis/WeekWorklogAPICall';
import { callMemberInfoAPI } from '../../apis/MemberAPICall';

function WeekWorklogDetail() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { weekWorklogCode } = useParams(); 

    const weekWorklog = useSelector(state => state.weekWorklogReducer.weekWorklog);
    console.log(weekWorklog);
    const [modifyMode, setModifyMode] = useState(false);

    const [form, setForm] = useState({});

    const memberInfo = useSelector(state => state.memberReducer.memberInfo);

    useEffect (() => {
        console.log("weekWorklog.memberCode" + weekWorklog.memberCode);
        dispatch(callMemberInfoAPI({
            memberCode : memberInfo.memberCode
        }));
    },[weekWorklog]
    );

    useEffect (() => { // 백에서 패스발리어블?로 넘겨서 이렇게 씀? 패스배리어블을 쓰면 유즈파람을 쓴다??
        dispatch(callWeekWorklogDetailAPI({
            weekWorklogCode : weekWorklogCode
        }));
    },[]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickWeekWorklogUpdateHandler = () => {

        const formData = new FormData();

        formData.append("weekWorklogCode", weekWorklogCode);
        formData.append("monContent", form.monContent);
        formData.append("tuesContent", form.tuesContent);
        formData.append("wedContent", form.wedContent);
        formData.append("thurContent", form.thurContent);
        formData.append("friContent", form.friContent);
        formData.append("weekNote", form.weekNote);
        formData.append("weekSpecialNote", form.weekSpecialNote);

        for(let key of formData.keys()){
        console.log(key, formData.get(key));
    }
        
        dispatch(callWeekWorklogUpdateAPI({
            form: formData
        }));

        navigate("/aurora/worklog/week", { replace : true });
        window.location.reload();
    }
    
    const onClickWeekWorklogDeleteHandler = () => {

        dispatch(callWeekWorklogDeleteAPI({
            weekWorklogCode : weekWorklogCode
        }));
        console.log("delete" + weekWorklogCode)
        navigate("/aurora/worklog/week", { replace : true });
        window.location.reload();
    }


    const onClickModifyModeHandler = () => {

        setModifyMode(true);
        // 수정하기 가면 그 전에 쓴 내용이 나온다
        setForm({
            monContent : weekWorklog.monContent,
            tuesContent : weekWorklog.tuesContent,
            wedContent : weekWorklog.wedContent,
            thurContent : weekWorklog.thurContent,
            friContent : weekWorklog.friContent,
            weekNote : weekWorklog.weekNote,
            weekSpecialNote : weekWorklog.weekSpecialNote
        });
    }

    return (
        <div className={ WeekWorklogDetailCSS.detailDiv }>
            <div className={ WeekWorklogDetailCSS.weekWorklogsHeader }>
                주간 업무일지
            </div>
            <div className={ WeekWorklogDetailCSS.descriptionDiv }>
                <div>
                    주간 업무일지
                </div>
                <table className={ WeekWorklogDetailCSS.descriptionTable }>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>{ weekWorklog.weekReportingDate || '' }</td>
                            <td>작성자</td>
                            <td>{ memberInfo.memberName }</td>
                        </tr>
                        <tr>
                            <td>부서</td>
                            <td>{ memberInfo.deptName || '' }</td>
                            <td>직급</td>
                            <td>{ memberInfo.jobName || '' }</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={WeekWorklogDetailCSS.titleTd} colSpan='4'>
                                <div className={WeekWorklogDetailCSS.squares}>
                                        {'\u00A0'}
                                </div>
                                금일 사항
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan='3'>업무내용</td>
                        </tr>
                        <tr>
                            <td>월</td>
                            <td colSpan='3'>
                                <textarea
                                    name='monContent'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.monContent : form.monContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>화</td>
                            <td colSpan='3'>
                                <textarea
                                    name='tuesContent'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.tuesContent : form.tuesContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>수</td>
                            <td colSpan='3'>
                                <textarea
                                    name='wedContent'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.wedContent : form.wedContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>목</td>
                            <td colSpan='3'>
                                <textarea
                                    name='thurContent'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.thurContent : form.thurContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>금</td>
                            <td colSpan='3'>
                                <textarea
                                    name='friContent'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.friContent : form.friContent) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                비고
                            </td>
                            <td colSpan='3'>
                                <textarea
                                    name='weekNote'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.weekNote : form.weekNote) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>   
                            <td className={WeekWorklogDetailCSS.titleTd} colSpan='4'>
                                <div className={WeekWorklogDetailCSS.squares}>
                                        {'\u00A0'}
                                </div>
                                특이 사항
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='4'>
                                <textarea
                                    name='weekSpecialNote'
                                    className={ WeekWorklogDetailCSS.weekWorklogInfoInput }
                                    value={ (!modifyMode ? weekWorklog.weekSpecialNote : form.weekSpecialNote) || ''}
                                    onChange={ onChangeHandler }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
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
    );
}

export default WeekWorklogDetail;