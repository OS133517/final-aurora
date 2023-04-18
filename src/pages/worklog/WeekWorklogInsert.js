import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { decodeJwt } from "../../utils/tokenUtils";
import WeekWorklogInsertCSS from './WeekWorklogInsert.module.css';
import { callWeekWorklogInsertAPI } from '../../apis/WeekWorklogAPICall';
import { callMemberInfoAPI } from '../../apis/MemberAPICall';

function WeekWorklogInsert() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const weekWorklog = useSelector(state => state.dayWorklogReducer.dayWorklog);

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(loginMember);

    const memberInfo = useSelector(state => state.memberReducer.memberInfo);

    useEffect (() => {
        console.log("weekWorklog.memberCode" + weekWorklog.memberCode);
        dispatch(callMemberInfoAPI({
            memberCode : loginMember.memberCode
        }));
    },[weekWorklog]
    );
    
    const [form, setForm] = useState({
        monContent : '',
        tuesContent : '',
        wedContent : '',
        thurContent : '',
        friContent : '',
        weekNote : '',
        weekSpecialNote : ''
    });

    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickWeekWorklogInsertHandler = () => {

        console.log('[WeekWorklogInsert] onClickWeekWorklogInsertHandler');
        const formData = new FormData();

        formData.append("monContent", form.monContent);
        formData.append("tuesContent", form.tuesContent);
        formData.append("wedContent", form.wedContent);
        formData.append("thurContent", form.thurContent); 
        formData.append("friContent", form.friContent);
        formData.append("weekNote", form.weekNote); 
        formData.append("weekSpecialNote", form.weekSpecialNote);
        
        dispatch(callWeekWorklogInsertAPI({
            form : formData,
            memberCode : loginMember.memberCode
        }));

        navigate("/aurora/worklog/week", { replace : true });
        window.location.reload();
    }

    return (
        <div className={ WeekWorklogInsertCSS.detailDiv }>
            <div className={ WeekWorklogInsertCSS.weekWorklogsHeader }>
                주간 업무일지 작성
            </div>
            <div className={ WeekWorklogInsertCSS.descriptionDiv }>
                <div>
                    주간 업무일지
                </div>
                <table className={ WeekWorklogInsertCSS.descriptionTable }>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>{`${new Date().toLocaleDateString()}`}</td>
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
                        <tr>
                            <td className={WeekWorklogInsertCSS.titleTd} colSpan='4'>
                                <div className={WeekWorklogInsertCSS.squares}>
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
                                    placeholder='업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>화</td>
                            <td colSpan='3'>
                                <textarea
                                    name='tuesContent'
                                    placeholder='업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>수</td>
                            <td colSpan='3'>
                                <textarea
                                    name='wedContent'
                                    placeholder='업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>목</td>
                            <td colSpan='3'>
                                <textarea
                                    name='thurContent'
                                    placeholder='업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>금</td>
                            <td colSpan='3'>
                                <textarea
                                    name='friContent'
                                    placeholder='업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
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
                                    placeholder='비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr> 
                            <td className={WeekWorklogInsertCSS.titleTd} colSpan='4'>
                                <div className={WeekWorklogInsertCSS.squares}>
                                        {'\u00A0'}
                                </div>
                                특이 사항
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='4'>
                                <textarea
                                    name='weekSpecialNote'
                                    placeholder='특이 사항'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={ WeekWorklogInsertCSS.weekWorklogButtonDiv }>
                    <button        
                        onClick={ () => navigate(-1) }            
                    >
                        돌아가기
                    </button>
                    <button       
                        onClick={() =>  onClickWeekWorklogInsertHandler() }             
                    >
                        등록하기
                    </button>
                </div>    
            </div> 
        </div>
    )
}

export default WeekWorklogInsert;