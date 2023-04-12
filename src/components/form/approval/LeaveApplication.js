import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberDetailAPI } from '../../../apis/MemberAPICall';
import { decodeJwt } from '../../../utils/tokenUtils';
import leaveApplicationCSS from './ApprovalModal.module.css';
import ApprovalDraftLine from './ApprovalDraftLine';
import { callPostApprovalAPI } from '../../../apis/ApprovalAPICalls';
import { callPostVacationAPI } from '../../../apis/VacationAPICall';
import { callSelectVacationAPI } from '../../../apis/AttendanceAPICall';

//휴가 신청서
function LeaveApplication(props) {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    /** dispatch */
    const dispatch = useDispatch();
    // 유저 정보
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    /** useSelector */
    const memberName = useSelector(state => state.memberReducer.memberDetail);
    const restVacation = useSelector(state => state.attendanceReducer.vacation);


    /** 사용자 지정 변수 */
    const { docCode } = props;
    const docNum = Number(docCode) + 1;
    /** useState */
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);
    const [remainVacation, setRemainVacation] = useState(restVacation?.REMAIN_VACATION ?? 0);
    // 반차용 싱태변수
    const [isHalfDay, setIsHalfDay] = useState(false);
    // 입력한 데이터를 저장
    const [form, setForm] = useState({
        docCode: docNum,
        appTitle: '',
        appDescript: '',
        appStartDate: todayString,
        appEndDate: todayString,
        appStatus: 'n',
        appOpen: 'n'

    });

    /** useEffect */
    useEffect(() => {
        if (docCode !== undefined) {
            setIsEdit(true);
        }
    }, [docCode]);

    useEffect(() => {
        setRemainVacation(restVacation?.REMAIN_VACATION ?? 0);

    }, [restVacation]);

    useEffect(() => {
        // 멤버 찾기 
        dispatch(callMemberDetailAPI({ memberCode: memberCode }));
        // 휴가테이블에서 잔여 휴가가 없으면 디폴드(12)로 값 넘김
        dispatch(callSelectVacationAPI({ memberCode: memberCode }));
        //eslint-disable-next-line
    }, [])


    // 날짜 계산
    const startDate = new Date(form?.appStartDate);
    const endDate = new Date(form?.appEndDate);
    // console.log('startDate : ', startDate, ' endDate : ', endDate);
    let currentDate = startDate;
    let differenceInDays = 0;

    while (currentDate <= endDate) {
        // getDay 각 요일을 숫자로 표현 일요일은 0, 토요일은 6
        const dayOfWeek = currentDate.getDay();

        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            differenceInDays++;
        }
        // 다음 날짜로 이동 
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    // 일로 계산
    // console.log('differenceInDays : ', differenceInDays);


    const backEvent = () => {
        window.history.back();
    }
    const submitEvent = () => {

        // dispatch
        // 결재서류
        dispatch(callPostApprovalAPI({
            form: form
        }, docNum, memberCode, setResponseStatus))
        // 휴가 신청 서류 일때
        if (docNum === 8) {
            dispatch(callPostVacationAPI({ memberCode: memberCode }, remainVacation));

        }
        // localStorage 저장
        if (localStorage.getItem('differenceInDays') !== null) {
            // localstorage에 저장되어 있는 differenceInDays를 정수형으로 변환하고 10진수로 한다.
            differenceInDays = parseInt(localStorage.getItem('differenceInDays'), 10);
        } else {
            localStorage.setItem('differenceInDays', differenceInDays);
        }
    }

    const inputValue = (e) => {

        setForm({
            ...form,
            appDescript: e.target.checked ? "on" : "",
            [e.target.name]: e.target.value
        })


        console.log('onChangeHandler : ', form);

    }

    const handleHalfDayChange = (e) => {

        setIsHalfDay(e.target.checked);
        if (e.target.checked) {
            document.getElementById('appEndDate').value = document.getElementById('appStartDate').value;

        } else {

            document.getElementById('appEndDate').value = '';
        }
        setForm({
            ...form,
            appDescript: e.target.checked ? 1 : 0,
            appEndDate: document.getElementById("appEndDate").value // disabled 됬던 
        })


        console.log('onChangeHandler : ', form);

    }
    // console.log('isEdit : ', isEdit);
    return (
        <div className={leaveApplicationCSS.detailBox}>
            {!isEdit ? <div></div> : <div className={leaveApplicationCSS.nextStep}>
                <button onClick={submitEvent}> 제출 </button>
                <button onClick={backEvent}>목록</button>
            </div>}
            <div className={leaveApplicationCSS.detailView}>
                <div className={leaveApplicationCSS.buttonBox}>
                </div>
                <table className={leaveApplicationCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={leaveApplicationCSS.detaildocName} colSpan="2">
                                <h1>휴가신청서</h1>
                            </td>
                        </tr>
                    </thead>
                    <tbody className={leaveApplicationCSS.detailBody}>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                제목
                            </td>
                            <td className={leaveApplicationCSS.description}>
                                {!isEdit ?
                                    <input type="text" readOnly className={leaveApplicationCSS.inputBox} name="appTitle" /> :
                                    <input type="text" className={leaveApplicationCSS.inputBox} name="appTitle" onChange={inputValue} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={leaveApplicationCSS.description}>
                                {memberName?.memberDTO?.memberName}
                            </td>
                        </tr>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                기간
                            </td>
                            <td className={leaveApplicationCSS.description}>
                                {
                                    !isEdit ? <input type="date" id="appStartDate" name='appStartDate' readOnly /> :
                                        <input type="date" id="appStartDate" name='appStartDate' onChange={inputValue} />
                                }~
                                {
                                    !isEdit ? <input type="date" id="appEndDate" name='appEndDate' readOnly /> :
                                        <input type="date" id="appEndDate" name='appEndDate' onChange={inputValue} disabled={isHalfDay} />
                                }
                                {
                                    !isEdit ? <input type="checkbox" id="appDescript" name='appDescript' readOnly /> :
                                        <input type="checkbox" id="appDescript" name='appDescript' onChange={handleHalfDayChange} />
                                } 반차
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className={leaveApplicationCSS.approvalLineBox}>
                    {responseStatus === 200 &&
                        <ApprovalDraftLine docNum={docNum} />
                    }
                </div>
            </div>
        </div >

    )
}

export default LeaveApplication;