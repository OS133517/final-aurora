import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberSignUpAPI, callCodeAPI } from '../../apis/HrmAPICall';
import HrmSignupCSS from './HrmSignup.module.css';
import Swal from 'sweetalert2';

export default function HrmSignup() {
  const registMessage = useSelector(state => state.hrmReducer.memberMessage);
  const member = useSelector((state) => state.hrmReducer.code) || {
    selectDept: [],
    selectJob: [],
    selectTask: [],
    selectTeam: [],
  };
  console.log("registMessage", registMessage);
    console.log("member", member);
    console.log(member.selectDept);

    // const selectDept = member.selectDept;
    // const selectJob = member.selectJob;
    // const selectTask = member.selectTask;
    const dispatch = useDispatch();
    
    useEffect(() => {

          if(registMessage.status === 201) {

            Swal.fire({
              icon : "success",
              title : "회원 가입 성공",
              confirmButtonText: '확인'
            }).then((result) => {
              if(result.isConfirmed) {
                  window.location.reload(true); 
              } else {
                  window.location.reload(true); 
              }
          })
      } else if (registMessage.state === 400){
          Swal.fire({
              icon : "error",
              title : "회원 가입 실패",
              
          });
      } 
  }, // eslint-disable-next-line
[registMessage]);

    useEffect(() => {

      dispatch(callCodeAPI({
        
      }));
    },[]);

    const searchAddress = () => { //주소 api
      new window.daum.Postcode({
        oncomplete: function (data) {
          const fullAddress = data.address;
          setForm({ ...form, address: fullAddress });
        },
      }).open();
    };
   

   
    const handleChange = (e) => {
      const {name , value} = e.target;
      if (name ==="deptName") {
        const selectDept = member.selectDept.find((dept) => dept.deptCode === value);
        setForm({...form, deptName: selectDept.deptName, deptCode: selectDept.deptCode});
      } else if (name === "jobName") {
        const selectJob = member.selectJob.find((job) => job.jobCode === value);
        setForm({ ...form, jobName: selectJob.jobName, jobCode: selectJob.jobCode });
      } else if (name === "taskName") {
        const selectTask = member.selectTask.find((task) => task.taskCode === value);
        setForm({ ...form, taskName: selectTask.taskName, taskCode: selectTask.taskCode });
      }else if (name === "teamName" ) {
        const selectTeam = member.selectTeam.find((team) => team.teamCode === value);
        setForm({ ...form, teamName: selectTeam.teamName, teamCode: selectTeam.teamCode });
      } else {  
        setForm({ ...form, [name]: value });
      }
    };

   

    const [form, setForm] = useState({
        memberName: '',
        memberId: '',
        memberEmail: '',
        memberPWD: '',
        deptCode: '',
        jobCode: '',
        phone: '',
        taskCode: '',
        fileCode: '',
        teamCode: '',
        address: '',
        gender: '',
        birthDay: ''
      });


      const handleSubmit = (e) => {


        e.preventDefault(); //기본 폼 제출 동작 중단 하고 디시패치 할거
        dispatch(callMemberSignUpAPI(form));
      }

    return (
        <>
        <div className={HrmSignupCSS.allContainer}>
        <div className={HrmSignupCSS.hrmHeader}>
         <span>인사 등록</span>
       </div>
          <div className={HrmSignupCSS.signupContainer}>
        <div className={HrmSignupCSS.formContainer}>
       
        <form onSubmit={handleSubmit}>
          <div className={HrmSignupCSS.formGroup}>
            <label>
            이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input name="memberName" value={form.memberName} onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            아이디&nbsp;&nbsp;&nbsp;
            <input name="memberId" value={form.memberId} onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            이메일&nbsp;&nbsp;&nbsp;
            <input name="memberEmail" type='email' value={form.memberEmail} pattern=".+@project-aurora\.co.kr" placeholder="example@project-aurora.co.kr" onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            비밀번호
            <input name="memberPWD" type='password' value={form.memberPWD} onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            부서&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select name="deptName" value={form.deptCode} onChange={handleChange}>
              <option value='' disabled>-- 선택 --</option>
                {Array.isArray(member.selectDept) && member.selectDept.map((dept) => (
                  <option key={dept.deptCode} value={dept.deptCode}>
                    {dept.deptName}
                  </option>
                ))} 
              </select>
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            직급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select name="jobName" value={form.jobCode} onChange={handleChange}>
              <option value='' disabled>-- 선택 --</option>
                {Array.isArray(member.selectJob) && member.selectJob.map((job) => (
                  <option key={job.jobCode} value={job.jobCode}>
                    {job.jobName}
                  </option>
                ))}
              </select>
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            전화번호
            <input name="phone" value={form.phone}  pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
            maxLength="13"
            placeholder="예) 010-1234-5678"onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            업무&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select name="taskName" value={form.taskCode} onChange={handleChange} >
            <option value='' disabled>-- 선택 --</option>
                {Array.isArray(member.selectTask) && member.selectTask.map((task) => (
                  <option key={task.taskCode} value={task.taskCode}>
                    {task.taskName}
                  </option>
                ))}
              </select>
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            팀명&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select name="teamName" value={form.teamCode} onChange={handleChange}>
                  <option value='' disabled>-- 선택 --</option>
                {Array.isArray(member.selectTeam) && member.selectTeam.map((team) => (
                  <option key={team.teamCode} value={team.teamCode}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </label>
            </div>
            <br/>
        
            <div className={HrmSignupCSS.formGroup}>
            <label>
            성별&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select name="gender" value={form.gender} onChange={handleChange} >
              <option value='' disabled>-- 선택 --</option>
                 <option value="남">남</option>
                 <option value="여">여</option>
            </select>
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            생년월일
            <input name="birthDay" type='date' value={form.birthDay} onChange={handleChange} />
            </label>
            </div>
            <br/>
            <div className={HrmSignupCSS.formGroup}>
            <label>
            &nbsp; 주소
            <br/>
            <input name="address" value={form.address} style={{ width: "350px" }} onChange={handleChange} />
            <button  type="button" onClick={searchAddress}>주소 검색</button>
            </label>
            </div>
            <br/>
            <button className={HrmSignupCSS.button} type="submit">회원가입</button>
            </form>
      </div>
    </div>
    </div>
  </>

    );
}

