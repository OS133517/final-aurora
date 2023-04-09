import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRoutineReportListByConditionsAPI } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import ReportsCSS from "./Reports.module.css";

function RoutineReports() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const location = useLocation();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState('N');
    // const [isFirstRender, setIsFirstRender] = useState(true);

    // 정기보고 데이터 
    const routineReportData = useSelector(state => state.reportReducer.routineReportList)
    // console.log("routineReportData : " + JSON.stringify(routineReportData));
    // 정기보고 목록 
    const routineReportList = routineReportData.data;
    // console.log("routineReportList : " + JSON.stringify(routineReportList));
    // 정기보고 페이지 정보 
    const pageInfo = routineReportData.pageInfo;
    // console.log("pageInfo : " + JSON.stringify(pageInfo));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {

            pageNumber.push(i);
        }
    }

    useEffect(() => {

        updateUrl();

        dispatch(callRoutineReportListByConditionsAPI({

            completionStatus: isCompleted,
            offset: currentPage,
        }));
      }, [currentPage, isCompleted]);

    const updateUrl = () => {

        const updatedUrl = `/aurora/reports/routines?completionStatus=${isCompleted}&offset=${currentPage}`;
        navigate(updatedUrl);
    };
    
    // 보고 클릭시 
    const onClickReportHandler = (reportCode) => {
        
        navigate(`/aurora/reports/${reportCode}/rounds`)
    }

    // 완료여부 토글 
    const toggleCompletionStatus = () => {

        if (isCompleted === "N") {

            setIsCompleted("Y");
        } else {

            setIsCompleted("N");
        }
        setCurrentPage(1);
    };

    return (
        <>
            <div className={ReportsCSS.reportsContainer}>
                <div className={ReportsCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div className={ReportsCSS.roundsHeader}>
                    <span className={ReportsCSS.roundsTitle}>정기 보고 목록</span>
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
                                {/* <th className={ReportsCSS.columnStatus}>보고 현황</th> */}
                                {/* <th>부서</th>
                                <th>이름</th>
                                <th>직급</th> */}
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
                                    {/* <td>{reportRound.memberDTO.deptName}</td>
                                    <td>{reportRound.memberDTO.memberName}</td>
                                    <td>{reportRound.memberDTO.jobName}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* 페이징 버튼 */}
                    <div className={ReportsCSS.pagingBtnDiv}>
                        {Array.isArray(routineReportList) && (
                            <>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={ReportsCSS.pagingBtn}    
                                >
                                    &lt;
                                </button>
                                {pageNumber.map((num) => (
                                    <li 
                                        key={num} 
                                        onClick={() => setCurrentPage(num)}
                                    >
                                        <button
                                            style={currentPage === num ? { backgroundColor: "rgb(12, 250, 180)" } : null}
                                            className={ReportsCSS.pagingBtn}
                                        >
                                            {num}
                                        </button>
                                    </li>
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

export default RoutineReports;