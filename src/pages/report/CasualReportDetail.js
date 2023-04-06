import { useLocation } from 'react-router-dom';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callselectReportRoundDetailAPI,
            callSelectReportDetailListByRoundCodeAPI } from "../../apis/ReportAPICall";

import ReportRoundDetailCSS from "./ReportRoundDetail.module.css";
import Swal from "sweetalert2";

function CasualReportDetail() { 

    const dispatch = useDispatch();
    const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    // const { reportCode } = useParams();
    console.log("reportCode : " + reportCode);
    const { roundCode } = useParams();
    console.log("roundCode : " + roundCode);

    const reportDetailList = useSelector(state => state.reportReducer.reportDetailList);
    reportDetailList && console.log("reportDetailList : " + JSON.stringify(reportDetailList));

    const reportRoundDetailData = useSelector(state => state.reportReducer.reportRoundDetailData);
    reportRoundDetailData && console.log("reportRoundDetailData : " + JSON.stringify(reportRoundDetailData));
    // const reportRoundDTO = reportRoundDetailData.reportRoundDTO;
    // reportRoundDetailData && console.log("reportRoundDTO : " + JSON.stringify(reportRoundDTO));
    const memberDTO = reportRoundDetailData.memberDTO;
    reportRoundDetailData && console.log("memberDTO : " + JSON.stringify(memberDTO));
    const reportRoundDetail = reportRoundDetailData.reportRoundDetail;
    reportRoundDetailData && console.log("reportRoundDetail : " + JSON.stringify(reportRoundDetail));
    const reportDTO = reportRoundDetailData.reportDTO;
    reportRoundDetailData && console.log("reportDTO : " + JSON.stringify(reportDTO));

    useEffect(() => {

        // 회차 상세 조회 
        dispatch(callselectReportRoundDetailAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
        // 상세 보고 목록 조회 
        dispatch(callSelectReportDetailListByRoundCodeAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className={ReportRoundDetailCSS.reportsContainer}>
                <div className={ReportRoundDetailCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div className={ReportRoundDetailCSS.reportsDiv}>
                    <div className={ReportRoundDetailCSS.detailHeader}>
                        <span className={ReportRoundDetailCSS.detailHeaderTitle}>
                            비정기보고 상세 조회 페이지
                        </span>
                        <div className={ReportRoundDetailCSS.headerButtonDiv}>
                            <button>
                                수정
                            </button>
                            <button>
                                삭제
                            </button>
                            <button>
                                확인
                            </button>
                        </div>
                    </div>
                    <div style={{marginLeft:'15px'}}>
                        <p>
                            <span>{reportDTO && reportDTO.reportTitle} </span>
                            <span> / 책임자 : </span>
                            <span>{memberDTO && memberDTO.deptName} </span>
                            <span>{memberDTO && memberDTO.jobName} </span>
                            <span>{memberDTO && memberDTO.memberName}</span>
                        </p>
                        <span>
                            {reportRoundDetail && reportRoundDetail.roundTitle}
                        </span>
                        <br></br>
                        <br></br>
                        {/* 상세보고 목록 */}
                        {reportDetailList && reportDetailList.map((reportDetail) => (
                            <div className={ReportRoundDetailCSS.detailReportContainer}>
                                <div className={ReportRoundDetailCSS.detailReportHeader}>
                                    <span>
                                        {reportDetail.memberName} {reportDetail.jobName}
                                        <span className={ReportRoundDetailCSS.regDate}>
                                            &nbsp;&nbsp;{reportDetail.regDate}
                                        </span>
                                        {/* <span>수정</span> */}
                                        <button>수정</button>
                                    </span>
                                </div>
                                <div className={ReportRoundDetailCSS.detailReportBody}>
                                    {reportDetail.detailBody}
                                </div>
                            </div>
                        ))}
                        <div className={ReportRoundDetailCSS.commentContainer}>
                            <div className={ReportRoundDetailCSS.commentHeader}>댓글</div>
                            <div className={ReportRoundDetailCSS.commentBody}>
                                {/* 댓글 리스트 출력 */}
                                <div className={ReportRoundDetailCSS.comment}>
                                    {/* 작성자사진  */}
                                    {/* <img src={}/> */}
                                    작성자 
                                    댓글내용 // 수정 / 댓글
                                </div>
                                <div className={ReportRoundDetailCSS.commentInputDiv}>
                                    <span>사진</span>
                                    <input
                                        type='text'
                                    />
                                    <button>작성</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CasualReportDetail;