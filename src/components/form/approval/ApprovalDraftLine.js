import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callPostApprovalLineAPI } from '../../../apis/ApprovalAPICalls';
import { callMemberListAPI } from '../../../apis/MemberAPICall';
import { decodeJwt } from '../../../utils/tokenUtils';
import approvalLineCSS from './ApprovalModal.module.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ApprovalLine() {


    /** Selector */
    const memberList = useSelector(state => state.memberReducer.memberList);
    const approval = useSelector(state => state.approvalReducer.draftapproval);
    // console.log('approval : ', approval);
    console.log('ApprovalLine : ', memberList);
    /** navigate */
    const navigate = useNavigate();
    /** Jwt */
    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    const loginCode = loginMember.memberCode;
    // console.log('loginMember : ', loginMember);

    /** useState */
    const [selectedMember, setSelectedMember] = useState([]);
    const [responseStatus, setResponseStatus] = useState(null);


    /** dispatch */
    const dispatch = useDispatch();

    /** useEffect */
    useEffect(() => {
        dispatch(callMemberListAPI())
        //eslint-disable-next-line
    }, [])

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