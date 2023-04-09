import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { decodeJwt } from '../../utils/tokenUtils';
import HrmDetailCSS from './HrmDetail.module.css';
import { callMemberDetailAPI,
         callMemberModifyAPI 
        } from '../../apis/HrmAPICall';

export default function HrmDetail() {
    const dispatch = useDispatch();
    const {memberCode} = useParams()
    const member = useSelector(state => state.hrmReducer.memberDetail);
    const changeInfo  = useSelector(state => state.hrmReducer.memberModify);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberInfo = member.memberDTO;
    console.log(loginMember.memberCode);
    console.log('member' , member);

    const [textarea, setTextarea] =useState('')

    const onChangeHandler = (e) => {

      setTextarea(e.target.value);

    }
    
    console.log('loginMember' , loginMember);
    console.log('memberInfo', memberInfo);
    //const [memberValue, setmemberValue] = useState('');

    // console.log(memberCode);

    useEffect(() => {

      dispatch(callMemberDetailAPI({
        memberCode : memberCode
      }));
    },[memberCode , dispatch]);

    useEffect(() => {
      
      setTextarea(memberInfo?.introduction);
    }, [memberInfo]);


   

    const handleUpdate = () => {
      if (memberInfo && memberInfo.memberName) {
        const updatedMemberInfo = {
          ...memberInfo,
          introduction: textarea,
        };

        dispatch(
          callMemberModifyAPI({
            memberInfo : updatedMemberInfo,
            memberCode: memberCode,
            memberName: memberInfo.memberName,
            memberId: memberInfo.memberId,
            email: memberInfo.memberEmail,
            deptCode: memberInfo.deptCode,
            jobCode: memberInfo.jobCode,
            status: memberInfo.status,
            phone: memberInfo.phone,
            address: memberInfo.address,
            memberEndDate: memberInfo.memberEndDate,
            taskCode: memberInfo.taskName,
            memberHireDate: memberInfo.memberHireDate,
            signficant: memberInfo.signficant,
            introduction: textarea, 
            fileCode: memberInfo.fileCode,
            team: memberInfo.team,
            gender: memberInfo.gender,
            birthDay: memberInfo.birthDay,
          }),
        );
      }else {
        console.error("Member information is not yet defined");
      }
    };

    
    
    

    return (
      <div className={HrmDetailCSS.allContainer}>
        <div className={HrmDetailCSS.hrmHeader}>
                <span>인사 정보</span>
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
                    name="아이디"
                    readOnly
                    value={memberInfo?.memberId}
                  />
                </div>
                <div className={HrmDetailCSS.inputWrapper}>
                  <span className={HrmDetailCSS.inputLabel}>성명</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="성명"
                    readOnly
                    value={memberInfo?.memberName}
                  />
                  <span className={HrmDetailCSS.inputLabel}>핸드폰</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="핸드폰"
                    readOnly
                    value={memberInfo?.phone}
                  />
                </div>
                <div className={HrmDetailCSS.inputWrapper}>
                  <span className={HrmDetailCSS.inputLabel}>이메일</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="이메일"
                    readOnly
                    value={memberInfo?.memberEmail}
                  />
                  <span className={HrmDetailCSS.inputLabel}>부서</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="부서"
                    readOnly
                    value={memberInfo?.deptName}
                  />
                </div>
                <div className={HrmDetailCSS.inputWrapper}>
                  <span className={HrmDetailCSS.inputLabel}>직급</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="직급"
                    readOnly
                    value={memberInfo?.jobName}
                  />
                  <span className={HrmDetailCSS.inputLabel}>생년월일</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="생년월일"
                    readOnly
                    value={memberInfo?.birthDay}
                  />
                </div>
                <div className={HrmDetailCSS.inputWrapper}>
                  <span className={HrmDetailCSS.inputLabel}>주소</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="주소"
                    readOnly
                    value={memberInfo?.address}
                  />
                  <span className={HrmDetailCSS.inputLabel}>입사일</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="입사일"
                    readOnly
                    value={memberInfo?.memberHireDate}
                  />
                </div>
                <div className={HrmDetailCSS.inputWrapper}>
                  <span className={HrmDetailCSS.inputLabel}>재직상태</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="재직상태"
                    readOnly
                    value={memberInfo?.status}
                  />
                  <span className={HrmDetailCSS.inputLabel}>퇴사일</span>
                  <input
                    className={HrmDetailCSS.inputBox}
                    type="text"
                    name="퇴사일"
                    readOnly
                    value={memberInfo?.memberEndDate}
                  />
                </div>
              </div>
            </div>
            

        
          <div className={HrmDetailCSS.textContainer}>
            
         
            <div className={HrmDetailCSS.textareaContainer}>
              <span>기타정보</span>
              <textarea
                className={HrmDetailCSS.textarea}
                value={member.significant}
                readOnly
                rows={4}
                cols={50}
              />
            </div>
            <div className={HrmDetailCSS.textareaContainer}>
              <span>자기소개</span>
              <textarea
                className={HrmDetailCSS.textarea}
                value={textarea}
                onChange={onChangeHandler}
                readOnly={loginMember.memberCode == memberCode ? false :true}
              />
            <div>
            
            {loginMember.memberCode == memberCode && (
            <button type="button" onClick={handleUpdate}>수정</button>
            )}
            </div>
          </div>
            
          </div>
        </div>
      );
}

