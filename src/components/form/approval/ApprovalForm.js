import { useNavigate } from "react-router-dom";
import approvalModalCSS from "./ApprovalModal.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { callDeleteApprovalAPI } from "../../../apis/ApprovalAPICalls";
import { useState } from "react";


function ApprovalForm({ approve: { appCode, documentDTO, appTitle, appEndDate } }) {

    /** uesNavigate */
    const navigate = useNavigate();

    /** dispatch */
    const dispatch = useDispatch();

    /** useState */

    /** event */
    const onClickModal = () => {
        navigate(`/aurora/approval/detail/${appCode}`, { state: { documentDTO } });
    }
    console.log('[Swal] :', appCode);
    const deleteHandler = () => {
        Swal.fire({
            icon: "warning",
            title: "결재 서류 삭제",
            text: "정말로 삭제하시겠습니까? 삭제된 결재 서류는 복구할 수 없습니다.",
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(callDeleteApprovalAPI({ appCode: appCode }));
                Swal.fire({
                    icon: "success",
                    title: "삭제 성공!",
                    text: "결재 서류가 삭제 되었습니다.",
                    confirmButtonText: '확인'
                }).then(() => {
                    window.location.reload();
                })
            }

        })
    }
    return (
        <>
            <tr className={approvalModalCSS.approvalList}>
                <td className={approvalModalCSS.approvalList}>{documentDTO.docName}</td>
                <td onClick={onClickModal} className={approvalModalCSS.link}>{appTitle}</td>
                {/* <td className={approvalModalCSS.approvalList}>{appEndDate}</td> */}
                <td className={approvalModalCSS.approvalList}>{appEndDate}</td>
                <td></td>
                <td className={approvalModalCSS.deletecheck}> <button onClick={deleteHandler}> 삭제 </button> </td>
            </tr>
        </>

    )
}

export default ApprovalForm;