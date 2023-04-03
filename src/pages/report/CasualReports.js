import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { call } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";

import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import CasualReportsCSS from "./CasualReports.module.css";

function RoutineReports() {

    const dispatch = useDispatch();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const navigate = useNavigate();

    // const addBook = useSelector(state => state.addBookReducer.addresses);
    // const pageInfo = addBook.pageInfo;
    // const pageNumber = [];

    // if(pageInfo) {
    //     for(let i = 1; i <= pageInfo.endPage; i++) {
    //         pageNumber.push(i);
    //     }
    // }
    
    // 페이지 번호 바뀔 때
    // useEffect(() => {

    //     if(isSearching) {
    //         searchCall();
    //     } else {
    //         listChange();
    //     }
    // // eslint-disable-next-line
    // }, [currentPage])

    return (
        <>
            <div className={CasualReportsCSS.reportsContainer}>
                <div className={CasualReportsCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div>
                    보고 타입에 따라 정기보고. 비정기보고 
                </div>
                <div className={CasualReportsCSS.reportsDiv}>
                    <table>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>제목</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>날짜</td>
                                <td>제목</td>
                                <td>부서</td>
                                <td>직급</td>
                                <td>이름</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default RoutineReports;