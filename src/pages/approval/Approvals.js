import { useDispatch, useSelector } from "react-redux";
import ApprovalCSS from "./Approvals.module.css"
import { useEffect } from "react";
import { callGetApprovalsAPI } from "../../apis/ApprovalAPICalls";
import ApprovalForm from "../../components/form/approval/ApprovalForm";
import { decodeJwt } from "../../utils/tokenUtils";
function Approvals() {

    const dispatch = useDispatch();
    const lastList = useSelector(state => state.approvalReducer.approvalInfo);
    // 로그인 기능 구현 되면 사용
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const code = token.memberCode;
    useEffect(() => {
        dispatch(callGetApprovalsAPI({memberCode : code}))
    // eslint-disable-next-line
    },[])
    return(
        <div className={ApprovalCSS.mainList}>
            <div className={ApprovalCSS.subtitle}>
                <h3>미결재</h3>
            </div>
            <table className={ApprovalCSS.approvalTable}>
                <thead className={ApprovalCSS.theadStyle}>
                    <tr>
                        <td className={ApprovalCSS.title}>양식명</td>
                        <td>제목</td>
                        <td>만기일</td>
                        <td>결재승인</td>
                    </tr>
                </thead>
                <tbody className={ApprovalCSS.tbodyStyle}>
                    {
                        Array.isArray(lastList) && lastList.map((approval) => (<ApprovalForm key={approval.appCode} approve={approval}/>))
                    }
                </tbody>
            </table>
            
        </div>
    );
}

export default Approvals;