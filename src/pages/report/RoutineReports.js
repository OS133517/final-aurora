import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRoutineReportListByConditionsAPI } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';

import ReportsCSS from "./Reports.module.css";

function RoutineReports() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState('N');
    const [key, setKey] = useState(window.location.pathname);

    const routineReportData = useSelector(state => state.reportReducer.routineReportList); // 정기보고 데이터 
    // console.log("routineReportData : " + JSON.stringify(routineReportData));
    const routineReportList = routineReportData.data; // 정기보고 목록 
    // console.log("routineReportList : " + JSON.stringify(routineReportList));
    const pageInfo = routineReportData.pageInfo; // 정기보고 페이지 정보 
    // console.log("pageInfo : " + JSON.stringify(pageInfo));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {

            pageNumber.push(i);
        }
    }

    // 페이지 번호, 완료 토글 여부에 따라 렌더링
    useEffect(() => {

        updateUrl();

        dispatch(callRoutineReportListByConditionsAPI({

            completionStatus: isCompleted,
            offset: currentPage,
        }));
    }, [currentPage, isCompleted]);

    // url 변경 감지 렌더링
    useEffect(() => {

        const onLocationChange = () => {

            setKey(window.location.pathname);
        };
    
        window.addEventListener('popstate', onLocationChange);
        window.addEventListener('pushState', onLocationChange);
    
        return () => {

            window.removeEventListener('popstate', onLocationChange);
            window.removeEventListener('pushState', onLocationChange);
        };
    }, []);

    // URL 변경 
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
                                {/* <th>부서</th>
                                <th>이름</th>
                                <th>직급</th> */}
                            </tr>
                        </thead>
                        <tbody>
                                {Array.isArray(routineReportList) && routineReportList.length > 0 ? (
                                    routineReportList.map((routineReport) => (
                                        <tr
                                            key={routineReport.reportCode}
                                            id={routineReport.reportCode}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => onClickReportHandler(routineReport.reportCode)}
                                        >
                                            <td>{routineReport.regDate}</td>
                                            <td>{routineReport.reportTitle}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} style={{ textAlign: "center" }}>
                                            조회된 정기보고 목록이 없습니다.
                                        </td>
                                    </tr>
                                )}
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