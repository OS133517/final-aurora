import DayWorklogInsertCSS from './DayWorklogInsert.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { callDayWorklogInsertAPI } from '../../apis/DayWorklogAPICall';
import { decodeJwt } from "../../utils/tokenUtils";

function DayWorklogInsert() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(loginMember);
    
    const [form, setForm] = useState({
        morningDayContent : '',
        afternoonDayContent : '',
        morningDayNote : '',
        afternoonDayNote : '',
        daySpecialNote : ''
    });

    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickDayWorklogInsertHandler = () => {

        console.log('[DayWorklogInsert] onClickDayWorklogInsertHandler');
        const formData = new FormData();

        formData.append("morningDayContent", form.morningDayContent);
        formData.append("morningDayNote", form.morningDayNote);
        formData.append("afternoonDayContent", form.afternoonDayContent);
        formData.append("afternoonDayNote", form.afternoonDayNote); 
        formData.append("daySpecialNote", form.daySpecialNote);
        
        dispatch(callDayWorklogInsertAPI({
            form : formData,
            memberCode : loginMember.memberCode
        }));

        navigate("/aurora/worklog/day", { replace : true });
        // window.location.reload();
    }

    return (
        <div className={ DayWorklogInsertCSS.detailDiv }>
            <div className={ DayWorklogInsertCSS.dayWorklogsHeader }>
                일일 업무일지
            </div>
            <div className={ DayWorklogInsertCSS.descriptionDiv }>
                <div>
                    일일 업무일지
                </div>
                <table className={ DayWorklogInsertCSS.descriptionTable }>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>{`${new Date().toLocaleDateString()}`}</td>
                            <td>작성자</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>부서</td>
                            <td></td>
                            <td>직급</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan='4' className={DayWorklogInsertCSS.titleTd}>
                                <div className={DayWorklogInsertCSS.squares}>
                                    {'\u00A0'}
                                </div>
                                금일 사항
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan='2'>업무내용</td>
                            <td>비고</td>
                        </tr>
                        <tr>
                            <td>오전</td>
                            <td colSpan='2'>
                                <textarea
                                    name='morningDayContent'
                                    placeholder='오전 업무 내용'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td>
                                <textarea
                                    name='morningDayNote'
                                    placeholder='오전 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>오후</td>
                            <td colSpan='2'>
                                <textarea
                                    name='afternoonDayContent'
                                    placeholder='오후 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td>
                                <textarea
                                    name='afternoonDayNote'
                                    placeholder='오후 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='4' className={DayWorklogInsertCSS.titleTd}>
                                <div className={DayWorklogInsertCSS.squares}>
                                        {'\u00A0'}
                                </div>
                                특이 사항
                            </td>
                        </tr>
                        <tr> 
                            <td colSpan='4'>
                                <textarea
                                    name='daySpecialNote'
                                    placeholder='특이 사항'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>    
            <div className={ DayWorklogInsertCSS.dayWorklogButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={() =>  onClickDayWorklogInsertHandler() }             
                >
                    등록하기
                </button>
            </div>      
        </div>
    )
}

export default DayWorklogInsert;