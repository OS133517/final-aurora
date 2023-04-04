import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { callselectReportRoundDetailAPI,
            callSelectReportDetailListByRoundCodeAPI,
            callSelectReportRoundReplyListAPI,
            callUpdateReportRoundReplyAPI,
            callRegisterReportRoundReplyAPI,
            callDeleteReportRoundReplyAPI } from "../../apis/ReportAPICall";
import { updateReportStatus } from '../../modules/ReportModule';
import { decodeJwt } from "../../utils/tokenUtils";

import ReportRoundDetailCSS from "./ReportRoundDetail.module.css";
import Swal from "sweetalert2";

function ReportRoundDetail() {

    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const loginMember = accessToken.memberCode;
    console.log("loginMember : " + loginMember);

    const dispatch = useDispatch();
    const { reportCode } = useParams();
    const { roundCode } = useParams();
    const [isReplyEditing, setIsReplyEditing] = useState({});
    const [newReplyBody, setNewReplyBody] = useState('');
    const [inputValue, setInputValue] = useState({});
    const [replyUpdated, setReplyUpdated] = useState(false);

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

    const isReportUpdated = useSelector(state => state.reportReducer.isReportUpdated);

    useEffect(() => {

        // 회차 상세 조회 
        dispatch(callselectReportRoundDetailAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
    // eslint-disable-next-line
    }, [])
    
    useEffect(() => {

        // 상세 보고 목록 조회 
        dispatch(callSelectReportDetailListByRoundCodeAPI({

            reportCode : reportCode,
            roundCode : roundCode
        }))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {

        // 보고 댓글 목록 조회 
        dispatch(callSelectReportRoundReplyListAPI({
            
            reportCode : reportCode,
            roundCode : roundCode
        }))
        setReplyUpdated(false);
        // setReplyUpdated(!replyUpdated);
    // eslint-disable-next-line
    }, [replyUpdated])
      
    // 댓글 작성 함수
    const handleCreateReply = () => {

        // 댓글 작성 API 호출을 추가합니다.
        dispatch(callRegisterReportRoundReplyAPI({

            roundCode: reportRoundDetail.roundCode,
            replyBody: newReplyBody
        }));
        // 입력된 댓글 내용을 초기화합니다.
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

    // 수정 버튼을 클릭했을 때 inputValue를 설정하고 수정 상태를 토글
    const handleEditButtonClick = (replyCode, replyBody) => {

        setIsReplyEditing({ ...isReplyEditing, [replyCode]: true });
        setInputValue({ ...inputValue, [replyCode]: replyBody });
    };

    // 댓글 수정 
    const updateReply = async (roundCode, replyCode) => {

        try {
            // console.log("replyBody : " + JSON.stringify(replyBody));
            dispatch(callUpdateReportRoundReplyAPI({

                roundCode : roundCode,
                replyCode : replyCode,
                replyBody: inputValue[replyCode]
                // replyBody : replyBody
            }))
            toggleReplyEditing(replyCode);
            setReplyUpdated(!replyUpdated);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "댓글 수정 실패",
                text: "댓글 수정 중 오류가 발생했습니다.",
            });
        }
    };

    // 댓글 삭제 
    const onClickReplyDeleteHandler = (replyCode) => {

        dispatch(callDeleteReportRoundReplyAPI({

            replyCode : replyCode
        }))
        setReplyUpdated(!replyUpdated);
    }

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
                            <button className={ReportRoundDetailCSS.greentButton}>
                                수정
                            </button>
                            <button className={ReportRoundDetailCSS.greentButton}>
                                상세보고 작성
                            </button>
                            <button className={ReportRoundDetailCSS.greentButton}>
                                뒤로 가기
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
                        {/* 상세보고 작성 */}
                        <div className={ReportRoundDetailCSS.detailReportRegisterDiv}>
                            <input
                            type="text"
                            className={ReportRoundDetailCSS.detailReportInput}
                            placeholder="상세보고 작성"
                            />
                        </div>
                        <br></br>
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
                                        {/* <button>수정</button> */}
                                    </span>
                                    <span 
                                        className={ReportRoundDetailCSS.commentEdit} 
                                    >
                                        수정
                                    </span>
                                    {/* <span className={ReportRoundDetailCSS.commentEdit} onClick={() => handleEditComment(reportDetail.detailCode)}>수정</span> */}
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
                                            {/* <span className={ReportRoundDetailCSS.commentContent}>{reportRoundReply.replyBody}</span> */}
                                            {isReplyEditing[reportRoundReply.replyCode] ? (
                                                <input
                                                    type="text"
                                                    className={ReportRoundDetailCSS.commentContent}
                                                    // value={isReplyEditing[reportRoundReply.replyCode]? inputValue[reportRoundReply.replyCode] : reportRoundReply.replyBody}
                                                    value={inputValue[reportRoundReply.replyCode]}
                                                    readOnly={!isReplyEditing[reportRoundReply.replyCode]}
                                                    onChange={(e) => 
                                                        setInputValue({ 
                                                            ...inputValue, 
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
                                        <div className={ReportRoundDetailCSS.commentEditDiv}>
                                            {reportRoundReply.memberCode === loginMember && (
                                                <span
                                                    className={ReportRoundDetailCSS.commentEdit} 
                                                    onClick={() => {
                                                        if (isReplyEditing[reportRoundReply.replyCode]) {
                                                            updateReply(reportRoundReply.roundCode, reportRoundReply.replyCode, inputValue[reportRoundReply.replyCode]);
                                                        } else {
                                                            // setIsReplyEditing({...isReplyEditing, [reportRoundReply.replyCode]: true});
                                                            // setReplyBody({...replyBody, [reportRoundReply.replyCode]: reportRoundReply.replyBody});
                                                            handleEditButtonClick(reportRoundReply.replyCode, reportRoundReply.replyBody);
                                                        }
                                                    }}
                                                >
                                                    { isReplyEditing[reportRoundReply.replyCode]? "완료" : "수정" }
                                                </span>
                                            )}
                                            <span>&nbsp;&nbsp;</span>
                                            <span
                                                className={ReportRoundDetailCSS.commentEdit}
                                                onClick={() => {
                                                    onClickReplyDeleteHandler(reportRoundReply.replyCode);
                                                }}
                                            >
                                                삭제
                                            </span>
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