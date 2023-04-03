import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSelectSearchListAboutNameAPI,
            callRegisterReportAPI } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';

import ReportCreateCSS from "./ReportCreate.module.css";

function ReportCreate() {

    const dispatch = useDispatch();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const navigate = useNavigate();

    const [reportDTO, setReportDTO]  = useState({
        reportTitle : "",
        reportInfo: "",
        reportType : "Routine",
        reportCycle: "1"
    });
    const [focused, setFocused] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [cycleType, setCycleType] = useState("monthly");
    const matchingMembers = useSelector(state => state.reportReducer.matchingMembers);
    console.log("matchingMembers : " + JSON.stringify(matchingMembers));
    console.log("Matching members:", matchingMembers);

    const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {

        if(inputValue) {
            dispatch(callSelectSearchListAboutNameAPI({
                name : inputValue
            }));
    }}, [inputValue]);

    useEffect(() => {
        
        setMemberList(selectedMembers.map((member) => member.memberCode));
    }, [selectedMembers]);

    const removeMember = (memberToRemove) => {

        setSelectedMembers(selectedMembers.filter(member => member.memberCode !== memberToRemove.memberCode));
    };

    const onFileChange = (e) => {

        setFileList([...fileList, ...Array.from(e.target.files)]);
    };

    const removeFile = (index) => {

        setFileList(fileList.filter((_, i) => i !== index));
    };

    const removeAllFiles = () => {

        setFileList([]);
    };

    const handleSelectMember = (selectedMember) => {

        const isAlreadySelected = selectedMembers.some(
          (member) => member.memberCode === selectedMember.memberCode
        );
        if (isAlreadySelected) {
            alert("이미 추가된 멤버입니다.");
        } else if(accessToken.memberCode === selectedMember.memberCode) {
            alert("자신을 선택할 수 없습니다.");
        } else {
            setSelectedMembers([...selectedMembers, selectedMember]);
        }
        setInputValue("");
    };
    
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
    
    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
    };

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

    // 입력 검사 
    const validateFormData = () => {

        const { reportTitle, reportInfo, reportType, reportCycle } = reportDTO;
      
        if (!reportTitle) {
          alert("보고 제목을 작성해주세요.");
          return false;
        }
        if (!reportInfo) {
          alert("보고 설명을 작성해주세요.");
          return false;
        }
        if (!reportType) {
          alert("보고 유형을 선택해주세요.");
          return false;
        }
        if (!reportCycle) {
          alert("보고 주기를 선택해주세요.");
          return false;
        }
        if (!memberList || memberList.length === 0) {
            alert("보고자 목록이 비어있습니다.");
            return false;
        }
        return true;
    };
    
    // 작성 
    const onClickSubmit = async (e) => {

        // 작성버튼 클릭시 페이지 새로고침 방지
        e.preventDefault();

        if (!validateFormData()) {
            return;
        } else {
            const formData = new FormData();
            formData.append("reportDTO", JSON.stringify(reportDTO));
            formData.append("memberList", JSON.stringify(memberList));
    
            if(fileList && fileList.length > 0) {
                // formData.append("fileList", fileList);
                fileList.forEach((file) => formData.append("fileList", file));
            }
    
            dispatch(callRegisterReportAPI({
                formData
            }))
            alert('보고서를 성공적으로 작성했습니다.');
            navigate('/aurora/reports/summary', { replace: true });
            // window.location.reload();
    
            console.log('reportDTO', reportDTO);
            console.log('memberList', memberList);
            console.log('fileList', fileList);
        }
    };

    const handleCancel = () => {
        navigate('/reports/summary', { replace: true });
    };

    return (
        <>
            <div className={ReportCreateCSS.reportCreateContainer}>
                <div className={ReportCreateCSS.reportCreateHeader}>
                    보고서 작성
                </div>
                <div className={ReportCreateCSS.reportCreateDiv}>
                    <table className={ReportCreateCSS.formTable}>
                        <tbody>
                            <tr>
                                <th>
                                    제목
                                </th>
                                <td>
                                    <input 
                                        className={`${ReportCreateCSS.underBarInput} ${focused? 'highlighted' : ''}`}
                                        type="text" 
                                        name="reportTitle" 
                                        value={reportDTO.reportTitle} 
                                        onChange={onChangeHandler}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </td>
                            </tr>
                            <br></br>
                            <tr>
                                <th>
                                    설명
                                </th>
                                <td>
                                    <textarea 
                                        className={ReportCreateCSS.boxInput} 
                                        type="text" 
                                        name="reportInfo" 
                                        value={reportDTO.reportInfo} 
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <br></br>
                            <tr>
                                <th>
                                    보고자
                                </th>
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
                                            <option key={member.memberCode} value={member.memberName}>
                                                {member.memberName}
                                            </option>
                                        ))}
                                    </datalist>
                                    <div>
                                        {selectedMembers.map((member) => (
                                            <div key={member.memberCode} style={{ display: "flex", alignItems: "center" }}>
                                                <p>{member.memberName}</p>
                                                <button
                                                    style={{
                                                        marginLeft: "5px",
                                                        background: "red",
                                                        borderRadius: "50%",
                                                        width: "20px",
                                                        height: "20px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: "0",
                                                        color: "white",
                                                        fontSize: "14px",
                                                        border: "none",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => removeMember(member)}
                                                    >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <br></br>
                            <tr>
                                <th>
                                    유형
                                </th>
                                <td>
                                    <input 
                                        id='Routine' 
                                        type='radio' 
                                        name='reportType' 
                                        value='Routine' 
                                        onChange={onChangeHandler} 
                                        checked={reportDTO.reportType === "Routine"}
                                    /> 
                                    <label htmlFor="Routine">정기</label>
                                    <input 
                                        id='Casual' 
                                        type='radio' 
                                        name='reportType' 
                                        value='Casual' 
                                        onChange={onChangeHandler}
                                        checked={reportDTO.reportType === "Casual"}
                                    /> 
                                    <label htmlFor="Casual">비정기</label>
                                </td>
                            </tr>
                            {reportDTO.reportType === 'Routine' && 
                                <>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <select id="cycleType" value={cycleType} onChange={handleCycleTypeChange}>
                                                <option value="monthly">월간</option>
                                                <option value="weekly">주간</option>
                                            </select>
                                            <select name="reportCycle" id="cycleValue" value={reportDTO.reportCycle} onChange={onChangeHandler}>
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
                                                    ))}
                                            </select>
                                        </td>
                                    </tr>
                                </>
                            }
                            {reportDTO.reportType === 'Casual' && 
                                <>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input 
                                                type="file" 
                                                onChange={onFileChange} 
                                                multiple
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
                                                                <button onClick={removeAllFiles}>X</button>
                                                            </td>
                                                            <td>파일 제목</td>
                                                            <td>용량</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fileList.map((file, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <button onClick={() => removeFile(index)}>X</button>
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
                            <br></br>
                        </tbody>
                    </table>
                    <div className={ReportCreateCSS.buttonDiv}>
                        <button onClick={onClickSubmit}>보고서 등록</button>
                        <button onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportCreate;