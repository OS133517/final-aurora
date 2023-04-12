import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { callSelectSearchListAboutNameAPI,
//         } from "../../apis/MailAPICall";

import MailWriteCSS from './MailWrite.module.css'
import Swal from "sweetalert2";

function MailWrite() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [attachments, setAttachments] = useState([]); // 첨부파일 
    const [mailData, setMailData] = useState({ // 입력값 

        recipient: '',
        cc: '',
        mailTitle: '',
        mailBody: '',
        fileList: []
    });

    // 보내기 
    const handleSubmit = (e) => {

        e.preventDefault();
        
        const formData = new FormData();
        formData.append("recipient", mailData.to);
        formData.append("cc", mailData.cc);
        formData.append("mailTitle", mailData.subject);
        formData.append("mailBody", mailData.body);

        attachments.forEach((attachment) => {
            
            formData.append("fileList", attachment);
        });
        // Submit mailData to the server

        // dispatch(callRegisterMailAPI({
        //     email : email
        // }))
        console.log(mailData);
    };

    // 입력값 핸들러 
    const handleChange = (e) => {

        const { name, value } = e.target;

        setMailData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 파일 첨부 핸들러 
    const handleFileInputChange = (e) => {

        const files = e.target.files;

        setAttachments([...attachments, ...files]);
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
                                            type="email"
                                            name="recipient"
                                            value={mailData.recipient}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="cc">참조</label></th>
                                    <td>
                                        <input
                                            type="email"
                                            name="cc"
                                            value={mailData.cc}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th><label htmlFor="mailTitle">제목</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            name="mailTitle"
                                            value={mailData.mailTitle}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부 파일</th>
                                    <td>
                                        <input
                                            type="file"
                                            name="fileList"
                                            multiple
                                            onChange={handleFileInputChange}
                                        />
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
                                            value={mailData.mailBody}
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