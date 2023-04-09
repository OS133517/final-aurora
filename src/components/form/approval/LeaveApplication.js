import { useState } from 'react';
import leaveApplicationCSS from './ApprovalModal.module.css';

//휴가 신청서
function LeaveApplication() {

    const docCode = undefined;
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);

    const backEvent = () => {
        window.history.back();
    }

    return (
        <div className={leaveApplicationCSS.detailBox}>
            {!isEdit ? <div></div> : <div className={leaveApplicationCSS.nextStep}>
                <button> 제출 </button>
                <button onClick={backEvent}>목록</button>
            </div>}
            <div className={leaveApplicationCSS.detailView}>
                <div className={leaveApplicationCSS.buttonBox}>
                </div>
                <table className={leaveApplicationCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={leaveApplicationCSS.detaildocName} colSpan="2">
                                <h1>휴가신청서</h1>
                            </td>
                        </tr>
                    </thead>
                    <tbody className={leaveApplicationCSS.detailBody}>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                제목
                            </td>
                            <td className={leaveApplicationCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={leaveApplicationCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={leaveApplicationCSS.detailTitle}>
                                기간
                            </td>
                            <td className={leaveApplicationCSS.description}>
                                {!isEdit ? <input type="date" id="startDate" name='startDate' readOnly /> : <input type="date" id="startDate" name='startDate' />}~
                                {!isEdit ? <input type="date" id="endDate" name='endDate' readOnly /> : <input type="date" id="endDate" name='endDate' />}
                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default LeaveApplication;