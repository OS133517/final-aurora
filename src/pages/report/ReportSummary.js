import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callReportSummaryAPI } from "../../apis/ReportAPICall";

import ReportSummaryCSS from "./ReportSummary.module.css";
import Swal from "sweetalert2";

function ReportSummary() {

    const dispatch = useDispatch();
    
    const reportSummary = useSelector(state => state.reportReducer.reportSummary);
    console.log(reportSummary);

    const casualList = reportSummary.casualList;
    const routineList1 = reportSummary.routineList1;
    const routineList2 = reportSummary.routineList2;
    const routineList3 = reportSummary.routineList3;
    
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
                                    {reportSummary.routineReportTitle1}
                                </div>
                                <div className={ReportSummaryCSS.routineReportBody}>
                                    <ul className={ReportSummaryCSS.reportList}>
                                        {
                                            Array.isArray(routineList1) && routineList1.map((routineReport) => (
                                                <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                    <NavLink className={ReportSummaryCSS.roundListItem} to={`/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
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
                                {reportSummary.routineReportTitle2}
                            </div>
                            <div className={ReportSummaryCSS.routineReportBody}>
                                <ul className={ReportSummaryCSS.reportList}>
                                    {
                                        Array.isArray(routineList2) && routineList2.map((routineReport) => (
                                            <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
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
                                {reportSummary.routineReportTitle3}
                            </div>
                            <div className={ReportSummaryCSS.routineReportBody}>
                                <ul className={ReportSummaryCSS.reportList}>
                                    {
                                        Array.isArray(routineList3) && routineList3.map((routineReport) => (
                                            <li key={routineReport.roundCode} id={routineReport.roundCode}>
                                                <NavLink className={ReportSummaryCSS.roundListItem} to={`/reports/${routineReport.reportCode}/rounds/${routineReport.roundCode}`}>
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
                    {casualList == undefined && 
                        <div className={ReportSummaryCSS.noticeContainer}>
                            <span className={ReportSummaryCSS.notice}>
                                비정기보고 내역이 없습니다.
                            </span>
                        </div>
                    }
                    <div className={ReportSummaryCSS.casualReportDiv}>
                        <ul className={ReportSummaryCSS.reportList}>
                            {
                                Array.isArray(casualList) && casualList.slice(0, 10).map((routineReport) => (
                                    <li key={routineReport.reportCode} id={routineReport.roundCode}>
                                    <NavLink className={ReportSummaryCSS.roundListItem} to={`/reports/casuals/${routineReport.reportCode}`}>
                                            {routineReport.reportTitle}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {casualList != undefined &&
                        <div className={ReportSummaryCSS.centerLine}/>
                    }
                    <div className={ReportSummaryCSS.casualReportDiv}>
                        <ul className={ReportSummaryCSS.reportList}>
                            {
                                Array.isArray(casualList) && casualList.slice(10, 20).map((routineReport) => (
                                    <li key={routineReport.reportCode} id={routineReport.roundCode}>
                                        <NavLink className={ReportSummaryCSS.roundListItem} to={`/reports/casuals/${routineReport.reportCode}`}>
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