import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetCompeletedAPI } from '../../apis/ApprovalAPICalls';
import ApprovalForm from '../../components/form/approval/ApprovalForm';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalCSS from './Approvals.module.css'

function Completed() {
    const dispatch = useDispatch();
    const completedList = useSelector(state => state.approvalReducer.completedList);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const code = token.memberCode;
    console.log('completedList', completedList);
    useEffect(() => {
        dispatch(callGetCompeletedAPI({ memberCode: code }))
        // eslint-disable-next-line
    }, [])
    return (

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
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody className={ApprovalCSS.tbodyStyle}>
                        {
                            completedList?.length > 0 && completedList.map((approval) => (<ApprovalForm key={approval.appCode} approve={approval} />))
                        }
                    </tbody>
                </table>

            </div>
        </>
    );
}

export default Completed;