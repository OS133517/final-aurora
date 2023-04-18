import workRequestCSS from './ApprovalModal.module.css'
// 에디터 컴포넌트, css스타일 
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// EditorState 처리를 위한 draft-js
import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { decodeJwt } from "../../../utils/tokenUtils";
import { useDispatch, useSelector } from 'react-redux';
import { callPostApprovalAPI } from '../../../apis/ApprovalAPICalls';
import ApprovalDraftLine from './ApprovalDraftLine';
import { callMemberDetailAPI } from '../../../apis/MemberAPICall';

function WorkRequest(props) {
    // 선언부 //
    // 날짜 관련
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // 디스패치
    const dispatch = useDispatch();
    // 유저 정보
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    // url 
    const { docCode } = props;
    const docNum = Number(docCode) + 1;
    /** useSelector */
    const memberName = useSelector(state => state.memberReducer.memberDetail);
    /** useState */
    // http 상태
    const [responseStatus, setResponseStatus] = useState(null);
    // 입력한 데이터를 저장
    const [form, setForm] = useState({
        docCode: docNum,
        appTitle: '',
        appDescript: '',
        appStartDate: todayString,
        appEndDate: todayString,
        appStatus: 'n',
        appOpen: 'n'

    });

    /* 에디터 설정 */
    // EditorState 사용하기 위해 useState로 설정
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);

        // 에디터 현재 콘텐츠 가져오기
        const contentState = editorState.getCurrentContent();
        // 콘텐츠를 일반 텍스트 문자열로 변환
        const plainText = contentState.getPlainText();
        // 태그가 포함된 텍스트를 출력하고 싶을 때
        // const rawContent = convertToRaw(contentState);
        setForm({
            ...form,
            "appDescript": plainText
        })
    };

    // 작성하기 버튼 클릭하면 바뀜
    const [isEdit, setIsEdit] = useState(false);



    useEffect(() => {
        dispatch(callMemberDetailAPI({ memberCode: memberCode }));
        //eslint-disable-next-line
    }, []);

    /** useEffect */
    useEffect(() => {
        if (docCode !== undefined) {
            setIsEdit(true);
        }
    }, [docCode]);

    /** 클릭, 변경 이벤트 처리 */
    const submitEvent = () => {

        // dispatch
        dispatch(callPostApprovalAPI({
            form: form
        }, docNum, memberCode, setResponseStatus))

    }

    const inputValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const backEvent = () => {
        window.history.back();
    }
    // console.log('memberName : ', memberName);
    return (
        <div className={workRequestCSS.detailBox}>
            {!isEdit ? <div></div> : <div className={workRequestCSS.nextStep}>
                <button onClick={submitEvent}> 제출 </button>
                <button onClick={backEvent}>목록</button>
            </div>}
            <div className={workRequestCSS.detailView}>
                <div className={workRequestCSS.buttonBox}>
                </div>
                <table className={workRequestCSS.detailtable}>
                    <thead>
                        <tr>
                            <th className={workRequestCSS.detaildocName} colSpan="2">
                                <h1>업무협조요청서</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={workRequestCSS.detailBody}>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                제목
                            </td>
                            <td className={workRequestCSS.description}>
                                {!isEdit ?
                                    <input type="text" readOnly className={workRequestCSS.inputBox} name="appTitle" /> :
                                    <input type="text" className={workRequestCSS.inputBox} name="appTitle" onChange={inputValue} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={workRequestCSS.description}>
                                {memberName?.memberDTO?.memberName}
                            </td>
                        </tr>
                        <tr>
                            <td className={workRequestCSS.detailTitle}>
                                기간
                            </td>
                            <td className={workRequestCSS.description}>
                                {!isEdit ? <input type="date" id="appStartDate" name='appStartDate' readOnly /> : <input type="date" id="appStartDate" name='appStartDate' onChange={inputValue} />}~
                                {!isEdit ? <input type="date" id="appEndDate" name='appEndDate' readOnly /> : <input type="date" id="appEndDate" name='appEndDate' onChange={inputValue} />}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className={workRequestCSS.detailDescript}>
                                <Editor
                                    editorState={editorState}
                                    // 에디터와 상호작용할때마다 새로운 에디터 상태로 상태를 업데이트
                                    onEditorStateChange={onEditorStateChange}
                                    readOnly={!isEdit}
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
                <div className={workRequestCSS.approvalLineBox}>
                    {responseStatus === 200 &&
                        <ApprovalDraftLine />
                    }
                </div>
            </div>

        </div>

    )
}

export default WorkRequest;