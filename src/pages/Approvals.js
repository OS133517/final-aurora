import { useDispatch, useSelector } from "react-redux";
import ApprovalCSS from "./Approvals.module.css"
// import {decodeJwt} from "../utils/tokenUtils"
import { useEffect } from "react";
import { callGetApprovalsAPI } from "../apis/ApprovalAPICalls";
import ApprovalForm from "../components/form/approval/ApprovalForm";
function Approvals() {

    const dispatch = useDispatch();
    const lastList = useSelector(state => state.approvalReducer);
    // 로그인 기능 구현 되면 사용
    // const token = decodeJwt(window.localStorage.getItem('accessToken'));

    useEffect(() => {
        dispatch(callGetApprovalsAPI(1))
    // eslint-disable-next-line
    },[])
    return(
        <div className={ApprovalCSS.mainList}>
            <table className={ApprovalCSS.approvalTable}>
                <thead>
                    <tr>
                        <td colSpan="2">양식명</td>
                        <td colSpan="6">제목</td>
                        <td colSpan="2">만기일</td>
                        <td colSpan="2">결재승인</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        lastList.length > 0 && 
                        lastList.map((approval) => (
                            <ApprovalForm key={approval.appCode} approve={approval}/>
                        ))
                    }
                </tbody>
            </table>
        
        </div>
    );
}

export default Approvals;