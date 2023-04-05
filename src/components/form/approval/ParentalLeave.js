import { useState } from 'react';
import parentalLeaveCSS from './ApprovalModal.module.css'

function ParentalLeave() {

    const docCode = undefined;
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);
    const backEvent = () => {
        window.history.back();
    }

    return (
        <div className={parentalLeaveCSS.detailBox}>
            {!isEdit ? <div></div> : <div className={parentalLeaveCSS.nextStep}>
                <button> 제출 </button>
                <button onClick={backEvent}>목록</button>
            </div>}
            <div className={parentalLeaveCSS.detailView}>
                <div className={parentalLeaveCSS.buttonBox}>
                </div>
                <table className={parentalLeaveCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={parentalLeaveCSS.detaildocName} colSpan="2">
                                <h1>육아휴직서</h1>
                            </td>
                        </tr>
                    </thead>
                    <tbody className={parentalLeaveCSS.detailBody}>
                        <tr>
                            <td className={parentalLeaveCSS.detailTitle}>
                                제목
                            </td>
                            <td className={parentalLeaveCSS.description}>

                            </td>
                        </tr>
                        <tr>
                            <td className={parentalLeaveCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={parentalLeaveCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={parentalLeaveCSS.detailTitle}>
                                기간
                            </td>
                            <td className={parentalLeaveCSS.description}>
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

export default ParentalLeave;