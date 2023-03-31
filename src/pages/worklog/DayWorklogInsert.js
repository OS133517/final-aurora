import DayWorklogInsertCSS from './DayWorklogInsert.module.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callDayWorklogInsertAPI } from '../../apis/DayWorklogAPICall';
import { useState } from 'react';

function DayWorklogInsert() {


    const dispatch = useDispatch();

    const navigate = useNavigate();
    
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

        // const formData = new FormData();

        // formData.append("morningDayContent", form.morningDayContent);
        // formData.append("morningDayNote", form.morningDayNote);
        // formData.append("afternnonDayContent", form.afternnonDayContent);
        // formData.append("afternnonDayNote", form.afternnonDayNote);
        // formData.append("daySpecialNote", form.daySpecialNote);

        // dispatch(callDayWorklogInsertAPI({
        //     form : formData
        // }));
    }


    

    return (
        <div>
            <div className={ DayWorklogInsertCSS.DetailDiv }>
                <div className={ DayWorklogInsertCSS.dayWorklogsHeader }>일일 업무일지</div>
                <div className={ DayWorklogInsertCSS.descriptionDiv }>일일 업무일지</div>    
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
                            <th></th>
                            <td>직급</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>금일 사항</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>업무내용</td>
                            <td>비고</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>오전</td>
                            <td>
                                <input
                                    name='morningDayContent'
                                    placeholder='오전 업무 내용'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td>
                                <input
                                    name='morningDayNote'
                                    placeholder='오전 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>오후</td>
                            <td>
                                <input
                                    name='afternnonDayContent'
                                    placeholder='오후 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td>
                                <input
                                    name='afternnonDayNote'
                                    placeholder='오후 업무 비고'
                                    className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                    onChange={ onChangeHandler }
                                    />
                            </td>
                            <td></td>
                        </tr>
                    
                    <tr> <td>특이 사항</td></tr>
                        <tr> <td>
                            <input
                                name='daySpecialNote'
                                placeholder='특이 사항'
                                className={ DayWorklogInsertCSS.dayWorklogInfoInput }
                                onChange={ onChangeHandler }
                                /></td>
                                    <td></td>
                                    <td></td>
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