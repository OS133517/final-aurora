import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCasualReportListByConditionsAPI } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';

import ReportsCSS from "./Reports.module.css";

function CasualReports() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState('N');

    const casualReportData = useSelector(state => state.reportReducer.casualReportList)
    // console.log("casualReportData : " + JSON.stringify(casualReportData));
    const casualReportList = casualReportData.data;
    // console.log("casualReportList : " + JSON.stringify(casualReportList));
    const pageInfo = casualReportData.pageInfo;
    // console.log("pageInfo : " + JSON.stringify(pageInfo));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {

            pageNumber.push(i);
        }
    }
    
    // 목록 조회 
    useEffect(() => {

        updateUrl();

        dispatch(callCasualReportListByConditionsAPI({
            completionStatus : isCompleted,
            offset : currentPage
        }))
    // eslint-disable-next-line
    }, [currentPage, isCompleted])

    const updateUrl = () => {

        const updatedUrl = `/aurora/reports/casuals?completionStatus=${isCompleted}&offset=${currentPage}`;
        navigate(updatedUrl);
    };

    // 보고 클릭시 
    const onClickReportHandler = (reportCode) => {
        
        navigate(`/aurora/reports/casuals/${reportCode}`)
    }

    // 완료여부 토글 
    const toggleCompletionStatus = () => {

        setIsCompleted(isCompleted === "N" ? "Y" : "N");

        setCurrentPage(1);
    };

    return (
        <>
            <div className={ReportsCSS.reportsContainer}>
                <div className={ReportsCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div className={ReportsCSS.roundsHeader}>
                    <span className={ReportsCSS.roundsTitle}>비정기 보고 목록</span>
                    {/* 버튼 컨테이너 */}
                    <div className={ReportsCSS.headerButtonDiv}>
                        {/* 완료된 보고 조회하기 */}
                        {isCompleted == 'N'?
                            <span>완료된 보고 조회하기</span> :
                            <span>미완료된 보고 조회하기</span> 
                        }
                        <label 
                            className={ReportsCSS.toggleSwitch}
                        >
                            <input 
                                type="checkbox" 
                                onClick={() => toggleCompletionStatus()}/
                            >         
                            <span className={ReportsCSS.toggleSlider}></span>
                        </label>
                    </div>
                </div>
                {/* 보고 목록 컨테이너 */}
                <div className={ReportsCSS.reportsDiv}>
                    {/* 보고 게시판 */}
                    <table className={ReportsCSS.reportsTable}>
                        <thead>
                            <tr>
                                <th className={ReportsCSS.columnRegDate}>등록일</th>
                                <th className={ReportsCSS.columnTitle}>제목</th>
                                <th className={ReportsCSS.columnMemberInfo}>부서</th>
                                <th className={ReportsCSS.columnMemberInfo}>이름</th>
                                <th className={ReportsCSS.columnMemberInfo}>직급</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(casualReportList) && casualReportList.length > 0 ? (
                                casualReportList.map((casualReport) => (
                                    <tr
                                        key={casualReport.reportCode}
                                        id={casualReport.reportCode}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => onClickReportHandler(casualReport.reportCode)}
                                    >
                                        <td>{casualReport.regDate}</td>
                                        <td>{casualReport.reportTitle}</td>
                                        <td className={ReportsCSS.columnTextAlignTd}>{casualReport.memberDTO.deptName}</td>
                                        <td className={ReportsCSS.columnTextAlignTd}>{casualReport.memberDTO.memberName}</td>
                                        <td className={ReportsCSS.columnTextAlignTd}>{casualReport.memberDTO.jobName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center" }}>
                                        조회된 비정기보고 목록이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* 페이징 버튼 */}
                    <div className={ReportsCSS.pagingBtnDiv}>
                        {Array.isArray(casualReportList) && (
                            <>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={ReportsCSS.pagingBtn}    
                                >
                                    &lt;
                                </button>
                                {pageNumber.map((num) => (
                                    <button
                                        key={num} 
                                        onClick={() => setCurrentPage(num)}
                                        style={currentPage === num ? { backgroundColor: "rgb(12, 250, 180)" } : null}
                                        className={ReportsCSS.pagingBtn}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                                    className={ReportsCSS.pagingBtn}
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CasualReports;