import { useState } from 'react';
import resignationCSS from './ApprovalModal.module.css'

function Resignation() {

    const docCode = undefined;
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={resignationCSS.detailBox}>
            <div className={resignationCSS.detailView}>
                <div className={resignationCSS.buttonBox}>
                </div>
                <table className={resignationCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={resignationCSS.detaildocName} colSpan="2">
                            </td>
                        </tr>
                    </thead>
                    <tbody className={resignationCSS.detailBody}>
                        <tr>
                            <td className={resignationCSS.detailTitle}>
                                제목
                            </td>
                            <td className={resignationCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={resignationCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={resignationCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={resignationCSS.detailTitle}>
                                기간
                            </td>
                            <td className={resignationCSS.description}>
                                {!isEdit ? <input type="date" id="endDate" name='endDate' readOnly /> : <input type="date" id="endDate" name='endDate' />}
                            </td>
                        </tr>
                        <tr>
                            <td className={resignationCSS.detailTitle}>
                                이유
                            </td>
                            <td className={resignationCSS.detailDescript}>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Resignation;