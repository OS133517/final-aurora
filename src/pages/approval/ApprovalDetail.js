import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { callApprovalDetailAPI, callPutApprovalAPI, callPutApprovalLine } from "../../apis/ApprovalAPICalls";
import { callMemberDetailAPI } from "../../apis/MemberAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import Swal from 'sweetalert2';
import approvalDetailCSS from "./Approvals.module.css"

function ApprovalDetail() {

    /** jwt */
    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));

    /** useLocation */
    // approvalForm 컴포넌트에서 documentDTO을 가져오기 위한 hook
    const location = useLocation();

    /** useParams */
    const paramAppCode = useParams("appCode");

    /** useDispatch */
    const dispatch = useDispatch();

    /** useSelector */
    const detailInfo = useSelector(state => state.approvalReducer.approvalLine);
    const memberInfo = useSelector(state => state.memberReducer.memberDetail);

    /** useState */
    // CALLAPI에서 응답 상태를 가져옴
    const [responseStatus, setResponseStatus] = useState(0)
    // 결재상태 변경 여부
    const [approvalLineStatus, setApprovalLineStatus] = useState([]);

    /** 변수 */
    /** @param documentDTO 문서 DTO*/
    const docName = detailInfo?.detailApproval?.documentDTO?.docName;
    /** @param loginCode 로그인한 유저의 코드*/
    const loginCode = loginMember.memberCode;

    /** @param memberCode 작성한 유저의 코드*/
    const memberCode = detailInfo?.detailApproval?.memberDTO?.memberCode;

    /** @param memberName 작성한 유저의 이름*/
    const memberName = memberInfo?.memberDTO?.memberName;

    /** @param firstNStatus appStatus가 n인 첫번째 배열 값*/
    const firstNStatus = detailInfo?.approvalLine?.find(line => line.appStatus === 'n');
    /** @param approvalMember 승인할 유저의 코드*/
    const approvalMemberCode = firstNStatus?.memberDTO?.memberCode;
    // console.log('first', approvalMemberCode);

    // console.log('(find 메서드)승인할 유저의 DTO : ', firstNStatus?.memberDTO);
    // console.log('승인할 유저의 코드 : ', approvalMemberCode);
    /** useEffect */
    // 결재 상세조회 , 결재, 결재선
    useEffect(() => {
        const fetchData = async () => {

            await dispatch(callApprovalDetailAPI({ appCode: paramAppCode.appCode }));
        };

        fetchData();
        //eslint-disable-next-line
    }, []);

    // 멤버의 상세정보 조회 
    useEffect(() => {
        const fetchMemberData = async () => {

            if (memberCode) {
                await dispatch(callMemberDetailAPI({ memberCode: memberCode }));

            }
        };

        fetchMemberData();
        //eslint-disable-next-line
    }, [memberCode]);

    // 결재상태가 변경될 때 마다 approvalLineStatus배열에 저장
    useEffect(() => {
        if (detailInfo?.approvalLine) {
            // appStatus 상태들만 모아둔 배열
            const newApprovalLineStatus = detailInfo.approvalLine.map(line => line.appStatus);
            setApprovalLineStatus(newApprovalLineStatus);
        }

        if (approvalLineStatus) {
            if (approvalLineStatus.every(status => status === "y")) {
                dispatch(callPutApprovalAPI({
                    appCode: paramAppCode.appCode,
                    appStatus: 'y'
                }));
            } else if (approvalLineStatus.some(status => status === "w")) {
                dispatch(callPutApprovalAPI({
                    appCode: paramAppCode.appCode,
                    appStatus: 'w'
                }));
            } else if (approvalLineStatus.some(status => status === "y")) {
                dispatch(callPutApprovalAPI({
                    appCode: paramAppCode.appCode,
                    appStatus: 'p'
                }));
            }
        }
        console.log('approvalLineStatus', approvalLineStatus);
        //eslint-disable-next-line
    }, [detailInfo?.approvalLine, approvalLineStatus]);

    useEffect(() => {
        if (responseStatus === 200) {
            Swal.fire({
                icon: "success",
                title: "성공",
                text: "결재 라인이 성공적으로 등록되었습니다.",
            }).then(() => {
                window.location.reload();
            });
        }
    }, [responseStatus]);
    /** event */
    // 이전 페이지로 이동하기 위해
    const backEvent = () => {
        window.history.back();
    }

    const approvalOkHandler = () => {
        dispatch(callPutApprovalLine({
            appCode: paramAppCode.appCode,
            approvalDTO: firstNStatus,
            appStatus: 'y'
        }, setResponseStatus));

    }

    const approvalDenyHandler = () => {
        dispatch(callPutApprovalLine({
            appCode: paramAppCode.appCode,
            approvalDTO: firstNStatus,
            appStatus: 'w'
        }, setResponseStatus));


    }

    return (
        <div className={approvalDetailCSS.detailBox}>
            <div className={approvalDetailCSS.detailView}>
                <div className={approvalDetailCSS.buttonBox}>
                    <button onClick={backEvent}>목록</button>
                </div>
                <table className={approvalDetailCSS.detailtable}>
                    <thead>
                        <tr>
                            <td className={approvalDetailCSS.detaildocName} colSpan="2">
                                <h1>{docName}</h1>
                            </td>
                        </tr>
                    </thead>
                    <tbody className={approvalDetailCSS.detailBody}>
                        <tr>
                            <td className={approvalDetailCSS.detailTitle}>
                                제목
                            </td>
                            <td className={approvalDetailCSS.description}>
                                <label>{detailInfo?.detailApproval?.appTitle}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className={approvalDetailCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={approvalDetailCSS.description}>
                                {memberName && <label>{memberName}</label>}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className={approvalDetailCSS.detailDescript}>
                                {detailInfo?.detailApproval?.appDescript}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className={approvalDetailCSS.approvalLineBox}>
                <div className={approvalDetailCSS.titleBox}>
                    <img src={process.env.PUBLIC_URL + "/checkApproval.png"} alt="Check Approval" />
                    <h5>결재선</h5>
                </div>
                {
                    detailInfo?.approvalLine?.sort((a, b) => {
                        if (a.memberDTO.memberCode < b.memberDTO.memberCode) {

                            return 1;
                        }
                        if (a.memberDTO.memberCode > b.memberDTO.memberCode) {
                            return -1;
                        }
                        return 0;
                    })
                        .map((line, i) => (
                            <div key={i} className={approvalDetailCSS.lineBox}>
                                <span>{line.memberDTO.memberName}</span>
                                <span>{line.memberDTO.jobCode}</span>
                                {/* appStatus의 상태에 따라 승인, 대기, 보류로 변경 */}
                                {
                                    detailInfo.approvalLine[i].appStatus === 'y' ?
                                        <div className={approvalDetailCSS.checkOkCircle}>승인</div> : detailInfo.approvalLine[i].appStatus === 'n' ?
                                            <div className={approvalDetailCSS.checkWaitCircle}>대기</div> : <div className={approvalDetailCSS.checkDenyCircle}>보류</div>}
                                {i < detailInfo.approvalLine.length - 1 && (
                                    <div
                                        className={
                                            detailInfo.approvalLine[i].appStatus === "n"
                                                ? approvalDetailCSS.stick
                                                : detailInfo.approvalLine[i].appStatus === "y"
                                                    ? approvalDetailCSS.stickOk
                                                    : approvalDetailCSS.stickDeny
                                        }
                                    ></div>
                                )}
                            </div>
                        ))
                }
                {loginCode === approvalMemberCode && <div className={approvalDetailCSS.lineButtonBox}>
                    <button onClick={approvalOkHandler}> 승인 </button>
                    <button onClick={approvalDenyHandler}> 반려 </button>
                </div>}
            </div>
        </div>

    )

}

export default ApprovalDetail;