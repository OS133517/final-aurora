import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { callSendMailAPI,
        } from "../../apis/MailAPICall";

import MailWriteCSS from './MailWrite.module.css'
import Swal from "sweetalert2";

function MailWrite({props}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const senderEmail = queryParams.get('senderEmail');
    
    const [attachments, setAttachments] = useState([]); // 첨부파일 
    const [mailUpdated, setMailUpdated] = useState(false); // 메일 리렌더링 
    const [mailDTO, setMailDTO] = useState({ // 입력값 

        // recipient: '',
        recipient: senderEmail || '',
        cc: '',
        mailTitle: '',
        mailBody: '',
        fileList: []
    });

    // 검증 
    const validateMailData = () => {

        const { recipient, cc, mailTitle, mailBody } = mailDTO;
    
        const validationMessages = [

            { condition: !recipient, message: "수신자 이메일 주소를 입력해주세요." },
            { condition: recipient && !isEmailValid(recipient), message: "유효하지 않은 수신자 이메일 주소입니다." },
            // { condition: cc && !isEmailValid(cc), message: "유효하지 않은 참조 이메일 주소입니다." },
            { condition: !mailTitle || mailTitle.trim() === "", message: "메일 제목을 입력해주세요." },
            { condition: !mailBody || mailBody.trim() === "", message: "메일 본문을 입력해주세요." },
        ];
    
        for (const validation of validationMessages) {

            if (validation.condition) {

                warningAlert(validation.message);
                
                return false;
            }
        }
        return true;
    };

    // 리렌더링 
    useEffect(() => {

        setMailUpdated(false)
    }, [mailUpdated]);

    // 답장시 받는 이메일 설정 
    // useEffect(() => {

    //     if (senderEmail) {

    //         alert(senderEmail);
    //     }
    // }, [senderEmail]);
    useEffect(() => {
        setMailDTO((prev) => ({
            ...prev,
            recipient: senderEmail || '',
        }));
    }, [senderEmail]);

    // 메일 전송 
    const handleSubmit = (e) => {

        e.preventDefault();
                
        if (!validateMailData()) {

            return;
        }
        const formData = new FormData();
        formData.append("mailDTO", JSON.stringify(mailDTO));

        attachments.forEach((attachment) => {
            
            formData.append("fileList", attachment);
        });
        dispatch(callSendMailAPI({

            formData : formData
        }))
        successAlert("메일을 전송했습니다.")
        navigate("/aurora/mails")
    };

    // 입력값 핸들러 
    const handleChange = (e) => {

        const { name, value } = e.target;

        setMailDTO((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 파일 목록 변경
    const handleFileInputChange = (e) => {

        setAttachments([...attachments, ...Array.from(e.target.files)]);
        setMailUpdated(!mailUpdated)
    };

    // 파일 삭제
    const removeFile = (index) => {

        setAttachments(attachments.filter((_, i) => i !== index));
        setMailUpdated(!mailUpdated)
    };

    // 파일 전체 삭제
    const removeAllFiles = () => {

        setAttachments([]);
        setMailUpdated(!mailUpdated)
    };

    // 성공 알림 
    const successAlert = (message) => {

        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
        });
    };

    // 경고 실패 알림 
    const warningAlert = (message) => {

        Swal.fire({
            icon: 'warning',
            title: '경고',
            text: message,
            confirmButtonText: '확인',
        });
    };

    // 이메일 입력값 검증 
    const isEmailValid = (email) => {

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

        return emailRegex.test(email);
    };

    return (
        <>
            <div className={MailWriteCSS.container}>
                <div className={MailWriteCSS.titleHeader}>
                    <span>메일 작성</span>
                </div>
                <div className={MailWriteCSS.writeForm}>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <button 
                                            className={MailWriteCSS.greenButton}
                                            type='submit'
                                        >
                                            보내기
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className={MailWriteCSS.greenButton}
                                            onClick={() => navigate("/aurora/mails")}
                                        >
                                            목록으로
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="recipient">받는 사람</label></th>
                                    <td>
                                        <input
                                            className={MailWriteCSS.boxInput}
                                            type="email"
                                            name="recipient"
                                            value={mailDTO.recipient}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cc">숨은 참조</label></th>
                                    <td>
                                        <input
                                            className={MailWriteCSS.boxInput}
                                            type="email"
                                            name="cc"
                                            value={mailDTO.cc}
                                            onChange={handleChange}
                                            placeholder="test1@example.com,test2@example.com"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="mailTitle">제목</label></th>
                                    <td>
                                        <input
                                            className={MailWriteCSS.boxInput}
                                            type="text"
                                            name="mailTitle"
                                            value={mailDTO.mailTitle}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부 파일</th>
                                    <td>
                                        <div className={MailWriteCSS.fileTableContainer}>
                                            <input
                                                type="file"
                                                name="fileList"
                                                multiple
                                                onChange={handleFileInputChange}
                                            />
                                            <br></br>
                                            <br></br>
                                            <table className={MailWriteCSS.fileTable}>
                                                <thead>
                                                    <tr>
                                                        <td className={MailWriteCSS.xColumn}>
                                                            <button onClick={removeAllFiles}>X</button>
                                                        </td>
                                                        <td>파일 제목</td>
                                                        <td className={MailWriteCSS.sizeColumn}>용량</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {attachments.map((file, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <button onClick={() => removeFile(index)}>X</button>
                                                            </td>
                                                            <td>{file.name}</td>
                                                            <td className={MailWriteCSS.sizeColumn}>{(file.size / 1024).toFixed(2)} KB</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="mailBody">내용</label></th>
                                    <td>
                                        <textarea
                                            className={MailWriteCSS.mailBody}
                                            name="mailBody"
                                            rows="10"
                                            cols="30"
                                            value={mailDTO.mailBody}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MailWrite;