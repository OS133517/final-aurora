import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callselectReportRoundDetailAPI,
            callSelectReportDetailListByRoundCodeAPI,
            callSelectReportRoundReplyListAPI,
            callUpdateReportRoundReplyAPI,
            callRegisterReportRoundReplyAPI,
            callDeleteReportRoundReplyAPI,
            callRegisterReportDetailAPI,
            callUpdateReportDetailAPI,
            callDeleteReportDetailAPI,
            callUpdateReportRoundAPI,
            callDeleteReportRoundAPI
        } from "../../apis/ReportAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { useNavigate } from 'react-router-dom';

import ReportRoundDetailCSS from "./ReportRoundDetail.module.css";
import Swal from "sweetalert2";

function ReportRoundDetail() {

    const navigate = useNavigate();

    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const loginMember = accessToken.memberCode;
    console.log("loginMember : " + loginMember);

    const dispatch = useDispatch();
    const { reportCode } = useParams();
    const { roundCode } = useParams();

    const [newReplyBody, setNewReplyBody] = useState('');
    const [newReportDetailBody, setNewReportDetailBody] = useState('');

    const [isReplyEditing, setIsReplyEditing] = useState({});
    const [isReportDetailEditing, setIsReportDetailEditing] = useState({});
    const [isRoundEditing, setIsRoundEditing] = useState(false);

    const [replyInputValue, setReplyInputValue] = useState({});
    const [detailInputValue, setDetailInputValue] = useState({});
    const [roundInputValue, setRoundInputValue] = useState({
        roundTitle : "",
        roundBody : ""
    });

    const [replyUpdated, setReplyUpdated] = useState(false);
    const [reportDetailUpdated, setReportDetailUpdated] = useState(false);
    const [roundUpdated, setReportRoundUpdated] = useState(false);

    const [isDetailReportInputVisible, setIsDetailReportInputVisible] = useState(false);
    const [textAreaHeight, setTextAreaHeight] = useState({});

    const reportDetailList = useSelector(state => state.reportReducer.reportDetailList);
    reportDetailList && console.log("reportDetailList : " + JSON.stringify(reportDetailList));

    // 보고 회차 상세정보 데이터 
    const reportRoundDetailData = useSelector(state => state.reportReducer.reportRoundDetailData);
    // 보고 상세 정보 
    const reportDTO = reportRoundDetailData && reportRoundDetailData.reportDTO;
    reportRoundDetailData && console.log("reportDTO : " + JSON.stringify(reportDTO));
    // 보고 책임자 정보
    const memberDTO = reportRoundDetailData && reportRoundDetailData.memberDTO;
    reportRoundDetailData && console.log("memberDTO : " + JSON.stringify(memberDTO));
    // 회차 상세 정보 
    const reportRoundDetail = reportRoundDetailData && reportRoundDetailData.reportRoundDetail;
    reportRoundDetailData && console.log("reportRoundDetail : " + JSON.stringify(reportRoundDetail));
    // 회차 댓글 목록 
    const reportRoundReplyList = useSelector(state => state.reportReducer.reportRoundReplyList);
    reportRoundReplyList && console.log("reportRoundReplyList : " + JSON.stringify(reportRoundReplyList));

    const isInCharge = reportDTO && (loginMember == reportDTO.memberCode)

    useEffect(() => {

        // 회차 상세 조회 
        dispatch(callselectReportRoundDetailAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (reportRoundDetail) {
          setRoundInputValue({
            roundTitle: reportRoundDetail.roundTitle,
            roundBody: reportRoundDetail.roundBody,
          });
        }
    }, [reportRoundDetail]);
    
    useEffect(() => {

        // 상세 보고 목록 조회 
        dispatch(callSelectReportDetailListByRoundCodeAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
        setReportDetailUpdated(false);
    // eslint-disable-next-line
    }, [reportDetailUpdated])

    useEffect(() => {

        // 보고 댓글 목록 조회 
        dispatch(callSelectReportRoundReplyListAPI({
            
            reportCode : reportCode,
            roundCode : roundCode
        }))
        setReplyUpdated(false);
    // eslint-disable-next-line
    }, [replyUpdated])
      
    // 보고회차 수정 상태 토글 함수
    const toggleRoundEditing = () => {

        if (!isRoundEditing) {

            setRoundInputValue({
            roundTitle: reportRoundDetail.roundTitle,
            roundBody: reportRoundDetail.roundBody,
            });
        }
        setIsRoundEditing((prev) => !prev);
    };

    // 보고 회차 입력값 핸들러
    const handleRoundInputChange = (part, value) => {

        setRoundInputValue((prev) => ({

            ...prev,
            [part]: value,
        }));
    };

    // 보고 회차 수정 
    const updateRound = (roundInputValue) => {

        dispatch(callUpdateReportRoundAPI({
            
            reportCode : reportRoundDetail.reportCode,
            roundCode : reportRoundDetail.roundCode,
            roundTitle : roundInputValue.roundTitle,
            roundBody : roundInputValue.roundBody
        }))
        // 수정 모드를 종료합니다.
        setIsRoundEditing(false);
        setReportRoundUpdated(!roundUpdated);
    };

    // 보고 회차 삭제 
    const deleteRound = async () => {
        
        const result = await Swal.fire({

            title: '정말 보고 회차를 삭제하시겠습니까?',
            text: '삭제된 데이터는 복구할 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (result.isConfirmed) {
            
            dispatch(callDeleteReportRoundAPI({

                roundCode: reportRoundDetail.roundCode
            }))
            navigate(`/aurora/reports/${reportRoundDetail.reportCode}/rounds`);
        }
    }

    // 상세 보고 작성 
    const onClickRegisterReportDetailHandler = () => {

        dispatch(callRegisterReportDetailAPI({

            reportCode : reportDTO.reportCode,
            roundCode : reportRoundDetail.roundCode,
            detailBody : newReportDetailBody
        }))
        setNewReportDetailBody('');
        setReportDetailUpdated(!reportDetailUpdated);
    }

    // 상세보고 수정 상태 토글 함수
    const toggleReportDetailEditing = (detailCode) => {

        setIsReportDetailEditing((prevState) => ({

            ...prevState,
            [detailCode]: !prevState[detailCode],
        }));
    };

    // 상세보고 수정 버튼 클릭시 핸들러 
    const handleReportDetailEditButtonClick = (detailCode, detailBody) => {

        setIsReportDetailEditing({ ...isReportDetailEditing, [detailCode]: true });
        setDetailInputValue({ ...detailInputValue, [detailCode]: detailBody });
    };

    // 상세보고 수정 
    const updateReportDetail = async (detailCode) => {

        dispatch(callUpdateReportDetailAPI({

            reportCode : reportRoundDetail.reportCode,
            roundCode : reportRoundDetail.roundCode,
            detailCode : detailCode,
            detailBody : detailInputValue[detailCode]
        }))
        toggleReportDetailEditing(detailCode);
        setReportDetailUpdated(!reportDetailUpdated);
    };
    
    // 상세보고 삭제 
    const onClickReportDetailDeleteHandler = async (detailCode) => {

        const result = await Swal.fire({

            title: '정말 삭제하시겠습니까?',
            text: '삭제된 데이터는 복구할 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
            
            dispatch(callDeleteReportDetailAPI({

                detailCode : detailCode
            }))
            setReportDetailUpdated(!reportDetailUpdated);
        }
    }

    // 댓글 작성 함수
    const handleCreateReply = () => {

        // 댓글 작성 API 호출
        dispatch(callRegisterReportRoundReplyAPI({

            roundCode: reportRoundDetail.roundCode,
            replyBody: newReplyBody
        }));
        // 입력된 댓글 내용 초기화
        setNewReplyBody('');
        setReplyUpdated(!replyUpdated);
    };

    // 댓글 수정 상태 토글 함수
    const toggleReplyEditing = (replyCode) => {

        setIsReplyEditing((prevState) => ({
            ...prevState,
            [replyCode]: !prevState[replyCode],
        }));
    };

    // 수정 버튼을 클릭했을 때 replyInputValue를 설정하고 수정 상태를 토글
    const handleReplyEditButtonClick = (replyCode, replyBody) => {

        setIsReplyEditing({ ...isReplyEditing, [replyCode]: true });
        setReplyInputValue({ ...replyInputValue, [replyCode]: replyBody });
    };

    // 댓글 수정 
    const updateReply = async (roundCode, replyCode) => {

        dispatch(callUpdateReportRoundReplyAPI({

            roundCode : roundCode,
            replyCode : replyCode,
            replyBody : replyInputValue[replyCode]
        }))
        toggleReplyEditing(replyCode);
        setReplyUpdated(!replyUpdated);
    };

    // 댓글 삭제 
    const onClickReplyDeleteHandler = async (replyCode) => {

        const result = await Swal.fire({

            title: '정말 삭제하시겠습니까?',
            text: '삭제된 데이터는 복구할 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });

        if (result.isConfirmed) {

            dispatch(callDeleteReportRoundReplyAPI({

                replyCode : replyCode
            }))
            setReplyUpdated(!replyUpdated);
        }
    }

    // 입력창 자동 크기 조절 
    const autoResize = (e) => {

        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    
    // textarea 자동 크기 조절 
    const handleTextAreaChange = (e, detailCode) => {

        const target = document.getElementById(`detailReportTextArea-${detailCode}`);

        if (target) {

            const computedStyle = window.getComputedStyle(target);
            const containerHeight = parseFloat(computedStyle.height);
            setTextAreaHeight({ ...textAreaHeight, [detailCode]: containerHeight });
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
                            정기 보고 회차 상세
                        </span>
                        <div className={ReportRoundDetailCSS.headerButtonDiv}>
                            {isInCharge &&
                                <button
                                    className={ReportRoundDetailCSS.redButton}
                                    onClick={() => {
                                        deleteRound()
                                    }}
                                >
                                    <span>삭제</span> 
                                </button>
                            }
                            {isInCharge &&
                                <button 
                                    className={ReportRoundDetailCSS.greentButton}
                                    onClick={() => {
                                        if(isRoundEditing) {
                                            updateRound(roundInputValue);
                                        } else {
                                            toggleRoundEditing()
                                        }
                                    }}
                                >
                                    {isRoundEditing? "완료" : "수정"}
                                </button>
                            }
                            {!isInCharge &&
                                <button
                                    className={ReportRoundDetailCSS.greentButton}
                                    onClick={() => {
                                        setIsDetailReportInputVisible(!isDetailReportInputVisible);
                                    }}
                                >
                                    {isInCharge && !isDetailReportInputVisible?
                                        <span>상세보고 작성</span> : <span>취소</span>
                                    }
                                </button>
                            }
                            <button className={ReportRoundDetailCSS.greentButton}>
                                뒤로 가기
                            </button>
                        </div>
                    </div>
                    <div style={{marginLeft:'15px'}}>
                        <p>
                            <strong>보고 제목 : </strong>
                            <span>{reportDTO && reportDTO.reportTitle} </span>
                        </p>
                        <p>
                            <strong>책임자 : </strong>
                            <span>{memberDTO && memberDTO.deptName} </span>
                            <span>{memberDTO && memberDTO.memberName} </span>
                            <span>{memberDTO && memberDTO.jobName} </span>
                        </p>
                            <strong>회차 제목 : </strong>
                            <input
                                value={roundInputValue.roundTitle}
                                readOnly={!isRoundEditing}
                                style={{
                                  width: `${
                                    roundInputValue.roundTitle.length > 0
                                      ? roundInputValue.roundTitle.length * 14
                                      : 50
                                  }px`
                                }}
                                className={!isRoundEditing ? ReportRoundDetailCSS.readOnlyInput : null}
                                onChange={(e) => handleRoundInputChange("roundTitle", e.target.value)}
                            />
                        <p>
                            <strong>회차 내용 : </strong>
                            <input
                                value={roundInputValue.roundBody}
                                readOnly={!isRoundEditing}
                                style={{
                                  width: `${
                                    roundInputValue.roundBody.length > 0
                                      ? roundInputValue.roundBody.length * 14
                                      : 50
                                  }px`
                                }}
                                className={!isRoundEditing ? ReportRoundDetailCSS.readOnlyInput : null}
                                onChange={(e) => handleRoundInputChange("roundBody", e.target.value)}
                            />
                        </p>
                        <br></br>
                        {/* 상세보고 작성 */}
                        {isDetailReportInputVisible && (
                            <div className={ReportRoundDetailCSS.detailReportRegisterDiv}>
                                <textarea
                                    type="text"
                                    className={ReportRoundDetailCSS.detailReportInput}
                                    value={newReportDetailBody}
                                    placeholder="상세보고 내용 작성"
                                    onChange={(e) => {
                                        setNewReportDetailBody(e.target.value); 
                                        autoResize(e); 
                                    }}
                                />
                                <button
                                    className={ReportRoundDetailCSS.detailReportRegisterButton}
                                    onClick={() => {
                                        setIsDetailReportInputVisible(!isDetailReportInputVisible);
                                        // 작성 처리 
                                        onClickRegisterReportDetailHandler();
                                    }}
                                >
                                    완료
                                </button>
                            </div>
                        )}
                        {/* <br></br> */}
                        {/* 상세보고 목록 */}
                        {reportDetailList && reportDetailList.map((reportDetail) => (
                            <div 
                                className={ReportRoundDetailCSS.detailReportContainer}
                                key={reportDetail.detailCode}
                            >
                                <div className={ReportRoundDetailCSS.detailReportHeader}>
                                    <span>
                                        {reportDetail.memberName} {reportDetail.jobName}
                                        <span className={ReportRoundDetailCSS.regDate}>
                                            &nbsp;&nbsp;{reportDetail.regDate}
                                        </span>
                                    </span>
                                    {reportDetail.memberCode === loginMember && (
                                        <span>
                                            <span
                                                className={ReportRoundDetailCSS.commentEdit} 
                                                onClick={() => {
                                                    if (isReportDetailEditing[reportDetail.detailCode]) {
                                                        updateReportDetail(reportDetail.detailCode);
                                                    } else {
                                                        handleReportDetailEditButtonClick(reportDetail.detailCode, reportDetail.detailBody);
                                                    }
                                                }}
                                            >
                                                { isReportDetailEditing[reportDetail.detailCode]? "완료" : "수정" }
                                            </span>
                                            <span>&nbsp;&nbsp;</span>
                                            <span
                                                className={ReportRoundDetailCSS.commentEdit}
                                                onClick={() => {
                                                    onClickReportDetailDeleteHandler(reportDetail.detailCode);
                                                }}
                                            >
                                                삭제
                                            </span>
                                        </span>
                                    )}
                                </div>
                                {/* 상세보고 내용 */}
                                <div className={ReportRoundDetailCSS.detailReportBody}>
                                    {isReportDetailEditing[reportDetail.detailCode] ? (
                                        <textarea
                                            type="text"
                                            // className={ReportRoundDetailCSS.commentContent}
                                            className={ReportRoundDetailCSS.detailReportTextArea}
                                            value={detailInputValue[reportDetail.detailCode]}
                                            readOnly={!isReportDetailEditing[reportDetail.detailCode]}
                                            onChange={(e) => {
                                                setDetailInputValue({
                                                    ...detailInputValue,
                                                    [reportDetail.detailCode] : e.target.value,
                                                })
                                                handleTextAreaChange(e, reportDetail.detailCode);
                                            }}
                                            style={{ height: textAreaHeight[reportDetail.detailCode] }}
                                        />
                                    ) : (
                                        <span className={ReportRoundDetailCSS.detailReportContent}>
                                            {reportDetail.detailBody}
                                        </span>
                                    )}
                                    {/* {isReportDetailEditing[reportDetail.detailCode] ? (
                                        <input
                                            type="text"
                                            className={ReportRoundDetailCSS.commentContent}
                                            value={detailInputValue[reportDetail.detailCode]}
                                            readOnly={!isReportDetailEditing[reportDetail.detailCode]}
                                            onChange={(e) =>
                                                setDetailInputValue({
                                                    ...detailInputValue,
                                                    [reportDetail.detailCode] : e.target.value,
                                                })
                                            }
                                        />
                                        // <textarea
                                        //     // className={ReportRoundDetailCSS.detailReportTextArea}
                                        //     className={`${ReportRoundDetailCSS.detailReportContent} ${ReportRoundDetailCSS.detailReportTextArea}`}
                                        //     // defaultValue={reportDetail.detailBody}
                                        //     value={detailInputValue[reportDetail.detailCode]}
                                        //     onChange={(e) =>
                                        //         setDetailInputValue({
                                        //             ...detailInputValue,
                                        //             [reportDetail.detailCode] : e.target.value,
                                        //         })
                                        //     }
                                        //     rows={detailInputValue[reportDetail.detailCode].split('\n').length || 1} // 행의 수를 입력 값에 따라 동적으로 변경합니다.
                                        // />
                                        // <input
                                        //     type="text"
                                        //     className={ReportRoundDetailCSS.detailReportTextArea}
                                        //     value={detailInputValue[reportDetail.detailCode]}
                                        //     onChange={(e) =>
                                        //         setDetailInputValue({
                                        //             ...detailInputValue,
                                        //             [reportDetail.detailCode]: e.target.value,
                                        //         })
                                        //     }
                                        // />
                                        // <input
                                        //     type="text"
                                        //     className={ReportRoundDetailCSS.detailReportContent}
                                        //     value={detailInputValue[reportDetail.detailCode]}
                                        //     onChange={(e) =>
                                        //         setDetailInputValue({
                                        //             ...detailInputValue,
                                        //             [reportDetail.detailCode]: e.target.value,
                                        //         })
                                        //     }
                                        // />
                                    ) : (
                                        <span className={ReportRoundDetailCSS.detailReportContent}>
                                            {reportDetail.detailBody}
                                        </span>
                                    )} */}
                                </div>
                            </div>
                        ))}
                        <div className={ReportRoundDetailCSS.commentContainer}>
                            <div className={ReportRoundDetailCSS.commentHeader}>댓글</div>
                            <div className={ReportRoundDetailCSS.commentBody}>
                                {/* 댓글 리스트 출력 */}
                                {Array.isArray(reportRoundReplyList) && reportRoundReplyList.map((reportRoundReply) => (
                                    <div 
                                        className={ReportRoundDetailCSS.comment}
                                        key={reportRoundReply.replyCode}
                                    >
                                        {/* 작성자 사진, 이름 */}
                                        <div className={ReportRoundDetailCSS.replyAuthorInfo}>
                                            <img 
                                                // src={reportRoundReply.memberImage} 
                                                src="/userSample.png" 
                                                alt="authorImg"
                                            />
                                            <span className={ReportRoundDetailCSS.commentAuthor}>
                                                {reportRoundReply.memberName}
                                            </span>
                                        </div>
                                        <div className={ReportRoundDetailCSS.commentText}>
                                            {isReplyEditing[reportRoundReply.replyCode] ? (
                                                <input
                                                    type="text"
                                                    className={ReportRoundDetailCSS.commentContent}
                                                    value={replyInputValue[reportRoundReply.replyCode]}
                                                    readOnly={!isReplyEditing[reportRoundReply.replyCode]}
                                                    onChange={(e) => 
                                                        setReplyInputValue({ 
                                                            ...replyInputValue, 
                                                            [reportRoundReply.replyCode]: e.target.value 
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <span className={ReportRoundDetailCSS.commentContent}>
                                                    {reportRoundReply.replyBody}
                                                </span>
                                            )}
                                        </div>
                                        {/* 댓글 수정 삭제 버튼 */}
                                        <div className={ReportRoundDetailCSS.commentEditDiv}>
                                            {reportRoundReply.memberCode === loginMember && (
                                                <>
                                                    <span
                                                        className={ReportRoundDetailCSS.commentEdit} 
                                                        onClick={() => {
                                                            if(isReplyEditing[reportRoundReply.replyCode]) {
                                                                updateReply(reportRoundReply.roundCode, reportRoundReply.replyCode, replyInputValue[reportRoundReply.replyCode]);
                                                            } else {
                                                                handleReplyEditButtonClick(reportRoundReply.replyCode, reportRoundReply.replyBody);
                                                            }
                                                        }}
                                                    >
                                                        { isReplyEditing[reportRoundReply.replyCode]? "완료" : "수정" }
                                                    </span>
                                                    <span>&nbsp;&nbsp;</span>
                                                    <span
                                                        className={ReportRoundDetailCSS.commentEdit}
                                                        onClick={() => {
                                                            onClickReplyDeleteHandler(reportRoundReply.replyCode);
                                                        }}
                                                    >
                                                        삭제
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 댓글 작성 */}
                            <div className={ReportRoundDetailCSS.inputDiv}>
                                <input
                                    type="text"
                                    className={ReportRoundDetailCSS.commentInput} 
                                    value={newReplyBody}
                                    onChange={(e) => setNewReplyBody(e.target.value)}
                                />
                                <button
                                    className={ReportRoundDetailCSS.replyRegisterButton}
                                    onClick={handleCreateReply}
                                >
                                    작성
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportRoundDetail;