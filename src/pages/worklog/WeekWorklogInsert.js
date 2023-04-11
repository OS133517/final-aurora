import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { decodeJwt } from "../../utils/tokenUtils";
import WeekWorklogInsertCSS from './WeekWorklogInsert.module.css';
import { callWeekWorklogInsertAPI } from '../../apis/WeekWorklogAPICall';

function WeekWorklogInsert() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(loginMember);
    
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
        <div>
            <div className={ WeekWorklogInsertCSS.DetailDiv }>
                <div className={ WeekWorklogInsertCSS.weekWorklogsHeader }>주간 업무일지 작성</div>
                <div className={ WeekWorklogInsertCSS.descriptionDiv }>주간 업무일지</div>    
                <table className={ WeekWorklogInsertCSS.descriptionTable }>
                    <thead>
                        <tr>
                            <td>작성일</td>
                            <td>{`${new Date().toLocaleDateString()}`}</td>
                            <td>작성자</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>부서</td>
                            <th></th>
                            <td>직급</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>금일 사항</td></tr>
                        <tr>
                            <td></td>
                            <td>업무내용</td>
                        </tr>
                        <tr>
                            <td>월</td>
                            <td>
                                <input
                                    name='monContent'
                                    placeholder='오전 업무 내용'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>화</td>
                            <td>
                                <input
                                    name='tuesContent'
                                    placeholder='오후 업무 비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>수</td>
                            <td>
                                <input
                                    name='wedContent'
                                    placeholder='오후 업무 비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>목</td>
                            <td>
                                <input
                                    name='thurContent'
                                    placeholder='오후 업무 비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>금</td>
                            <td>
                                <input
                                    name='friContent'
                                    placeholder='오후 업무 비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr><td>비고</td></tr>
                        <tr>
                            <td>
                                <input
                                    name='weekNote'
                                    placeholder='오후 업무 비고'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>
                        <tr> <td>특이 사항</td></tr>
                        <tr> 
                            <td>
                                <input
                                    name='weekSpecialNote'
                                    placeholder='특이 사항'
                                    className={ WeekWorklogInsertCSS.weekWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
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
    )
}

export default WeekWorklogInsert;