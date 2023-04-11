import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callPostApprovalLineAPI } from '../../../apis/ApprovalAPICalls';
import { callMemberListAPI } from '../../../apis/MemberAPICall';
import { decodeJwt } from '../../../utils/tokenUtils';
import approvalLineCSS from './ApprovalModal.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { callPostVacationUseAPI } from '../../../apis/VacationAPICall';

function ApprovalLine(props) {

    /** jwt */
    /** Selector */
    // 멤버 리스트
    const memberList = useSelector(state => state.memberReducer.memberList);
    // 
    const approval = useSelector(state => state.approvalReducer.draftapproval);
    // 휴가 코드 가져오기
    const vacation = useSelector(state => state.vacationReducer.vacationRegister);
    // 이전 LeaveApplication 컴포넌트에서 가져온 vacation_no
    // const vacNo = vacation ? vacation.VACATION_NO : null;
    // 문서 번호
    const docNum = Number(props.docNum);
    /** navigate */
    const navigate = useNavigate();
    /** Jwt */
    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    const loginCode = loginMember.memberCode;
    // console.log('loginMember : ', loginMember);

    /** useState */
    const [selectedMember, setSelectedMember] = useState([]);
    const [responseStatus, setResponseStatus] = useState(null);
    // 휴가 시작, 종료일
    const [startDate, setStartDate] = useState(null);
    const [appEndDate, setAppEndDate] = useState(null);

    //use vacation에 들어 갈 데이터
    const [form, setForm] = useState({
        vacationNo: 0,
        vacationStartDate: startDate,
        vacationEndDate: appEndDate,
        isHalfDay: 0
    });

    if (docNum === 8) {
        if (approval.appDescript === 'on') {
            setForm(prevForm => ({
                ...prevForm,
                isHalfDay: 1
            }));

        }
    }
    // console.log('form : ', form);

    /** dispatch */
    const dispatch = useDispatch();

    /** useEffect */
    useEffect(() => {
        dispatch(callMemberListAPI())
        //eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (vacation) {
            setForm((prevForm) => ({
                ...prevForm,
                vacationNo: vacation.VACATION_NO
            }));
        }
    }, [vacation]);
    // approval useSelector에서 가져온 값을 useState에 저장
    useEffect(() => {
        if (approval) {
            setStartDate(approval.appStartDate);
            setAppEndDate(approval.appEndDate);
        }
    }, [approval]);
    // 시작일, 종료일이 바뀔 때마다 form useSate에 저장
    useEffect(() => {
        setForm({
            vacationNo: vacation ? vacation.VACATION_NO : null,
            vacationStartDate: startDate,
            vacationEndDate: appEndDate,
            isHalfDay: form.isHalfDay,
        });
        //eslint-disable-next-line
    }, [startDate, appEndDate]);

    /** handler */
    const checkboxHandle = (e, member) => {
        if (e.target.checked) {
            // 체크박스가 선택 될 때
            setSelectedMember([
                ...selectedMember,
                {
                    ...member,
                    appCode: approval.appCode,
                },
            ]);
        } else {
            // 체크박스가 해제 될 때
            setSelectedMember(selectedMember.filter((m) => m.memberCode !== member.memberCode));
        }

        // console.log('[checkboxHandle] : ', selectedMember);
    }
    // 제출 버튼
    const lineSubmit = () => {
        // apiCALL 컴포넌트로 보내기 전에 정렬해서 보냄
        const sortedSelectedMember = [...selectedMember].sort((a, b) => a.memberCode - b.memberCode);

        dispatch(callPostApprovalLineAPI(approval.appCode, sortedSelectedMember, setResponseStatus))
        if (docNum === 8 && (vacation.VACATION_NO !== null || vacation.VACATION_NO !== undefined)) {
            dispatch(callPostVacationUseAPI({ form }, loginCode));
        }

    }

    if (responseStatus === 200) {
        Swal.fire({
            icon: "success",
            title: "성공",
            text: "결재 라인이 성공적으로 등록되었습니다.",
        }).then(() => {
            navigate("/aurora/approval");
        });
    }

    return (
        <div>
            <div className={approvalLineCSS.submitBox}>
                <button onClick={lineSubmit}>제출</button>
            </div>
            <ul className={approvalLineCSS.line}>
                {Array.isArray(memberList?.data) && memberList?.data
                    .filter((member) => member.memberCode !== loginCode)
                    .map(member => (
                        <li key={member.memberCode} value={member.memberCode}>
                            <input type="checkbox" name='checkboxValue' checked={selectedMember.some((m) => m.memberCode === member.memberCode)}
                                onChange={(e) => checkboxHandle(e, member)} />
                            {member.memberName}
                        </li>
                    ))}
            </ul>
        </div>
    )

}

export default ApprovalLine;