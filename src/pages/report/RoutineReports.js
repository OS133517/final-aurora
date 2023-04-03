import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRoutineReportListByConditionsAPI } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { NavLink, useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";

import ReportsCSS from "./Reports.module.css";
import Swal from "sweetalert2";

function RoutineReports() {

    const dispatch = useDispatch();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState('N');
    const routineReportData = useSelector(state => state.reportReducer.routineReportList)
    const routineReportList = routineReportData.data;
    console.log("routineReportList : " + JSON.stringify(routineReportList));

    const pageInfo = routineReportData.pageInfo;
    console.log("pageInfo : " + JSON.stringify(pageInfo));
    const pageNumber = [];

    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    // 목록 조회 
    useEffect(() => {

        dispatch(callRoutineReportListByConditionsAPI({
            completionStatus : isCompleted,
            offset : currentPage
        }))
    // eslint-disable-next-line
    }, [isCompleted, currentPage])

    const onClickReportHandler = (reportCode) => {
        
        navigate(`/aurora/reports/${reportCode}/rounds`)
    }

    return (
        <>
            <div className={ReportsCSS.reportsContainer}>
                <div className={ReportsCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div>
                    <span className={ReportsCSS.reportType}>정기 보고</span>
                </div>
                <div className={ReportsCSS.reportsDiv}>
                    <table className={ReportsCSS.reportListTable}>
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
                            {Array.isArray(routineReportList) && routineReportList.map((routineReport) => (
                                <tr
                                    key={routineReport.reportCode} 
                                    id={routineReport.reportCode}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onClickReportHandler(routineReport.reportCode)}
                                >
                                    <td>{routineReport.regDate}</td>
                                    <td>{routineReport.reportTitle}</td>
                                    <td>{routineReport.memberDTO.deptName}</td>
                                    <td>{routineReport.memberDTO.jobName}</td>
                                    <td>{routineReport.memberDTO.memberName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={ ReportsCSS.pagingBtnDiv }>
                        { Array.isArray(routineReportList) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={ ReportsCSS.pagingBtn }
                            >
                                &lt;
                            </button>
                        }
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                                    className={ ReportsCSS.pagingBtn }
                                >
                                    {num}
                                </button>
                            </li>
                        ))}
                        { Array.isArray(routineReportList) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage + 1)} 
                                disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                                className={ ReportsCSS.pagingBtn }
                            >
                                &gt;
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoutineReports;