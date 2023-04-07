import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callReportSummaryAPI } from "../../apis/ReportAPICall";
import { useNavigate } from "react-router-dom";

import ReportSummaryCSS from "./ReportSummary.module.css";
import Swal from "sweetalert2";

function ReportSummary() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const reportSummary = useSelector(state => state.reportReducer.reportSummary);
    console.log("reportSummary : " + JSON.stringify(reportSummary));

    const casualList = reportSummary.casualList;
    const routineList1 = reportSummary.routineList1;
    console.log("routineList1 : " + JSON.stringify(routineList1));
    const routineList2 = reportSummary.routineList2;
    console.log("routineList2 : " + JSON.stringify(routineList2));
    const routineList3 = reportSummary.routineList3;
    console.log("routineList3 : " + JSON.stringify(routineList3));
    
    useEffect(() => {

        dispatch(callReportSummaryAPI({
            
        }));
    // eslint-disable-next-line
    }, [])

    return (
        <div className={ReportSummaryCSS.container}>
            <div className={ReportSummaryCSS.content}>
                <span className={ReportSummaryCSS.reportType}>정기 보고</span>
                <div className={ReportSummaryCSS.routineBox}>
                    {
                        [routineList1, routineList2, routineList3].map((routineList, index) => (
                            Array.isArray(routineList) && (
                                <div key={`routine-report-${index}`} className={ReportSummaryCSS.routineReport}>
                                    <div className={ReportSummaryCSS.routineReportHeader}>
                                        <NavLink to={`/aurora/reports/${reportSummary[`routineReportDTO${index + 1}`].reportCode}/rounds`}>
                                        {reportSummary[`routineReportDTO${index + 1}`].reportTitle}
                                        </NavLink>
                                    </div>
                                    <div className={ReportSummaryCSS.routineReportBody}>
                                        <table className={ReportSummaryCSS.reportTable}>
                                            <tbody>
                                                {
                                                    routineList.map((routineReport) => (
                                                        <tr key={routineReport.roundCode} id={routineReport.roundCode} className={ReportSummaryCSS.fixedHeightRow}>
                                                            <td className={ReportSummaryCSS.reportTitleCell}>
                                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
                                                                    <span className={ReportSummaryCSS.reportTitleText}>{routineReport.roundTitle}</span>
                                                                </NavLink>
                                                            </td>
                                                        <td className={ReportSummaryCSS.memberInfoCell}>{routineReport.reportedMemberCount} / {routineReport.capacity}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        ))
                    }
                    
                    {!routineList1 || routineList1.length === 0 ?
                        <div className={ReportSummaryCSS.routineReport}>
                            <span className={ReportSummaryCSS.notice}>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                정기보고<br/>내역이 없습니다.
                            </span>
                        </div> : null
                    }
                </div>
                {/* 비정기 보고 */}
                <span className={ReportSummaryCSS.reportType}>비정기 보고</span>
                <div className={`${ReportSummaryCSS.casualReportContainer} ${ReportSummaryCSS.flexContainer}`}>
                    <div className={ReportSummaryCSS.casualReportDiv} style={{ width: "450px", overflowY: "auto" }}>
                        <table className={ReportSummaryCSS.reportTable}>
                            <tbody>
                                {
                                    Array.isArray(casualList) && casualList.slice(0, 10).map((casualReport) => (
                                        <tr key={casualReport.reportCode}>
                                            <td className={ReportSummaryCSS.reportTitleCell}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${casualReport.reportCode}`}>
                                                    {casualReport.reportTitle}
                                                </NavLink>
                                            </td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.deptName}</td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.memberName}</td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.jobName}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* 회색 분할선 추가 */}
                    {Array.isArray(casualList) && casualList.length > 0 && (
                        <div className={ReportSummaryCSS.centerLine}></div>
                    )}
                    <div className={ReportSummaryCSS.casualReportDiv} style={{ width: "450px", overflowY: "auto" }}>
                        <table className={ReportSummaryCSS.reportTable}>
                            <tbody>
                                {
                                    Array.isArray(casualList) && casualList.slice(10, 20).map((casualReport) => (
                                        <tr key={casualReport.reportCode}>
                                            <td className={ReportSummaryCSS.reportTitleCell}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${casualReport.reportCode}`}>
                                                    {casualReport.reportTitle}
                                                </NavLink>
                                            </td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.deptName}</td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.memberName}</td>
                                            <td className={ReportSummaryCSS.memberInfoCell}>{casualReport.memberDTO.jobName}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {!reportSummary || !casualList || casualList.length === 0 ?
                        <div className={ReportSummaryCSS.noticeContainer}>
                            <span className={ReportSummaryCSS.notice}>
                                비정기보고 내역이 없습니다.
                            </span>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ReportSummary;
{/* <ul className={ReportSummaryCSS.reportList}>
    {
        Array.isArray(casualList) && casualList.slice(10, 20).map((casualReport) => (
            <li key={casualReport.reportCode} id={casualReport.reportCode}>
                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${casualReport.reportCode}`}>
                    {casualReport.reportTitle}
                    {casualReport.memberDTO.deptName}
                    {casualReport.memberDTO.memberName}
                    {casualReport.memberDTO.jobName}
                </NavLink>
            </li>
        ))
    }
</ul> */}


        // <div className={ReportSummaryCSS.container}>
        //     <div className={ReportSummaryCSS.content}>
        //         <span className={ReportSummaryCSS.reportType}>정기 보고</span>
        //         {/* 정기보고 전체 */}
        //         <div className={ReportSummaryCSS.routineBox}>
        //             <div 
        //                 // key={routineList1.routineReportreportCode} 
        //                 // id={routineList1.reportCode} 
        //                 className={ReportSummaryCSS.routineReport}
        //             >
        //                 {/* 정기보고 1 */}
        //                 {Array.isArray(routineList1) && 
        //                     <>
        //                         <div className={ReportSummaryCSS.routineReportHeader}>
        //                             {/* 정기보고 1 제목 */}
        //                             {reportSummary && 
        //                                 <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO1.reportCode}/rounds`}>
        //                                     {reportSummary.routineReportDTO1.reportTitle}
        //                                 </NavLink>
        //                             }
        //                         </div>
        //                         <div className={ReportSummaryCSS.routineReportBody}>
        //                             <ul className={ReportSummaryCSS.reportList}>
        //                                 {
        //                                     Array.isArray(routineList1) && routineList1.map((routineReport) => (
        //                                         <li key={routineReport.roundCode} id={routineReport.roundCode}>
        //                                             <NavLink 
        //                                                 className={ReportSummaryCSS.roundListItem} 
        //                                                 to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}
        //                                             >
        //                                                 <div>
        //                                                     {routineReport.roundTitle}
        //                                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //                                                     {routineReport.reportedMemberCount} / {routineReport.capacity}
        //                                                 </div>
        //                                             </NavLink>
        //                                         </li>
        //                                     ))
        //                                 }
        //                             </ul>
        //                         </div>
        //                     </>
        //                 }
        //                 {routineList1 == undefined && 
        //                     <div className={ReportSummaryCSS.noticeContainer}>
        //                         <span className={ReportSummaryCSS.notice}>
        //                             정기보고 내역이 없습니다.
        //                         </span>
        //                     </div>
        //                 }
        //             </div>
        //             {Array.isArray(routineList2) && 
        //                 <div 
        //                     key={routineList2.routineReportreportCode} 
        //                     id={routineList2.reportCode} 
        //                     className={ReportSummaryCSS.routineReport}
        //                 >
        //                     <div className={ReportSummaryCSS.routineReportHeader}>
        //                             <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO2.reportCode}/rounds`}>
        //                                 <span>
        //                                     {reportSummary.routineReportDTO2.reportTitle}
        //                                 </span>
        //                             </NavLink>
        //                     </div>
        //                     <div className={ReportSummaryCSS.routineReportBody}>
        //                         <ul className={ReportSummaryCSS.reportList}>
        //                             {
        //                                 Array.isArray(routineList2) && routineList2.map((routineReport) => (
        //                                     <li key={routineReport.roundCode} id={routineReport.roundCode}>
        //                                         <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
        //                                             {routineReport.roundTitle} 
        //                                         </NavLink>
        //                                     </li>
        //                                 ))
        //                             }
        //                         </ul>
        //                     </div>
        //                 </div>
        //             }
        //             {Array.isArray(routineList3) && 
        //                 <div 
        //                     key={routineList3.routineReportreportCode} 
        //                     id={routineList3.reportCode} 
        //                     className={ReportSummaryCSS.routineReport}
        //                     // onClick={onClickRound}
        //                 >
        //                     <div className={ReportSummaryCSS.routineReportHeader}>
        //                             <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO3.reportCode}/rounds`}>
        //                                 <span>
        //                                     {reportSummary.routineReportDTO3.reportTitle}
        //                                 </span>
        //                             </NavLink>
        //                     </div>
        //                     <div className={ReportSummaryCSS.routineReportBody}>
        //                         <ul className={ReportSummaryCSS.reportList}>
        //                             {
        //                                 Array.isArray(routineList3) && routineList3.map((routineReport) => (
        //                                     <li key={routineReport.roundCode} id={routineReport.roundCode}>
        //                                         <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
        //                                             {routineReport.roundTitle}
        //                                         </NavLink>
        //                                     </li>
        //                                 ))
        //                             }
        //                         </ul>
        //                     </div>
        //                 </div>
        //             }
        //         </div>
        //         <span className={ReportSummaryCSS.reportType}>비정기 보고</span>
        //         <div className={`${ReportSummaryCSS.casualReportContainer} ${ReportSummaryCSS.flexContainer}`}>
        //             <div className={ReportSummaryCSS.casualReportDiv}>
        //                 <ul className={ReportSummaryCSS.reportList}>
        //                     {
        //                         Array.isArray(casualList) && casualList.slice(0, 10).map((casualReport) => (
        //                             <li key={casualReport.reportCode} id={casualReport.reportCode}>
        //                                 <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${casualReport.reportCode}`}>
        //                                     {casualReport.reportTitle}
        //                                     {/* {casualReport.reportCode} */}
        //                                             {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //                                             asdsada */}
        //                                 </NavLink>
        //                             </li>
        //                         ))
        //                     }
        //                 </ul>
        //             </div>
        //             {casualList != undefined && casualList.length != 0 &&
        //                 <div className={ReportSummaryCSS.centerLine}/>
        //             }
        //             {!reportSummary || !casualList || casualList.length === 0?
        //                 <div className={ReportSummaryCSS.noticeContainer}>
        //                     <span className={ReportSummaryCSS.notice}>
        //                         비정기보고 내역이 없습니다.
        //                     </span>
        //                 </div>
        //                 : null
        //             }
        //             <div className={ReportSummaryCSS.casualReportDiv}>
        //             <table className={ReportSummaryCSS.reportTable}>
        //                 <tbody>
        //                 {Array.isArray(casualList) &&
        //                     casualList.slice(0, 10).map((casualReport) => (
        //                     <tr key={casualReport.reportCode} className={ReportSummaryCSS.reportTableRow}>
        //                         <td className={`${ReportSummaryCSS.reportTableCell} ${ReportSummaryCSS.reportTitle}`}>
        //                         <NavLink
        //                             className={ReportSummaryCSS.roundListItem}
        //                             to={`/aurora/reports/casuals/${casualReport.reportCode}`}
        //                         >
        //                             {casualReport.reportTitle}
        //                         </NavLink>
        //                         </td>
        //                         <td className={`${ReportSummaryCSS.reportTableCell} ${ReportSummaryCSS.smallCell}`}>
        //                         {casualReport.memberDTO.deptName}
        //                         </td>
        //                         <td className={`${ReportSummaryCSS.reportTableCell} ${ReportSummaryCSS.smallCell}`}>
        //                         {casualReport.memberDTO.memberName}
        //                         </td>
        //                         <td className={`${ReportSummaryCSS.reportTableCell} ${ReportSummaryCSS.smallCell}`}>
        //                         {casualReport.memberDTO.jobName}
        //                         </td>
        //                     </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
                        
        //             </div>
        //         </div>
        //     </div>
        // </div>