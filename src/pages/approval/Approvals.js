import { useDispatch, useSelector } from "react-redux";
import ApprovalCSS from "./Approvals.module.css"
import { useEffect, useState } from "react";
import { callGetApprovalsAPI } from "../../apis/ApprovalAPICalls";
import ApprovalForm from "../../components/form/approval/ApprovalForm";
import { decodeJwt } from "../../utils/tokenUtils";
function Approvals() {
    /** useDispatch */
    const dispatch = useDispatch();
    /** useState */
    const [isView, setIsView] = useState(false);
    /** 변수 */
    // 로그인 기능 구현 되면 사용
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const code = token.memberCode;

    /** useSelector */
    const lastList = useSelector(state => state.approvalReducer.approvalInfo);
    /** useEffect */
    useEffect(() => {
        dispatch(callGetApprovalsAPI({ memberCode: code }))
        // eslint-disable-next-line
    }, [])
    const writeMember = lastList;
    for (const list of lastList) {
        console.log('for of 문 :', list);
    }
    /** evnet */
    console.log('lastList', writeMember);
    console.log('code', code);

    return (
        <div className={ApprovalCSS.mainList}>
            <div className={ApprovalCSS.subtitle}>
                <h3>결재 리스트</h3>
            </div>
            <table className={ApprovalCSS.approvalTable}>
                <thead className={ApprovalCSS.theadStyle}>
                    <tr>
                        <td className={ApprovalCSS.title}>양식명</td>
                        <td>제목</td>
                        <td>만기일</td>
                        {/* <td>시작일</td> */}
                        <td>결재승인</td>
                        <td className={ApprovalCSS.deleteCheck}> 삭제 </td>
                    </tr>
                </thead>
                <tbody className={ApprovalCSS.tbodyStyle}>
                    {
                        lastList.length > 0 && lastList.map((approval) => (<ApprovalForm key={approval.appCode} approve={approval} />))
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Approvals;