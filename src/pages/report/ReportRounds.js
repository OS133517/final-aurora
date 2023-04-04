import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callSelectReportRoundListAPI } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import ReportsCSS from "./Reports.module.css";

function ReportRounds() {

    const dispatch = useDispatch();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const navigate = useNavigate();
    const { reportCode } = useParams();
    console.log("reportCode : " + reportCode);
    const [currentPage, setCurrentPage] = useState(1);
    const reportRoundData = useSelector(state => state.reportReducer.reportRoundData);
    reportRoundData && console.log("reportRoundData : " + JSON.stringify(reportRoundData));
    // console.log("reportRoundData : " + reportRoundData);
    const reportRoundList = reportRoundData && reportRoundData?.data?.reportRoundList;
    reportRoundData && console.log("reportRoundList : " + JSON.stringify(reportRoundList));
    const reportDTO = reportRoundData && reportRoundData?.data?.reportDTO;
    reportRoundData && console.log("reportDTO : " + JSON.stringify(reportDTO));
    const pageInfo = reportRoundData && reportRoundData?.pageInfo;
    reportRoundData && console.log("pageInfo : " + JSON.stringify(pageInfo));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    // 목록 조회 
    useEffect(() => {

        dispatch(callSelectReportRoundListAPI({

            reportCode : reportCode,
            offset : currentPage
        }))
    // eslint-disable-next-line
    }, [currentPage])

    const onClickRoundHandler = (reportCode, roundCode) => {
        navigate(`/aurora/reports/${reportCode}/rounds/${roundCode}`)
    }

    return (
        <>
            {reportDTO &&
                <div className={ReportsCSS.reportsContainer}>
                    <div className={ReportsCSS.reportsHeader}>
                        보고서 확인 
                    </div>
                    <div>
                        <p className={ReportsCSS.reportType}>정기 보고 회차 목록</p>
                        <p>{reportDTO.reportTitle} / 책임자 : {reportDTO.memberDTO.deptName} {reportDTO.memberDTO.jobName} {reportDTO.memberDTO.memberName}</p>
                        <p>{reportDTO.reportInfo}</p>
                    </div>
                    <div className={ReportsCSS.reportsDiv}>
                        <table className={ReportsCSS.reportListTable}>
                            <thead>
                                <tr>
                                    {/* <th>날짜</th> */}
                                    <th>제목</th>
                                    {/* <th>부서</th> */}
                                    {/* <th>직급</th> */}
                                    {/* <th>이름</th> */}
                                    <th>보고 현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(reportRoundList) && reportRoundList.map((reportRound) => (
                                    <tr
                                        key={reportRound.roundCode} 
                                        id={reportRound.roundCode}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => onClickRoundHandler(reportRound.reportCode, reportRound.roundCode)}
                                    >
                                        {/* <td>{reportRound.regDate}</td> */}
                                        <td>{reportRound.roundTitle}</td>
                                        <td>{reportRound.reportedMemberCount} / {reportRound.capacity}</td>
                                        {/* <td>{reportRound.memberDTO.deptName}</td>
                                        <td>{reportRound.memberDTO.jobName}</td>
                                        <td>{reportRound.memberDTO.memberName}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={ ReportsCSS.pagingBtnDiv }>
                            { Array.isArray(reportRoundList) &&
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
                            { Array.isArray(reportRoundList) &&
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
            }
        </>
    )
}

export default ReportRounds;