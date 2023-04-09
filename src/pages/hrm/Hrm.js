import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallMemberListAPI,callMemberDeptSearchAPI, callMemberEmailSearchAPI, callMemberJobSearchAPI, callMemberNameSearchAPI, callMemberTaskSearchAPI } from '../../apis/HrmAPICall';
import HrmCSS from "./Hrm.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Hrm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hrm = useSelector(state => state.hrmReducer.memberList);
    // const member = useSelector(state => state.hrmReducer.memberDetail)
    const memberList = hrm?.data;
    const pageInfo = hrm?.pageInfo;
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    // const memberCode = loginMember.memberCode;
    const location = useLocation();
    const specificUrl = "/aurora/hrm/hrm-modify";
    console.log('hrm', hrm);
    console.log('memberList', memberList);
    // console.log('memberList.memberCode', memberList.memberCode);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];

    const [category , setCategory] = useState('name');
    const [searchValue, setSearchValue] = useState('');

      useEffect(() => {

        dispatch(CallMemberListAPI({ 
            currentPage: 1 
        }));
      },[]);

      useEffect(() => {

       
      },[currentPage]);
        
      
      
    //   const onClickLink = (num) => {
    //     console.log(num);
    //     navigate(`/aurora/hrm/hrm-detail/${num}`);
    //   };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const onChangeTextHandler = (e) => {
        setSearchValue(e.target.value);
    };
        

    // useEffect(() => {

    //     searchCall();
    //     setCurrentPage(1);
    // // eslint-disable-next-line
    // }, [searchForm])

    const onClickSearch = () => {
        switch (category) {
            case 'name':
                dispatch(callMemberNameSearchAPI({
                    searchValue : searchValue ,
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
        <div className={HrmCSS.hrmDiv}>
            <div className={HrmCSS.hrmHeader}>
                <span>인사 목록</span>
            </div>
            <div className={HrmCSS.hrmSearch}>
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
                <table className={HrmCSS.contentTable}>
                    <thead className={HrmCSS.contentHead}>
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
                            {location.pathname === specificUrl && (
                            <th>
                                수정
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(memberList) && memberList.map((member) => (
                                <tr key={member?.memberCode} id={member?.memberCode}>
                                    <td  onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                    &nbsp;&nbsp;&nbsp;{member.memberCode}
                                    </td>
                                    <td  onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.memberName}
                                    </td>
                                    <td  onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.phone}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.memberEmail}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.deptName}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.jobName}
                                    </td>
                                    <td  onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.taskName}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.address}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                        {member.memberHireDate}
                                    </td>
                                    <td onClick={() =>  navigate(`/aurora/hrm/hrm-detail/${member?.memberCode}`)}>
                                    &nbsp;&nbsp;&nbsp;{member.status}
                                    </td>
                                    
                                    {location.pathname === specificUrl && (
                                      <td>
                                        <button type="button" onClick={() =>  navigate(`/aurora/hrm/hrm-modify/${member?.memberCode}`)}>수정</button>
                                      </td>)}
                                    

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
                <div className={ HrmCSS.pagingBtnDiv }>
                { Array.isArray(memberList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ HrmCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ HrmCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(memberList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                    className={ HrmCSS.pagingBtn }
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

