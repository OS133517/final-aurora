import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { callSelectReportDetailAPI,
            callDeleteReportAPI 
        } from "../../apis/ReportAPICall";

import ReportRoundDetailCSS from "./ReportRoundDetail.module.css";
import Swal from "sweetalert2";

function CasualReportDetail() { 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const { reportCode } = useParams();
    // console.log("reportCode : " + reportCode);

    const reportDetail = useSelector(state => state.reportReducer.reportDetail);
    // reportDetail && console.log("casualReportDetail : " + JSON.stringify(reportDetail));

    // const reportRoundDetailData = useSelector(state => state.reportReducer.reportRoundDetailData);
    // reportRoundDetailData && console.log("reportRoundDetailData : " + JSON.stringify(reportRoundDetailData));
    // // const reportRoundDTO = reportRoundDetailData.reportRoundDTO;
    // // reportRoundDetailData && console.log("reportRoundDTO : " + JSON.stringify(reportRoundDTO));
    // const memberDTO = reportDetail.memberDTO;
    // reportDetail && console.log("memberDTO : " + JSON.stringify(memberDTO));
    // const reportRoundDetail = reportRoundDetailData.reportRoundDetail;
    // reportRoundDetailData && console.log("reportRoundDetail : " + JSON.stringify(reportRoundDetail));
    const reportDTO = reportDetail.reportDTO;
    // reportDetail && console.log("reportDTO : " + JSON.stringify(reportDTO));
    const reporterDetail = reportDetail.reporterDetail;
    // reportDetail && console.log("reporterDetail : " + JSON.stringify(reporterDetail));
    const fileList = reportDetail.fileList;
    // reportDetail && console.log("fileList : " + JSON.stringify(fileList));

    const isReporter = accessToken?.memberCode == reporterDetail?.memberCode; 
    const isCompleted = reportDTO && reportDTO.completionStatus == 'Y';
    reportDetail && console.log("isReporter : " + JSON.stringify(isReporter));

    useEffect(() => {

        // 회차 상세 조회 
        dispatch(callSelectReportDetailAPI({

            reportCode : reportCode
        }))
    // eslint-disable-next-line
    }, [reportCode])

    // 보고 삭제 
    const deleteReport = async () => {

        const result = await Swal.fire({

            title: '정말 보고를 완료하시겠습니까?',
            text: '완료된 보고는 수정할 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (result.isConfirmed) {
            
            dispatch(callDeleteReportAPI({

                reportCode : reportCode
            }))
            navigate(`/aurora/reports/casuals?completionStatus=N&offset=1`)

            window.history.pushState(null, "", window.location.pathname);
            window.onpopstate = function (event) {
            window.history.pushState(null, "", window.location.pathname);
            };
        }
    }

    // 파일 다운로드 
    const downloadFile = async (fileName, fileOriginName, filePath) => {
        
        const fullFilePath = `http://${process.env.REACT_APP_RESTAPI_IP}:8090${filePath}`; // 상대 경로를 전체 URL로 변경합니다.
 
        try{
            const response = await fetch(fullFilePath);
            const blob = await response.blob();
            
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileOriginName;
            link.click();
            link.remove();
        } catch(error) {
            console.error("파일 다운로드 실패!", error);
        }
    };    

    return (
        <>
            <div className={ReportRoundDetailCSS.reportsContainer}>
                <div className={ReportRoundDetailCSS.reportsHeader}>
                    보고서 확인 
                </div>
                <div className={ReportRoundDetailCSS.reportsDiv}>
                    <div className={ReportRoundDetailCSS.detailHeader}>
                        <span className={ReportRoundDetailCSS.detailHeaderTitle}>
                            비정기보고 상세 조회
                        </span>
                        <div className={ReportRoundDetailCSS.headerButtonDiv}>
                            {/* 보고자일때만 출력 */}
                            {!isCompleted && isReporter && 
                                <>
                                    <button
                                        className={ReportRoundDetailCSS.redButton}
                                        onClick={() => {
                                            deleteReport()
                                        }}
                                    >
                                        <span>보고 완료</span> 
                                    </button>
                                    <button 
                                        className={ReportRoundDetailCSS.greentButton}
                                        onClick={() => {
                                            navigate('/aurora/reports/edit', { state: { isEdit: true, reportCode: reportDTO.reportCode } });
                                        }}
                                    >
                                        <span>보고 수정</span>
                                    </button>
                                </>
                            }
                            <button 
                                className={ReportRoundDetailCSS.greentButton}
                                onClick={() => navigate(-1)}
                            >
                                뒤로 가기
                            </button>
                        </div>
                    </div>
                        <br></br>
                    <div style={{marginLeft:'15px'}}>
                        {/* 보고 정보 */}
                        <div>
                            <p>
                                <strong>보고 제목 : </strong>
                                <span>{reportDTO && reportDTO.reportTitle} </span>
                            </p>
                            <p>
                                <strong>보고자 : </strong>
                                <span>
                                    {reporterDetail && 
                                        <span>{reporterDetail.deptName} {reporterDetail.memberName} {reporterDetail.jobName}</span>
                                        // <span>{reportDTO?.memberDTO?.deptName} {reportDTO?.memberDTO?.memberName} {reportDTO?.memberDTO?.jobName}</span>
                                    } 
                                </span>
                            </p>
                            <p>
                                <strong>보고 일시 : </strong>
                                <span>{reportDTO && reportDTO.regDate} </span>
                            </p>
                            <p>
                                <strong>보고 정보 : </strong>
                                <span>{reportDTO && reportDTO.reportInfo} </span>
                            </p>
                        </div>
                        <br></br>
                        {/* 첨부파일 */}
                        <div 
                            className={ReportRoundDetailCSS.detailReportContainer}
                            key={reportDetail.detailCode}
                        >
                            {/* 첨부파일 목록 */}
                            <div className={ReportRoundDetailCSS.detailReportHeader}>
                                첨부 파일
                            </div>
                            <div>
                                {fileList && fileList.length === 0? 
                                    <ul>
                                        <li>첨부된 파일이 없습니다.</li> 
                                    </ul> : 
                                    <ul>
                                        {fileList?.map((file, index) => (
                                            <li 
                                                key={index}
                                            >
                                                <span 
                                                    onClick={() => downloadFile(file.fileName, file.fileOriginName, file.filePath)}
                                                >
                                                <img 
                                                    src={'/fileIcon.png'}
                                                    className={ReportRoundDetailCSS.fileImg}
                                                /> 
                                                &nbsp;
                                                    {file.fileOriginName} ({file.fileSize})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CasualReportDetail;