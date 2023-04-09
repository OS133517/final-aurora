import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callSelectReportRoundListAPI,
            callDeleteReportAPI,
            callRegisterReportRoundAPI
        } from "../../apis/ReportAPICall";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";

import ReportsCSS from "./Reports.module.css";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ReportRounds() {

    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const loginMember = accessToken.memberCode;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reportCode } = useParams();
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportUpdated, setReportUpdated] = useState(false);
    const [reportRoundInputValue, setReportRoundInputValue] = useState({
        roundTitle : "",
        roundBody : ""
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
    }, [currentPage, reportCode, reportUpdated])

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

    // 보고 회차 등록 
    const registerReportRound = () => {

    }

    // 모달 
    const openModal = () => {

        setModalIsOpen(true);
    };

    const closeModal = () => {

        setModalIsOpen(false);
    };
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        // reportRoundData && console.log("reportRoundInputValue : " + JSON.stringify(reportRoundInputValue));

        dispatch(callRegisterReportRoundAPI({
            
                reportCode : reportDTO.reportCode,
                roundTitle : reportRoundInputValue.roundTitle,
                roundBody : reportRoundInputValue.roundBody
        }))
        setReportUpdated(!reportUpdated);
        closeModal();
    };

    const onChangeHandler = (e) => {

        const { name, value } = e.target;
    
        setReportRoundInputValue((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            {reportDTO &&
                <div className={ReportsCSS.reportsContainer}>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Create Report"
                        className={ReportsCSS.modal}
                        overlayClassName={ReportsCSS.modalOverlay}
                    >
                        <h2>보고 회차 작성</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title"><strong>보고 회차 제목 : </strong></label>
                                    <input
                                        type="text"
                                        name="roundTitle"
                                        value={reportRoundInputValue.roundTitle}
                                        onChange={onChangeHandler}
                                        />
                                <br />
                            </div>
                            <div>
                                <label htmlFor="content"><strong>보고 회차 내용 : </strong></label>
                                    <input
                                        type="text"
                                        name="roundBody"
                                        value={reportRoundInputValue.roundBody}
                                        onChange={onChangeHandler}
                                        />
                                <br />
                            </div>    
                            <div className={ReportsCSS.buttonContainer}>
                                <button 
                                    type="submit"
                                    onClick={() => registerReportRound()}
                                    className={ReportsCSS.greentButton}
                                >
                                    작성
                                </button>
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className={ReportsCSS.greentButton}
                                    style={{marginLeft: "50px"}}
                                >
                                    취소
                                </button>
                            </div>
                        </form>
                    </Modal>
                    <div className={ReportsCSS.reportsHeader}>
                        보고서 확인 
                    </div>
                    <div className={ReportsCSS.roundsHeader}>
                        <span className={ReportsCSS.roundsTitle}>
                            정기 보고 회차 목록
                        </span>
                        {/* 버튼 컨테이너 */}
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
                                        navigate('/aurora/reports/edit', { state: { isEdit: true, reportCode: reportDTO.reportCode } });
                                    }}
                                >
                                    보고 수정
                                </button>
                                <button
                                    className={ReportsCSS.greentButton}
                                    onClick={() => {
                                        openModal()
                                        // registerReportRound();
                                        // setIsDetailReportInputVisible(!isDetailReportInputVisible);
                                    }}
                                >
                                    <span>회차 추가</span>
                                </button>
                            {/* } */}
                            <button 
                                className={ReportsCSS.greentButton}
                                onClick={() => navigate(-1)}
                            >
                                뒤로 가기
                            </button>
                        </div>
                    </div>
                    {/* 보고 목록 컨테이너 */}
                    <div className={ReportsCSS.reportsDiv}>
                        {/* 보고 정보 */}
                        <div className={ReportsCSS.reportsInfo}>
                            <p>
                                <strong>보고 제목 : </strong>
                                {reportDTO.reportTitle}
                            </p>
                            <p>
                                <strong>책임자 : </strong>
                                <span>{reportDTO.memberDTO.deptName} </span>
                                <span>{reportDTO.memberDTO.memberName} </span>
                                <span>{reportDTO.memberDTO.jobName} </span>
                            </p>
                            <p>
                                <strong>보고 공지 : </strong>
                                {reportDTO.reportInfo}
                            </p>
                        </div>
                        {/* 보고 게시판 */}
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
                                        <td className={ReportsCSS.columnTextAlignTd}>{reportRound.reportedMemberCount} / {reportRound.capacity}</td>
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