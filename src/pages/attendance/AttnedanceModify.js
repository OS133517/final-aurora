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
import { callModifyAttendance } from '../../apis/AttendanceAPICall';

export default function AttendanceModify() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hrm = useSelector(state => state.hrmReducer.memberList);
    const memberList = hrm?.data;
    const pageInfo = hrm?.pageInfo;
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const location = useLocation();
    const specificUrl = "/aurora/hrm/hrm-modify";
    console.log('hrm', hrm);
    console.log('memberList', memberList);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    const [category , setCategory] = useState('name');
    const [searchValue, setSearchValue] = useState('');

    const openModal = async (member) => {
        const { value: form } = await Swal.fire({
          title: '근태 수정',
          html: `
          <label><input type="radio" name="attendance" id="earlyOff" class="swal2-radio"> 조기퇴근</label>
          <label><input type="radio" name="attendance" id="tardy" class="swal2-radio"> 지각</label><br>
          <label><input type="radio" name="attendance" id="truancy" class="swal2-radio"> 무단결근</label>
          <label><input type="radio" name="attendance" id="absence" class="swal2-radio"> 결근</label>
          `,
          focusConfirm: false,
          preConfirm: () => {
            const attendance = {
                tardy: document.getElementById('tardy').checked ? 'Y' : 'N',
                earlyOff: document.getElementById('earlyOff').checked ? 'Y' : 'N',
                truancy: document.getElementById('truancy').checked ? 'Y' : 'N',
                absence: document.getElementById('absence').checked ? 'Y' : 'N',
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
          dispatch(callModifyAttendance({ memberCode: member.memberCode, form }));
          Swal.fire('수정되었습니다!', '', 'success');
        }
      };
    
    

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
                                주소
                            </th>
                            <th>
                                입사일
                            </th>
                            <th>
                                재직상태
                            </th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(memberList) && memberList.map((member) => (
                                <tr key={member?.memberCode} id={member?.memberCode} onClick={() => openModal(member)}>
                                    <td >
                                    &nbsp;&nbsp;&nbsp;{member.memberCode}
                                    </td>
                                    <td>
                                        {member.memberName}
                                    </td>
                                    <td>
                                        {member.phone}
                                    </td>
                                    <td>
                                        {member.memberEmail}
                                    </td>
                                    <td>
                                        {member.deptName}
                                    </td>
                                    <td>
                                        {member.jobName}
                                    </td>
                                    <td>
                                        {member.taskName}
                                    </td>
                                    <td>
                                        {member.address}
                                    </td>
                                    <td>
                                        {member.memberHireDate}
                                    </td>
                                    <td>
                                    &nbsp;&nbsp;&nbsp;{member.status}
                                    </td>
                                    {/* <td>
                                        <button type="button" onClick={() =>  navigate(`/aurora/hrm/hrm-modify/${member?.memberCode}`)}>수정</button>
                                    </td> */}
                                    

                                </tr>
                            ))
                        }
                        {
                             Array.isArray(memberList) && memberList.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{textAlign:"center"}}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>)
                        }
                     </tbody>
                </table>
                <div className={ AttendanceModifyCSS.pagingBtnDiv }>
                { Array.isArray(memberList) &&
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
                { Array.isArray(memberList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
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


