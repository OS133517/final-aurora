import { useNavigate } from "react-router-dom";
import approvalModalCSS from "./ApprovalModal.module.css";

function WaitingForm({ approve: { approvalDTO, documentDTO, appStatus } }) {

    const navigate = useNavigate();
    const { appCode, appTitle, appEndDate } = approvalDTO;
    const onClickModal = () => {
        navigate(`/aurora/approval/detail/${appCode}`, { state: { documentDTO } });
    }
    return (
        <>
            <tr className={approvalModalCSS.approvalList}>
                <td className={approvalModalCSS.approvalList}>{documentDTO.docName}</td>
                <td onClick={onClickModal} className={approvalModalCSS.link}>{appTitle}</td>
                <td className={approvalModalCSS.approvalList}>{appEndDate}</td>
                <td className={approvalModalCSS.approvalList}>{appStatus === 'n' && '대기중'}</td>

            </tr>
        </>

    )
}

export default WaitingForm;