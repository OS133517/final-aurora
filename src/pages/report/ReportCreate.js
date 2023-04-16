import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSelectSearchListAboutNameAPI,
            callRegisterReportAPI,
            callUpdateReportAPI,
            callSelectReportDetailAPI
        } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import ReportCreateCSS from "./ReportCreate.module.css";
import Swal from "sweetalert2";

function ReportCreate() {

    const location = useLocation();
    const isEdit = location?.state.isEdit;
    const reportCode = location?.state.reportCode;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const [reportDTO, setReportDTO]  = useState({
        
        memberCode: accessToken.memberCode || "",
        reportTitle : "",
        reportInfo: "",
        reportType : "Routine",
        reportCycle: "1"
    });
    const [fileList, setFileList] = useState([]);
    const [serverFileList, setServerFileList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [cycleType, setCycleType] = useState("monthly");
    
    // 수신자 
    const [recipientInputValue, setRecipientInputValue] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [matchingRecipientMembers, setMatchingRecipientMembers] = useState([]);
    
    const matchingMembers = useSelector(state => state.reportReducer.matchingMembers);
    // console.log("matchingMembers : " + JSON.stringify(matchingMembers));
    const reportDetail = useSelector(state => state.reportReducer.reportDetail);
    // console.log("reportDetail : " + JSON.stringify(reportDetail));
    // const originalReportDTO = reportDetail && reportDetail.reportDTO;
    // console.log("originalReportDTO : " + JSON.stringify(originalReportDTO));
    const recipient = reportDetail?.reportDTO?.memberDTO;
    // console.log("recipient : " + JSON.stringify(recipient));
    const originalFileList = reportDetail?.fileList;
    // console.log("originalFileList : " + JSON.stringify(originalFileList));

    const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // 수정모드일시 값 불러옴 
    useEffect(() => {
        
        if(isEdit) {

            dispatch(callSelectReportDetailAPI({

                reportCode: reportCode
            }));
        }
    }, []);

    // 수정모드일때 값 세팅 
    useEffect(() => {

        if(!isEdit) {

            setReportDTO({
                memberCode: accessToken.memberCode || "",
                reportTitle: "",
                reportInfo: "",
                reportType: "Routine",
                reportCycle: "1"
            });
            setFileList([]);
            setInputValue("");
            setSelectedMembers([]);
            setMemberList([]);
            setCycleType("monthly");
            setRecipientInputValue("");
            setSelectedRecipient(null);
            setMatchingRecipientMembers([]);
        }
        if(isEdit && reportDetail) {

            setReportDTO({...reportDTO, ...reportDetail.reportDTO});
            setSelectedMembers(reportDetail?.memberList || []);
            setCycleType((!isNumeric(reportDetail?.reportDTO?.reportCycle)) ? "weekly" : "monthly");
            // console.log("!isNumeric(reportDTO.reportCycle) : " + JSON.stringify(!isNumeric(reportDTO.reportCycle)));
            if(reportDetail?.reportDTO?.reportType === 'Casual') {

                setServerFileList(originalFileList || []);
                setSelectedRecipient(recipient || null);
            }
        }
    }, [reportDetail, isEdit]);

    useEffect(() => {

        if(inputValue) {

            dispatch(callSelectSearchListAboutNameAPI({
                
                name : inputValue
            }));
        }
        if(recipientInputValue) {

            dispatch(callSelectSearchListAboutNameAPI({
                name : recipientInputValue
            }));
        }
    }, [inputValue, recipientInputValue]);

    // 보고자 선택된 멤버 변경시 
    useEffect(() => {
        
        setMemberList(selectedMembers && selectedMembers.map((member) => member.memberCode));
    }, [selectedMembers]);

    // 수신자 설정 
    useEffect(() => {

        if (recipientInputValue === matchingRecipientMembers[0]?.memberName) {
            
            setSelectedRecipient(matchingRecipientMembers[0]);
            setRecipientInputValue('');
        }
    }, [matchingRecipientMembers]);
    
    // 수신자 이름으로 검색
    const handleRecipientInputChange = (e) => {

        const newInputValue = e.target.value;
        setRecipientInputValue(newInputValue);
        // console.log("Recipient Input Value : ", newInputValue); // 입력값 로그
    
        const matchedMembers = matchingMembers.filter((member) =>

            member.memberName.toLowerCase().includes(newInputValue.toLowerCase())
        );
        setMatchingRecipientMembers(matchedMembers);

        const selectedMember = matchingMembers.find(
          (member) => member.memberName === newInputValue
        );
      
        if (selectedMember) {

          handleSelectRecipient(selectedMember);
        }
    };

    // 보고자 설정 취소 
    const removeMember = (memberToRemove) => {

        setSelectedMembers(selectedMembers.filter(member => member.memberCode !== memberToRemove.memberCode));
    };

    // 멤버 선택 
    const handleSelectMember = (selectedMember) => {

        const isAlreadySelected = selectedMembers.some(
            (member) => member.memberCode === selectedMember.memberCode
        );
        if (isAlreadySelected) {

            warningAlert("이미 추가된 멤버입니다.");
        } else if(accessToken.memberCode === selectedMember.memberCode) {

            warningAlert("자신을 선택할 수 없습니다.");
        } else {

            setSelectedMembers([...selectedMembers, selectedMember]);
        }
        setInputValue("");
    };
    
    // 수신자 선택
    const handleSelectRecipient = (selectedMember) => {

        if (accessToken.memberCode === selectedMember.memberCode) {

            warningAlert("자신을 수신자로 선택할 수 없습니다.");
        } else {

            setSelectedRecipient(selectedMember);
            setReportDTO((prevReportDTO) => ({
                ...prevReportDTO,
                memberCode: selectedMember.memberCode,
            }));
        }
        setRecipientInputValue("");
        setMatchingRecipientMembers([]);
    };
    
    // 멤버 이름으로 검색 
    const handleInputChange = (e) => {
        
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
      
        const selectedMember = matchingMembers && matchingMembers.find(
            (member) => member.memberName === newInputValue
        );
      
        if (selectedMember) {

            handleSelectMember(selectedMember);
        }
    };

    // 작성 내용 변경시  
    const onChangeHandler = (e) => {

        setReportDTO({

            ...reportDTO,
            [e.target.name] : e.target.value
        });
    }

    // 보고 주기 타입 변경 핸들러 
    const handleCycleTypeChange = (e) => {

        const newCycleType = e.target.value;

        setCycleType(newCycleType);
      
        // 날짜 또는 요일 목록의 첫 번째 항목으로 reportCycle을 설정합니다.
        if (newCycleType === "monthly") {

          setReportDTO({ ...reportDTO, reportCycle: daysOfMonth[0] });
        } else {

          setReportDTO({ ...reportDTO, reportCycle: daysOfWeek[0] });
        }
    };

    // 파일 목록 변경 
    const onFileChange = (e) => {

        setFileList([...fileList, ...Array.from(e.target.files)]);
    };
    // 파일 삭제 
    const removeFile = (index) => {

        setFileList(fileList.filter((_, i) => i !== index));
    };
    // 기존 파일중 삭제 
    const removeServerFile = (index) => {

        const newServerFileList = [...serverFileList];

        newServerFileList.splice(index, 1);
        setServerFileList(newServerFileList);
    };
    // 파일 전체 삭제 
    const removeAllFiles = () => {

        setFileList([]);
        setServerFileList([]);
    };
    
    // 입력 검사 
    const validateFormData = () => {

        const { reportTitle, reportInfo, reportType, reportCycle } = reportDTO;

        const validationMessages = [
            
            { condition: !reportTitle, message: "보고 제목을 작성해주세요." },
            { condition: !reportInfo, message: "보고 설명을 작성해주세요." },
            { condition: !reportType, message: "보고 유형을 선택해주세요." },
            { condition: !reportCycle, message: "보고 주기를 선택해주세요." },
            {
                condition: reportDTO?.reportType == "Routine" && (!memberList || memberList.length === 0),
                message: "보고자 목록이 비어있습니다."
            },
            {
                condition: reportDTO?.reportType == "Casual" && selectedRecipient == null,
                message: "수신자 목록이 비어있습니다."
            },
        ];

        for (const validation of validationMessages) {

            if (validation.condition) {

                warningAlert(validation.message);

                return false;
            }
        }
        return true;
    };
    
    // 작성 및 수정 
    const onClickSubmit = async (e) => {

        // 작성버튼 클릭시 페이지 새로고침 방지
        e.preventDefault();

        if (!validateFormData()) {
            
            return;
        } else {
            const formData = new FormData();

            if(reportDTO?.reportType == 'Routine') {

                formData.append("reportDTO", JSON.stringify(reportDTO));
                formData.append("memberList", JSON.stringify(memberList));
            } else {

                formData.append("reportDTO", JSON.stringify(reportDTO));
                formData.append("memberList", JSON.stringify([accessToken.memberCode]));

                if(fileList && fileList.length > 0) {

                    fileList.forEach((file) => formData.append("fileList", file));
                }
            }
            if(!isEdit) {

                // 보고 작성 
                dispatch(callRegisterReportAPI({
                    formData
                }))
                successAlert('보고서를 성공적으로 작성했습니다.');
                navigate('/aurora/reports/summary', { replace: true });
                // window.location.reload();
        
                console.log('reportDTO : ', reportDTO);
                console.log('memberList : ', memberList);
                console.log('fileList : ', fileList);
            } else {

                const preservedFileCodeList = serverFileList.map(file => file.fileCode);
                formData.append("preservedFileCodeList", JSON.stringify(preservedFileCodeList))
                
                // 보고 수정 
                dispatch(callUpdateReportAPI({

                    formData
                }))
                successAlert("보고서를 성공적으로 수정했습니다."); 
                
                if (reportDTO.reportType === 'Routine') {
                    navigate(`/aurora/reports/${reportDTO.reportCode}/rounds`);
                } else if (reportDTO.reportType === 'Casual') {
                    navigate(`/aurora/reports/casuals/${reportDTO.reportCode}`);
                }
            }

        }
    };

    // 뒤로가기 
    const handleCancel = () => {

        navigate(-1);
        // navigate('/reports/summary', { replace: true });
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

    // 숫자인지 확인 
    function isNumeric(str) {

        return /^\d+$/.test(str);
        // const result = /^\d+$/.test(str);
        // console.log("Input:", str, "Result:", result);
        // return result;
    }

    return (
        <>
            <div className={ReportCreateCSS.reportCreateContainer}>
                <div className={ReportCreateCSS.reportCreateHeader}>
                    {isEdit? <span>보고서 수정</span> : <span>보고서 작성</span>}
                    {/* 보고서 작성 */}
                </div>
                <div className={ReportCreateCSS.reportCreateDiv}>
                    <table className={ReportCreateCSS.formTable}>
                        <tbody>
                            {/* 제목 */}
                            <tr>
                                <th>
                                    제목
                                </th>
                                <td>
                                    <input 
                                        className={`${ReportCreateCSS.underBarInput}`}
                                        type="text" 
                                        name="reportTitle" 
                                        value={reportDTO?.reportTitle} 
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr><td><br></br></td></tr>
                            {/* 설명 */}
                            <tr>
                                <th>
                                    설명
                                </th>
                                <td>
                                    <textarea 
                                        className={ReportCreateCSS.boxInput} 
                                        type="text" 
                                        name="reportInfo" 
                                        value={reportDTO?.reportInfo} 
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr><td><br></br></td></tr>
                            {/* 유형 선택 */}
                            <tr>
                                <th>
                                    유형
                                </th>
                                <td>
                                    <label 
                                        htmlFor="Routine"
                                        className={ReportCreateCSS.radioContainer}
                                    >
                                        &nbsp;정기
                                        <input 
                                            className={ReportCreateCSS.radio}
                                            id='Routine' 
                                            type='radio' 
                                            name='reportType' 
                                            value='Routine' 
                                            onChange={onChangeHandler} 
                                            checked={reportDTO?.reportType === "Routine"}
                                            disabled={isEdit} // 수정 모드일 때 라디오 버튼 비활성화
                                        /> 
                                        <span className={ReportCreateCSS.radioVisual}></span>
                                    </label>
                                    <label 
                                        htmlFor="Casual"
                                        className={ReportCreateCSS.radioContainer}
                                    >
                                    &nbsp;비정기
                                        <input 
                                            className={ReportCreateCSS.radio}
                                            id='Casual' 
                                            type='radio' 
                                            name='reportType' 
                                            value='Casual' 
                                            onChange={onChangeHandler}
                                            checked={reportDTO?.reportType === "Casual"}
                                            disabled={isEdit} // 수정 모드일 때 라디오 버튼 비활성화
                                        /> 
                                        <span className={ReportCreateCSS.radioVisual}></span>
                                    </label>
                                </td>
                            </tr>
                            <tr><td><br></br></td></tr>
                            {/* 보고 주기 */}
                            {reportDTO?.reportType === 'Routine' && 
                                <>
                                    <tr>
                                        <th>보고 주기</th>
                                        <td>
                                            <div className={ReportCreateCSS.selectContainer}>
                                                <select 
                                                    id="cycleType" 
                                                    value={cycleType} 
                                                    onChange={handleCycleTypeChange}
                                                    className={ReportCreateCSS.select}
                                                >
                                                    <option value="monthly">월간</option>
                                                    <option value="weekly">주간</option>
                                                </select>
                                                <span className={ReportCreateCSS.selectArrow}>&#9660;</span>
                                            </div>
                                            <div className={ReportCreateCSS.selectContainer}>
                                                <select 
                                                    name="reportCycle" 
                                                    id="cycleValue" 
                                                    value={reportDTO?.reportCycle} 
                                                    onChange={onChangeHandler}
                                                    className={ReportCreateCSS.select}
                                                >
                                                    {cycleType === "monthly"
                                                        ? daysOfMonth.map((day) => (
                                                            <option key={day} value={day}>
                                                                {day}
                                                            </option>
                                                            ))
                                                        : daysOfWeek.map((day) => (
                                                            <option key={day} value={day}>
                                                                {day}
                                                            </option>
                                                            ))
                                                    }
                                                </select>
                                                <span className={ReportCreateCSS.selectArrow}>&#9660;</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr><td><br></br></td></tr>
                                    {/* 보고자 선택 */}
                                    <tr>
                                        <th>보고자</th>
                                        <td>
                                            <input
                                                className={ReportCreateCSS.underBarInput}
                                                type="text"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                list="members"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <datalist id="members">
                                                {matchingMembers && matchingMembers.map((member) => (
                                                    <option 
                                                        key={member.memberCode} 
                                                        value={member.memberName}
                                                        label={`${member.deptName} ${member.jobName}`}
                                                    />
                                                ))}
                                            </datalist>
                                            <div>
                                                {selectedMembers.map((member) => (
                                                    <div key={member.memberCode} style={{ display: "flex", alignItems: "center" }}>
                                                        <p>{member.memberName}</p>
                                                        <button
                                                            className={ReportCreateCSS.deleteButton}
                                                            onClick={() => removeMember(member)}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr><td><br></br></td></tr>
                                </>
                            }
                            {reportDTO?.reportType === 'Casual' && 
                                <>
                                    {/* 수신자 선택 */}
                                    <tr>
                                        <th>수신자</th>
                                        <td>
                                        <input
                                            className={ReportCreateCSS.underBarInput}
                                            type="text"
                                            value={recipientInputValue}
                                            onChange={handleRecipientInputChange}
                                            list="recipients"
                                        />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                        <datalist id="recipients">
                                            {matchingMembers && matchingMembers.map((member) => (
                                                <option 
                                                    key={member.memberCode} 
                                                    value={member.memberName}
                                                    label={`${member.deptName} ${member.jobName}`}
                                                />
                                            ))}
                                        </datalist>
                                        <div>
                                            {selectedRecipient && (
                                            <div
                                                key={selectedRecipient.memberCode}
                                                style={{ display: "flex", alignItems: "center" }}
                                            >
                                                <p>{selectedRecipient.memberName}</p>
                                                <button
                                                    className={ReportCreateCSS.deleteButton}
                                                    onClick={() => setSelectedRecipient(null)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                        </td>
                                    </tr>
                                    <tr><td><br></br></td></tr>
                                    {/* 파일 등록 */}
                                    <tr>
                                        <th>파일</th>
                                        <td>
                                            {/* <input 
                                                type="file" 
                                                onChange={onFileChange} 
                                                multiple
                                            /> */}
                                            <label htmlFor="file-upload" className={ReportCreateCSS.fileLabel}>
                                                파일 첨부
                                            </label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                onChange={onFileChange}
                                                multiple
                                                className={ReportCreateCSS.fileInput}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div className={ReportCreateCSS.fileTableContainer}>
                                                <table className={ReportCreateCSS.fileTable}>
                                                    <thead>
                                                        <tr>
                                                            <td>
                                                                <button 
                                                                    className={ReportCreateCSS.removeFileButton} 
                                                                    onClick={removeAllFiles}
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                            <td>파일 제목</td>
                                                            <td>용량</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {serverFileList.map((file, index) => (
                                                            <tr key={file.fileCode}>
                                                                <td>
                                                                    <button 
                                                                        className={ReportCreateCSS.removeFileButton}
                                                                        onClick={() => removeServerFile(index)}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </td>
                                                                <td>{file.fileOriginName}</td>
                                                                <td>{(file.fileSize)} </td>
                                                            </tr>
                                                        ))
                                                        }
                                                        {fileList.map((file, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <button 
                                                                        className={ReportCreateCSS.removeFileButton}
                                                                        onClick={() => removeFile(index)}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </td>
                                                                <td>{file.name}</td>
                                                                <td>{(file.size / 1024).toFixed(2)} KB</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            }
                            <tr>
                                <td></td>
                            </tr>
                            <tr><td><br></br></td></tr>
                        </tbody>
                    </table>
                    <div className={ReportCreateCSS.buttonDiv}>
                        <button 
                            className={ReportCreateCSS.greentButton}
                            onClick={onClickSubmit}
                        >
                            보고 작성
                        </button>
                        <button 
                            className={ReportCreateCSS.greentButton}
                            onClick={handleCancel}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportCreate;