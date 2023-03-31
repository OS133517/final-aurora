import { useLocation } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callReportSummaryAPI } from "../../apis/ReportAPICall";

import ReportSummaryCSS from "./ReportSummary.module.css";
import Swal from "sweetalert2";

function Reports() {

    const location = useLocation();

    // 쿼리 파라미터 파싱
    const queryParams = new URLSearchParams(location.search);
    const a = queryParams.get('a');

    return (
        <>
            <div className={ReportSummaryCSS.container}>
                reports 페이지
            </div>
            <div>
            <h1>Query Parameter a: {a}</h1>
            </div>
        </>
    )
}

export default Reports;