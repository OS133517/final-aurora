import workRequestCSS from './ApprovalModal.module.css'
// 에디터 컴포넌트, css스타일 
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// EditorState 처리를 위한 draft-js
import { EditorState } from 'draft-js';
import { useState } from 'react';
function WorkRequest() {
    /* 에디터 설정 */
    // EditorState 사용하기 위해 useState로 설정
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };
    const docCode = undefined;
    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className={workRequestCSS.detailBox}>
            <div className={workRequestCSS.detailView}>
                <div className={workRequestCSS.buttonBox}>
                </div>
                <table className={workRequestCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={workRequestCSS.detaildocName} colSpan="2">
                            </td>
                        </tr>
                    </thead>
                    <tbody className={workRequestCSS.detailBody}>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                제목
                            </td>
                            <td className={workRequestCSS.description}>
                                <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={workRequestCSS.description}>
                            </td>
                        </tr>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                기간
                            </td>
                            <td className={workRequestCSS.description}>
                                {!isEdit ? <input type="date" id="startDate" name='startDate' readOnly /> : <input type="date" id="startDate" name='startDate' />}~
                                {!isEdit ? <input type="date" id="endDate" name='endDate' readOnly /> : <input type="date" id="endDate" name='endDate' />}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className={workRequestCSS.detailDescript}>
                                <Editor
                                    editorState={editorState}
                                    // 에디터와 상호작용할때마다 새로운 에디터 상태로 상태를 업데이트
                                    onEditorStateChange={onEditorStateChange}
                                    readOnly={docCode < 0 || docCode === undefined ? true : false}
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

export default WorkRequest;