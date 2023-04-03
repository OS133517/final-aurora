import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callReportSummaryAPI } from "../../apis/ReportAPICall";

import ReportSummaryCSS from "./ReportSummary.module.css";
import Swal from "sweetalert2";

function ReportSummary() {

    const dispatch = useDispatch();
    
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
    
    // const onClickRound = (e) => {

    // }

    return (
        <div className={ReportSummaryCSS.container}>
            <div className={ReportSummaryCSS.content}>
                <span className={ReportSummaryCSS.reportType}>정기 보고</span>
                <div className={ReportSummaryCSS.routineBox}>
                    <div 
                        // key={routineList1.routineReportreportCode} 
                        // id={routineList1.reportCode} 
                        className={ReportSummaryCSS.routineReport}
                    >
                        {Array.isArray(routineList1) && 
                            <>
                                <div className={ReportSummaryCSS.routineReportHeader}>
                                    <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO1.reportCode}/rounds`}>
                                        <span>
                                            {reportSummary.routineReportDTO1.reportTitle}
                                        </span>
                                    </NavLink>
                                </div>
                                <div className={ReportSummaryCSS.routineReportBody}>
                                    <ul className={ReportSummaryCSS.reportList}>
                                        {
                                            Array.isArray(routineList1) && routineList1.map((routineReport) => (
                                                <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                    <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
                                                        {routineReport.roundTitle}
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </>
                        }
                        {routineList1 == undefined && 
                            <div className={ReportSummaryCSS.noticeContainer}>
                                <span className={ReportSummaryCSS.notice}>
                                    정기보고 내역이 없습니다.
                                </span>
                            </div>
                        }
                    </div>
                    {Array.isArray(routineList2) && 
                        <div 
                            key={routineList2.routineReportreportCode} 
                            id={routineList2.reportCode} 
                            className={ReportSummaryCSS.routineReport}
                        >
                            <div className={ReportSummaryCSS.routineReportHeader}>
                                    <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO2.reportCode}/rounds`}>
                                        <span>
                                            {reportSummary.routineReportDTO2.reportTitle}
                                        </span>
                                    </NavLink>
                            </div>
                            <div className={ReportSummaryCSS.routineReportBody}>
                                <ul className={ReportSummaryCSS.reportList}>
                                    {
                                        Array.isArray(routineList2) && routineList2.map((routineReport) => (
                                            <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
                                                    {routineReport.roundTitle}
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                    {Array.isArray(routineList3) && 
                        <div 
                            key={routineList3.routineReportreportCode} 
                            id={routineList3.reportCode} 
                            className={ReportSummaryCSS.routineReport}
                            // onClick={onClickRound}
                        >
                            <div className={ReportSummaryCSS.routineReportHeader}>
                                    <NavLink to={`/aurora/reports/${reportSummary.routineReportDTO3.reportCode}/rounds`}>
                                        <span>
                                            {reportSummary.routineReportDTO3.reportTitle}
                                        </span>
                                    </NavLink>
                            </div>
                            <div className={ReportSummaryCSS.routineReportBody}>
                                <ul className={ReportSummaryCSS.reportList}>
                                    {
                                        Array.isArray(routineList3) && routineList3.map((routineReport) => (
                                            <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
                                                    {routineReport.roundTitle}
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                <span className={ReportSummaryCSS.reportType}>비정기 보고</span>
                <div className={`${ReportSummaryCSS.casualReportContainer} ${ReportSummaryCSS.flexContainer}`}>
                    <div className={ReportSummaryCSS.casualReportDiv}>
                        <ul className={ReportSummaryCSS.reportList}>
                            {
                                Array.isArray(casualList) && casualList.slice(0, 10).map((routineReport) => (
                                    <li key={routineReport.reportCode} id={routineReport.roundCode}>
                                    <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${routineReport.reportCode}`}>
                                            {routineReport.reportTitle}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {casualList != undefined && casualList.length != 0 &&
                        <div className={ReportSummaryCSS.centerLine}/>
                    }
                    {casualList != undefined && casualList.length === 0 && 
                        <div className={ReportSummaryCSS.noticeContainer}>
                            <span className={ReportSummaryCSS.notice}>
                                비정기보고 내역이 없습니다.
                            </span>
                        </div>
                    }
                    <div className={ReportSummaryCSS.casualReportDiv}>
                        <ul className={ReportSummaryCSS.reportList}>
                            {
                                Array.isArray(casualList) && casualList.slice(10, 20).map((routineReport) => (
                                    <li key={routineReport.reportCode} id={routineReport.roundCode}>
                                        <NavLink className={ReportSummaryCSS.roundListItem} to={`/aurora/reports/casuals/${routineReport.reportCode}`}>
                                            {routineReport.reportTitle}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportSummary;