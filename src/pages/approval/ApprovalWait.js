import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import approvalWaitCSS from './Approvals.module.css'
import { callGetwaitingAPI } from '../../apis/ApprovalAPICalls';
import WaitingForm from '../../components/form/approval/WaitingForm';

function ApprovalWait() {
    const dispatch = useDispatch();
    const waitList = useSelector(state => state.approvalReducer.lineList);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const code = token.memberCode;
    console.log('waitList', waitList);
    useEffect(() => {
        dispatch(callGetwaitingAPI({ memberCode: code }))
        // eslint-disable-next-line
    }, [])

    return (

        <>
            <div className={approvalWaitCSS.mainList}>
                <div className={approvalWaitCSS.subtitle}>
                    <h3>요청대기</h3>
                </div>
                <table className={approvalWaitCSS.approvalTable}>
                    <thead className={approvalWaitCSS.theadStyle}>
                        <tr>
                            <td className={approvalWaitCSS.title}>양식명</td>
                            <td>제목</td>
                            <td>만기일</td>
                            <td>결재승인</td>
                        </tr>
                    </thead>
                    <tbody className={approvalWaitCSS.tbodyStyle}>
                        {
                            waitList?.length > 0 && waitList.map((approval, i) => (<WaitingForm key={i} approve={approval} />))
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default ApprovalWait;