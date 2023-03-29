import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetApprovalsAPI } from '../../apis/ApprovalAPICalls';
import ApprovalForm from '../../components/form/approval/ApprovalForm';
import ApprovalCSS from './Approvals.module.css'

function Pending() {
    const dispatch = useDispatch();
    const pendingList = useSelector(state => state.approvalReducer.approvalInfo);

    useEffect(() => {
        dispatch(callGetApprovalsAPI(1))
    // eslint-disable-next-line
    },[])
    return(

        <>
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
                        pendingList.length > 0 && pendingList.map((approval) => (<ApprovalForm key={approval.appCode} approve={approval}/>))
                    }
                </tbody>
            </table>
            
        </div>
        </>
    );
}

export default Pending;