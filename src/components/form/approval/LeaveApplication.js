import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberDetailAPI } from '../../../apis/MemberAPICall';
import { decodeJwt } from '../../../utils/tokenUtils';
import leaveApplicationCSS from './ApprovalModal.module.css';
import ApprovalDraftLine from './ApprovalDraftLine';
import { callPostApprovalAPI } from '../../../apis/ApprovalAPICalls';

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
    const { docCode } = props;
    const docNum = Number(docCode) + 1;

    /** useState */
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

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
        dispatch(callMemberDetailAPI({ memberCode: memberCode }));
        //eslint-disable-next-line
    }, [])

    const backEvent = () => {
        window.history.back();
    }
    const submitEvent = () => {

        // dispatch
        dispatch(callPostApprovalAPI({
            form: form
        }, docNum, memberCode, setResponseStatus))

    }

    const inputValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
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
                                {!isEdit ? <input type="date" id="appStartDate" name='appStartDate' readOnly /> : <input type="date" id="appStartDate" name='appStartDate' onChange={inputValue} />}~
                                {!isEdit ? <input type="date" id="appEndDate" name='appEndDate' readOnly /> : <input type="date" id="appEndDate" name='appEndDate' onChange={inputValue} />}
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className={leaveApplicationCSS.approvalLineBox}>
                    {responseStatus === 200 &&
                        <ApprovalDraftLine />
                    }
                </div>
            </div>
        </div>

    )
}

export default LeaveApplication;