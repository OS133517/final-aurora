import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callMemberDetailAPI, callMemberModifyAPI } from '../../apis/HrmAPICall';
import { decodeJwt } from '../../utils/tokenUtils';
import HrmDetailCSS from './HrmModify.module.css';
import Swal from "sweetalert2";

export default function HrmModify() {
  const dispatch = useDispatch();
  const {memberCode} = useParams()
  const member = useSelector(state => state.hrmReducer.memberDetail);
  // const changeInfo  = useSelector(state => state.hrmReducer.memberModify);
  const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
  const memberInfo = member.memberDTO;
  console.log(loginMember.memberCode);
  console.log('member' , member);
  
  const [significant, setSignificant] = useState('');
  const [introduction, setIntroduction] = useState('');

  const onSignificantChangeHandler = (e) => {
    setSignificant(e.target.value);
  };
  
  const onIntroductionChangeHandler = (e) => {
    setIntroduction(e.target.value);
  };

  
  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "deptName") {
      const selectedDept = member.selectDept.find((dept) => dept.deptCode === value);
      setFormValues((prevValues) => ({
        ...prevValues,
        deptName: selectedDept.deptName,
        deptCode: selectedDept.deptCode,
      }));
    } else if (name === "jobName") {
      const selectedJob = member.selectJob.find((job) => job.jobCode === value);
      setFormValues((prevValues) => ({
        ...prevValues,
        jobName: selectedJob.jobName,
        jobCode: selectedJob.jobCode,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  
  console.log('loginMember' , loginMember);
  console.log('memberInfo', memberInfo);

  const searchAddress = () => { //주소 api
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setFormValues({ ...formValues, address: fullAddress });
      },
    }).open();
  };
 

  const [formValues, setFormValues] = useState({
    memberCode: '',
    memberId: '',
    memberName: '',
    phone: '',
    memberEmail: '',
    deptName: '',
    jobName: '',
    deptCode: '',
    jobCode: '',
    birthDay: '',
    address: '',
    memberHireDate: '',
    status: '',
    memberEndDate: '',
  });

  const handleUpdate = async () => {
    if (memberInfo) {
      const updatedMemberInfo = {
        ...memberInfo,
        ...formValues,
        introduction: introduction,
        significant: significant
      };

    try {
      await dispatch(
        callMemberModifyAPI({
          memberInfo: updatedMemberInfo,
          memberCode: formValues.memberCode,
          memberName: formValues.memberName,
          memberId: formValues.memberId,
          email: formValues.memberEmail,
          status: formValues.status,
          phone: formValues.phone,
          deptCode: formValues.deptCode,
          jobCode: formValues.jobCode,
          address: formValues.address,
          memberEndDate: formValues.memberEndDate,
          taskCode: memberInfo.taskName,
          memberHireDate: formValues.memberHireDate,
          significant: significant,
          introduction: introduction,
          fileCode: memberInfo.fileCode,
          team: memberInfo.team,
          gender: memberInfo.gender,
          birthDay: formValues.birthDay,
        }),
      );
      Swal.fire("수정되었습니다!", "", "success");
    } catch (error) {
      console.error("멤버 정보 수정에 실패했습니다:", error);
      Swal.fire("멤버 정보 수정에 실패했습니다!", "", "error");
    }
  } else {
    console.error("멤버 정보가 정의되지 않았습니다");
  }
};
  

  useEffect(() => {

    dispatch(callMemberDetailAPI({
      memberCode : memberCode
    }));
  },[memberCode , dispatch]);
  

  useEffect(() => {
    if (memberInfo) {
      setFormValues({
        memberCode: memberInfo?.memberCode || '',
        memberId: memberInfo?.memberId || '',
        memberName: memberInfo?.memberName || '',
        phone: memberInfo?.phone || '',
        memberEmail: memberInfo?.memberEmail || '',
        deptName: memberInfo?.deptName || '',
        jobName: memberInfo?.jobName || '',
        deptCode: memberInfo?.deptCode || '',
        jobCode: memberInfo?.jobCode || '',
        birthDay: memberInfo?.birthDay || '',
        address: memberInfo?.address || '',
        memberHireDate: memberInfo?.memberHireDate || '',
        status: memberInfo?.status || '',
        
        memberEndDate: memberInfo?.memberEndDate || '',
      });
      setSignificant(memberInfo.significant || '');
    }
  }, [memberInfo , setFormValues]);



  return (
      <>
    <div className={HrmDetailCSS.allContainer}>
    <div className={HrmDetailCSS.hrmHeader}>
                <span>인사 수정</span>
        </div>
      <div className={HrmDetailCSS.container}>
        <div>
          <div className={HrmDetailCSS.inputWrapper}>
            <span className={HrmDetailCSS.inputLabel}>사원번호</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="사원번호"
              readOnly
              value={memberCode}
            />
            <span className={HrmDetailCSS.inputLabel}>아이디</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="memberId"
              onChange={onInputChange}
              value={formValues.memberId}
            />
          </div>
          <div className={HrmDetailCSS.inputWrapper}>
            <span className={HrmDetailCSS.inputLabel}>성명</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="memberName"
              onChange={onInputChange}
              value={formValues.memberName}
            />
            <span className={HrmDetailCSS.inputLabel}>핸드폰</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="phone"
              onChange={onInputChange}
              value={formValues.phone}
            />
          </div>
          <div className={HrmDetailCSS.inputWrapper}>
            <span className={HrmDetailCSS.inputLabel}>이메일</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="memberEmail"
              onChange={onInputChange}
              readOnly
              value={formValues.memberEmail}
            />
            <span className={HrmDetailCSS.inputLabel}>부서</span>
            <select
              className={HrmDetailCSS.inputBox}
              type="text"
              name="deptName"
              onChange={onInputChange}
              value={formValues.deptCode}
            >
               {member.selectDept?.map((dept) => (
            <option key={dept.deptCode} value={dept.deptCode}>
              {dept.deptName}
            </option>
          ))}
            </select>
          </div>
          <div className={HrmDetailCSS.inputWrapper}>
            <span className={HrmDetailCSS.inputLabel}>직급</span>
            <select
              className={HrmDetailCSS.inputBox}
              name="jobName"
              onChange={onInputChange}
              value={formValues.jobCode}
             >
              {member.selectJob?.map((job) => (
            <option key={job.jobCode} value={job.jobCode}>
              {job.jobName}
            </option>
          ))}
        </select>
        <span className={HrmDetailCSS.inputLabel}>주소</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="address"
              onChange={onInputChange}
              value={formValues.address}
            />
              <button type="button" onClick={searchAddress}>주소 검색</button>
        
      
     
          </div>
          <div className={HrmDetailCSS.inputWrapper}>
          <span className={HrmDetailCSS.inputLabel}>생년월일</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="text"
              name="birthDay"
              onChange={onInputChange}
              readOnly
              value={formValues.birthDay}
            />
     
            <span className={HrmDetailCSS.inputLabel}>입사일</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="date"
              name="memberHireDate"
              onChange={onInputChange}
              value={formValues.memberHireDate}
            />
          </div>
          <div className={HrmDetailCSS.inputWrapper}>
            <span className={HrmDetailCSS.inputLabel}>재직상태</span>
            <select
              className={HrmDetailCSS.inputBox}
              type="text"
              name="status"
              onChange={onInputChange}
              value={formValues.status}
            >
              <option value="재직">재직</option>
              <option value="퇴직">퇴직</option>
              </select>
            <span className={HrmDetailCSS.inputLabel}>퇴사일</span>
            <input
              className={HrmDetailCSS.inputBox}
              type="date"
              name="memberEndDate"
              onChange={onInputChange}
              value={formValues.memberEndDate}
            />
          </div>
        </div>
      </div>
      

      <div className={HrmDetailCSS.textContainer}>
     
      <div className={HrmDetailCSS.textareaContainer}>
      <span>기타정보</span>
    <textarea
      name="significant"
      className={HrmDetailCSS.textarea}
      value={significant}
       onChange={onSignificantChangeHandler}
    />
       
      </div>
      <div className={HrmDetailCSS.textareaContainer}>
      <span>자기소개</span>
    <textarea
      className={HrmDetailCSS.textarea}
       value={introduction}
      onChange={onIntroductionChangeHandler}
      readOnly={loginMember.memberCode == memberCode ? false :true}
    />
    <div>
      

       <button type="button" onClick={handleUpdate}>수정</button>
      
      </div>
      </div>
      </div>
      </div>
      </>
    );
}

