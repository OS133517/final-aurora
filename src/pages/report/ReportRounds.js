import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callSelectReportRoundListAPI,
            callDeleteReportAPI 
        } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import ReportsCSS from "./Reports.module.css";
import Swal from "sweetalert2";

function ReportRounds() {

    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const loginMember = accessToken.memberCode;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reportCode } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [reportUpdated, setReportUpdated] = useState(false);
    const [reportInputValue, setReportInputValue] = useState({
        reportTitle : "",
        reportInfo : ""
    });

    // 보고 회차 목록 데이터
    const reportRoundData = useSelector(state => state.reportReducer.reportRoundData);
    // reportRoundData && console.log("reportRoundData : " + JSON.stringify(reportRoundData));
    // 보고 회차 목록 
    const reportRoundList = reportRoundData && reportRoundData?.data?.reportRoundList;
    // reportRoundData && console.log("reportRoundList : " + JSON.stringify(reportRoundList));
    // 보고 정보
    const reportDTO = reportRoundData && reportRoundData?.data?.reportDTO;
    // reportRoundData && console.log("reportDTO : " + JSON.stringify(reportDTO));
    // 페이지 정보 
    const pageInfo = reportRoundData && reportRoundData?.pageInfo;
    // reportRoundData && console.log("pageInfo : " + JSON.stringify(pageInfo));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    const isInCharge = reportDTO && (loginMember == reportDTO.memberCode)

    // 목록 조회 
    useEffect(() => {

        dispatch(callSelectReportRoundListAPI({

            reportCode : reportCode,
            offset : currentPage
        }))
        setReportUpdated(false);
    // eslint-disable-next-line
    }, [currentPage])

    // 수정 모드 토글 
    const toggleEditing = () => {

        if (!isEditing) {

            setReportInputValue({
                reportTitle: reportDTO.reportTitle,
                reportInfo: reportDTO.reportInfo,
            });
        }
        setIsEditing((prev) => !prev);
    };

    // 보고 회차 입력값 핸들러
    const handleReportInputChange = (part, value) => {

        setReportInputValue((prev) => ({

            ...prev,
            [part]: value,
        }));
    };

    // 보고 수정 
    const updateReport = (reportInputValue) => {

        // dispatch
        // 예시: dispatch(updateReportAPI({ reportCode, newTitle, newNotice }));

        // dispatch(callUpdateReportRoundAPI({
            
        //     reportCode : reportRoundDetail.reportCode,
        //     roundCode : reportRoundDetail.roundCode,
        //     roundTitle : roundInputValue.roundTitle,
        //     roundBody : roundInputValue.roundBody
        // }))
        dispatch(callUpdateReportAPI({

            
        }))
        setIsEditing(false);
        setReportUpdated(!reportUpdated);
    };

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
            navigate(`/aurora/reports/routines?completionStatus=N&offset=1`)

            window.history.pushState(null, "", window.location.pathname);
            window.onpopstate = function (event) {
                window.history.pushState(null, "", window.location.pathname);
            };
        }
    }

    // 회차 클릭시 
    const onClickRoundHandler = (reportCode, roundCode) => {
        
        navigate(`/aurora/reports/${reportCode}/rounds/${roundCode}`)
    }

    return (
        <>
            {reportDTO &&
                <div className={ReportsCSS.reportsContainer}>
                {/* {updateModalIsOn? <AddBookUpdateModal updateList={updateList} setUpdateModalIsOn={setUpdateModalIsOn}/> : null} */}
                    <div className={ReportsCSS.reportsHeader}>
                        보고서 확인 
                    </div>
                    <div className={ReportsCSS.roundsHeader}>
                        <span className={ReportsCSS.roundsTitle}>
                            정기 보고 회차
                        </span>
                        <div className={ReportsCSS.headerButtonDiv}>
                            {/* {isInCharge && */}
                                <button
                                    className={ReportsCSS.redButton}
                                    onClick={() => {
                                        deleteReport()
                                    }}
                                >
                                    <span>보고 완료</span> 
                                </button>
                                <button 
                                    className={ReportsCSS.greentButton}
                                    onClick={() => {
                                        if(isEditing) {
                                            updateReport();
                                        } else {
                                            toggleEditing()
                                        }
                                    }}
                                >
                                    {isEditing? "완료" : "보고 수정"}
                                </button>
                                <button
                                    className={ReportsCSS.greentButton}
                                    onClick={() => {
                                        // setIsDetailReportInputVisible(!isDetailReportInputVisible);
                                    }}
                                >
                                    <span>회차 추가</span>
                                </button>
                            {/* } */}
                            <button className={ReportsCSS.greentButton}>
                                뒤로 가기
                            </button>
                        </div>
                    </div>
                    <div className={ReportsCSS.reportsDiv}>
                        <div className={ReportsCSS.reportsInfo}>
                            <p>
                                <strong>보고 제목 : </strong>
                                {/* {reportDTO.reportTitle} */}
                                <input
                                    value={reportInputValue.reportTitle}
                                    readOnly={!isEditing}
                                    style={{
                                    width: `${
                                        reportInputValue.reportTitle.length > 0
                                        ? reportInputValue.reportTitle.length * 14
                                        : 50
                                    }px`
                                    }}
                                    className={!isEditing ? ReportsCSS.readOnlyInput : null}
                                    onChange={(e) => handleReportInputChange("reportTitle", e.target.value)}
                                />
                            </p>
                            <p>
                                <strong>책임자 : </strong>
                                <span>{reportDTO.memberDTO.deptName} </span>
                                <span>{reportDTO.memberDTO.memberName} </span>
                                <span>{reportDTO.memberDTO.jobName} </span>
                            </p>
                            <p>
                                <strong>보고 공지 : </strong>
                                {/* {reportDTO.reportInfo} */}
                                <input
                                    value={reportInputValue.reportInfo}
                                    readOnly={!isEditing}
                                    style={{
                                    width: `${
                                        reportInputValue.reportInfo.length > 0
                                        ? reportInputValue.reportInfo.length * 14
                                        : 50
                                    }px`
                                    }}
                                    className={!isEditing ? ReportsCSS.readOnlyInput : null}
                                    onChange={(e) => handleReportInputChange("reportInfo", e.target.value)}
                                />
                            </p>
                        </div>
                        <table className={ReportsCSS.reportsTable}>
                            <thead>
                                <tr>
                                    <th className={ReportsCSS.columnRegDate}>등록일</th>
                                    <th className={ReportsCSS.columnTitle}>제목</th>
                                    <th className={ReportsCSS.columnStatus}>보고 현황</th>
                                    {/* <th>부서</th>
                                    <th>이름</th>
                                    <th>직급</th> */}
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
                                        <td>{reportRound.regDate}</td>
                                        <td>
                                            {reportRound.roundTitle} 
                                            {reportRound.replyCount != 0 &&
                                                <span className={ReportsCSS.replyCount}>
                                                    &nbsp;[{reportRound.replyCount}]
                                                </span>
                                            }
                                        </td>
                                        <td className={ReportsCSS.columnRegDateTd}>{reportRound.reportedMemberCount} / {reportRound.capacity}</td>
                                        {/* <td>{reportRound.memberDTO.deptName}</td>
                                        <td>{reportRound.memberDTO.memberName}</td>
                                        <td>{reportRound.memberDTO.jobName}</td> */}
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