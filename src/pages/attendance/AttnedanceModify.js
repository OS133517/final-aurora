import React, { useEffect, useState } from 'react';
import { decodeJwt } from "../../utils/tokenUtils";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CallMemberListAPI,
         callMemberDeptSearchAPI,
         callMemberEmailSearchAPI,
         callMemberJobSearchAPI,
         callMemberNameSearchAPI,
         callMemberTaskSearchAPI
     } 
     from '../../apis/HrmAPICall';
import AttendanceModifyCSS from "./AttendanceModify.module.css"
import Swal from "sweetalert2";
import { callAttendanceListAPI, callModifyAttendance } from '../../apis/AttendanceAPICall';

export default function AttendanceModify() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hrm = useSelector(state => state.hrmReducer.memberList);
    const data = useSelector(state => state.attendanceReducer.attendanceList?.data);
    console.log('data', data);
    const attList = data?.attendanceList;
    const getAttendanceList = data?.getAttendanceList;
    const memberList = hrm?.data;
    const pageInfo = hrm?.pageInfo;
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    console.log("attList", attList);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    const [category , setCategory] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().substring(0, 10);
    const [selectDate , setSelectDate] = useState(formattedDate);
    console.log(formattedDate);
    const openModal = async (att) => {
        const { value: form } = await Swal.fire({
          title: '근태 수정',
          html: `
          <label><input type="radio" name="attendance" id="earlyOff" class="swal2-radio"> 조기퇴근</label>
          <label><input type="radio" name="attendance" id="tardy" class="swal2-radio"> 지각</label><br>
          <label><input type="radio" name="attendance" id="truancy" class="swal2-radio"> 무단결근</label>
          <label><input type="radio" name="attendance" id="absence" class="swal2-radio"> 결근</label><br>
          <label><input type="date" id="attendanceDate" value="${selectDate}" class="swal2-input"></label>
          `,
          focusConfirm: false,
          preConfirm: () => {
            const attendance = {
                tardy: document.getElementById('tardy').checked ? 'Y' : 'N',
                earlyOff: document.getElementById('earlyOff').checked ? 'Y' : 'N',
                truancy: document.getElementById('truancy').checked ? 'Y' : 'N',
                absence: document.getElementById('absence').checked ? 'Y' : 'N',
                selectedDate: document.getElementById('attendanceDate').value
              };

              if (
                attendance.tardy === "N" &&
                attendance.earlyOff === "N" &&
                attendance.truancy === "N" &&
                attendance.absence === "N"
              ) {
                Swal.showValidationMessage("근태를 선택해 주세요.");
                return;
              }
        
              return attendance;
            },
          });
    
        if (form) {
            console.log("form",form);
          dispatch(callModifyAttendance({ 
            memberCode : att.memberCode,
            selectedDate : form.selectedDate,
            tardy: form.tardy,
            earlyOff: form.earlyOff,
            truancy: form.truancy,
            absence: form.absence,
            form 
            }));
          Swal.fire('수정되었습니다!', '', 'success');
          window.location.reload()
        }
      };

      useEffect(() => {

        dispatch(callAttendanceListAPI({
            currentPage : 1,
            selectedDate : selectDate

        }))
      } , [selectDate])
      console.log("selectDate", selectDate);
    

      useEffect(() => {

        dispatch(CallMemberListAPI({ 
            currentPage: 1 

        }));
      },[]);

      useEffect(() => {

       
      },[currentPage]);

    
    const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    };

    const onChangeTextHandler = (e) => {
        setSearchValue(e.target.value);
    };

    const onChangeDate = (e) => {
        setSelectDate(e.target.value);
    };
        

  
    const onClickSearch = () => {
        switch (category) {
            case 'name':
                dispatch(callMemberNameSearchAPI({
                    searchValue : searchValue,
                     currentPage : currentPage
                    }));
                
                break;
            case 'email':
                dispatch(callMemberEmailSearchAPI({
                    searchValue : searchValue,
                     currentPage : currentPage
                    }));
                break;
            case 'dept':
                dispatch(callMemberDeptSearchAPI({
                    searchValue : searchValue,
                     currentPage : currentPage
                    }));
                break;
            case 'job':
                dispatch(callMemberJobSearchAPI({
                    searchValue : searchValue,
                     currentPage : currentPage
                    }));
                break;
            case 'task':
                dispatch(callMemberTaskSearchAPI({
                    searchValue : searchValue,
                     currentPage : currentPage
                    }));
                break;

                default:
                break;
        }
    }
    return (
        <>
        <div className={AttendanceModifyCSS.attModifyDiv}>
            <div className={AttendanceModifyCSS.attModifyHeader}>
                <span>근태 수정</span>
            </div>
            <div className={AttendanceModifyCSS.attModifySearch}>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="name">이름</option>
                    <option value="dept">부서</option>
                    <option value="job">직위</option>
                    <option value="task">직무</option>
                    <option value="email">이메일</option>
                </select>
                <input type="text" name="value" value={searchValue} onChange={onChangeTextHandler}/>
                <button type="button" onClick={onClickSearch}>검&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                <input type="date" style={{width : "200px"}} value={selectDate} onChange={onChangeDate}></input>
            </div>
            <div>
                <table className={AttendanceModifyCSS.contentTable}>
                    <thead className={AttendanceModifyCSS.contentHead}>
                        <tr>  
                            <th>
                                사번
                            </th>
                            <th>
                                이름
                            </th>
                            <th>
                                휴대폰
                            </th>
                            <th>
                                이메일
                            </th>
                            <th>
                                부서
                            </th>
                            <th>
                                직급
                            </th>
                            <th>
                                직무
                            </th>
                            <th>
                                지각
                            </th>
                            <th>
                                결근
                            </th>
                            <th>
                                무단결근
                            </th>
                            <th>
                                조퇴
                            </th>
                            <th>
                                근무일자
                            </th>
                            <th>
                                근무
                            </th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(attList) && attList.map((att) => (
                                <tr key={att?.memberCode} id={att?.memberCode} onClick={() => openModal(att)}>
                                    <td >
                                    &nbsp;&nbsp;&nbsp;{att.memberCode}
                                    </td>
                                    <td>
                                        {att.memberName}
                                    </td>
                                    <td>
                                        {att.phone}
                                    </td>
                                    <td>
                                        {att.memberEmail}
                                    </td>
                                    <td>
                                        {att.deptName}
                                    </td>
                                    <td>
                                        {att.jobName}
                                    </td>
                                    <td>
                                        {att.taskName}
                                    </td>
                                    <td>
                                        {att.tardy}
                                    </td>
                                    <td>
                                        {att.absence}
                                    </td>
                                    <td>
                                        {att.truancy}
                                    </td>
                                    <td>
                                        {att.earlyOff}
                                    </td>
                                    <td>
                                        {att.attRegDate}
                                    </td>
                                    <td>
                                    {att.tardy === "Y" ? "지각" :
                                    att.absence === "Y" ? "결근" :
                                    att.truancy === "Y" ? "무단결근" :
                                    att.earlyOff === "Y" ? "조퇴" :
                                    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{att.workStatus}</>}
                                    </td>
                                    {/* <td>
                                        <button type="button" onClick={() =>  navigate(`/aurora/hrm/hrm-modify/${member?.memberCode}`)}>수정</button>
                                    </td> */}
                                    

                                </tr>
                            ))
                        }
                        {
                             Array.isArray(attList) && attList.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{textAlign:"center"}}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>)
                        }
                     </tbody>
                </table>
                <div className={ AttendanceModifyCSS.pagingBtnDiv }>
                { Array.isArray(attList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ AttendanceModifyCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ AttendanceModifyCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(attList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo?.endPage || pageInfo?.total === 0}
                    className={ AttendanceModifyCSS.pagingBtn }
                >
                    &gt;
                </button>
                }
            </div>
            </div>
        </div>
   
        </>
    );
}


