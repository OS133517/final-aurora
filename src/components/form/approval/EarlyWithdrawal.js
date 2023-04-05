import { useState } from 'react';
import earlyWithdrawalCSS from './ApprovalModal.module.css'
// 에디터 컴포넌트, css스타일 
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// EditorState 처리를 위한 draft-js
import { EditorState } from 'draft-js';
// 반차, 조퇴
function EarlyWithdrawal() {

    /* 에디터 설정 */
    // EditorState 사용하기 위해 useState로 설정
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);
    const docCode = undefined;

    const backEvent = () => {
        window.history.back();
    }

    return (
        <div className={earlyWithdrawalCSS.detailBox}>
            {!isEdit ? <div></div> : <div className={earlyWithdrawalCSS.nextStep}>
                <button> 제출 </button>
                <button onClick={backEvent}>목록</button>
            </div>}
            <div className={earlyWithdrawalCSS.detailView}>
                <div className={earlyWithdrawalCSS.buttonBox}>
                </div>
                <table className={earlyWithdrawalCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={earlyWithdrawalCSS.detaildocName} colSpan="2">
                                <h1>조퇴신청서</h1>
                            </td>
                        </tr>
                    </thead>
                    <tbody className={earlyWithdrawalCSS.detailBody}>
                        <tr>
                            <td className={earlyWithdrawalCSS.detailTitle}>
                                제목
                            </td>
                            <td className={earlyWithdrawalCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={earlyWithdrawalCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={earlyWithdrawalCSS.description}>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className={earlyWithdrawalCSS.detailDescript}>
                                <Editor
                                    editorState={editorState}
                                    // 에디터와 상호작용할때마다 새로운 에디터 상태로 상태를 업데이트
                                    onEditorStateChange={onEditorStateChange}
                                    readOnly={!isEdit ? true : false}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                                        inline: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        history: { inDropdown: true },
                                    }}
                                />

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EarlyWithdrawal;