import { useDispatch, useSelector } from 'react-redux';
import DayWorklogDetailCSS from './DayWorklogDetail.module.css';
import {callDayWorklogDetailAPI} from '../../apis/DayWorklogAPICall';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';

function DayWorklogDetail() {

    const dispatch = useDispatch();

    const {dayWorklogCode} = useParams(); // 패스배리어블을 쓰면 유즈파람을 쓴다??

    const dayWorklog = useSelector(state => state.dayWorklogReducer.dayWorklog);
    //DB에 없는 내용은 멤버코드에 담겨있다.
    //그거는 토큰에 멤버코드를 담아놔서 꺼내쓸수 있따. token.memberCode 를 이용해서 사용할 수 있음??

    useEffect (() => { // 백에서 패스발리어블?로 넘겨서 이렇게 씀? 패스배리어블을 쓰면 유즈파람을 쓴다??
        dispatch(callDayWorklogDetailAPI({
            dayWorklogCode : dayWorklogCode
        }));
    },[]
    );

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
                            <td>{ dayWorklog.memberName}</td>
                        </tr>
                        <tr>
                            <td>부서</td>
                            <th></th>
                            <td>직급</td>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>금일 사항</tr>
                        <tr>
                            <td></td>
                            <td>업무내용</td>
                            <td>비고</td>
                        </tr>
                        <tr>
                            <td>오전</td>
                            <td>{ dayWorklog.morningDayContent || ''}</td>
                            <td>{ dayWorklog.morningDayNote || ''}</td>
                        </tr>
                        <tr>
                            <td>오후</td>
                            <td>{ dayWorklog.afternoonDayContent || ''}</td>
                            <td>{ dayWorklog.afternoonDayNote || ''}</td>
                        </tr>
                    
                    <tr>특이 사항</tr>
                        <tr>
                        { dayWorklog.daySpecialNote || ''}
                        </tr>
                    </tbody>
                </table>
            </div>          
        </div>
    )
}

export default DayWorklogDetail;