import { useNavigate } from "react-router-dom";
import approvalModalCSS from "./ApprovalModal.module.css";

function ApprovalForm({approve : {appCode,documentDTO, appTitle, appEndDate}}) {
    
    const navigate = useNavigate();

    const onClickModal = () => {
        navigate(`/approval/detail/${appCode}`, {state: {documentDTO}});
    }
    return(
        <>
            <tr className={approvalModalCSS.approvalList}>
                <td className={approvalModalCSS.approvalList}>{documentDTO.docName}</td>
                <td onClick={onClickModal} className={approvalModalCSS.link}>{appTitle}</td>
                <td className={approvalModalCSS.approvalList}>{appEndDate}</td>
            </tr>
        </>
            
    )
}

export default ApprovalForm;