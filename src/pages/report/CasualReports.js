import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCasualReportListByConditionsAPI } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';

import ReportsCSS from "./Reports.module.css";

function CasualReports() {

    const dispatch = useDispatch();
    // const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState('N');
    const casualReportData = useSelector(state => state.reportReducer.casualReportList)
    const casualReportList = casualReportData.data;
    console.log("casualReportList : " + JSON.stringify(casualReportList));

    const pageInfo = casualReportData.pageInfo;
    console.log("pageInfo : " + JSON.stringify(pageInfo));
    const pageNumber = [];

    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    // 목록 조회 
    useEffect(() => {

        dispatch(callCasualReportListByConditionsAPI({
            completionStatus : isCompleted,
            offset : currentPage
        }))
    // eslint-disable-next-line
    }, [isCompleted, currentPage])

    const onClickReportHandler = (reportCode) => {
        
        navigate(`/aurora/reports/casuals/${reportCode}`)
        // @GetMapping("/reports/casual/{reportCode}")
    }

    return (
        <>
            <div className={ReportsCSS.reportsContainer}>
                <div className={ReportsCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div>
                    <span className={ReportsCSS.reportType}>비정기 보고</span>
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
                            {Array.isArray(casualReportList) && casualReportList.map((casualReport) => (
                                <tr
                                    key={casualReport.reportCode} 
                                    id={casualReport.reportCode}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onClickReportHandler(casualReport.reportCode)}
                                >
                                    <td>{casualReport.regDate}</td>
                                    <td>{casualReport.reportTitle}</td>
                                    <td>{casualReport.memberDTO.deptName}</td>
                                    <td>{casualReport.memberDTO.jobName}</td>
                                    <td>{casualReport.memberDTO.memberName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={ ReportsCSS.pagingBtnDiv }>
                        { Array.isArray(casualReportList) &&
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
                        { Array.isArray(casualReportList) &&
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

export default CasualReports;