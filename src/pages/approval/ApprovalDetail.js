import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { callApprovalDetailAPI, callPutApprovalLine } from "../../apis/ApprovalAPICalls";
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
    const documentDTO = location.state.documentDTO;

    /** useParams */
    const paramAppCode = useParams("appCode");

    /** useDispatch */
    const dispatch = useDispatch();

    /** useSelector */
    const detailInfo = useSelector(state => state.approvalReducer.approvalLine);
    const memberInfo = useSelector(state => state.memberReducer.memberDetail);

    /** useState */
    const [responseStatus, setResponseStatus] = useState(0)

    /** 변수 */
    /** @param loginCode 로그인한 유저의 코드*/
    const loginCode = loginMember.memberCode;

    /** @param memberCode 작성한 유저의 코드*/
    const memberCode = detailInfo?.detailApproval?.memberDTO?.memberCode;

    /** @param memberName 작성한 유저의 이름*/
    const memberName = memberInfo?.memberName;

    /** @param firstNStatus appStatus가 n인 첫번째 배열 값*/
    const firstNStatus = detailInfo?.approvalLine?.find(line => line.appStatus === 'n');

    /** @param approvalMember 승인할 유저의 코드*/
    const approvalMemberCode = firstNStatus?.memberDTO?.memberCode;
    console.log('(find 메서드)승인할 유저의 DTO : ', firstNStatus?.memberDTO);
    console.log('승인할 유저의 코드 : ', approvalMemberCode);
    /** useEffect */
    useEffect(() => {
        const fetchData = async () => {

            await dispatch(callApprovalDetailAPI({ appCode: paramAppCode.appCode }));
        };

        fetchData();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchMemberData = async () => {

            if (memberCode) {
                await dispatch(callMemberDetailAPI({ memberCode: memberCode }));

            }
        };

        fetchMemberData();
        //eslint-disable-next-line
    }, [memberCode]);

    console.log('Info memberCode : ');
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

        if (responseStatus === 200) {
            Swal.fire({
                icon: "success",
                title: "성공",
                text: "결재 라인이 성공적으로 등록되었습니다.",
            }).then(() => {
                window.location.reload();
            });
        }
    }

    const approvalDenyHandler = () => {
        dispatch(callPutApprovalLine({
            appCode: paramAppCode.appCode,
            approvalDTO: firstNStatus,
            appStatus: 'w'
        }, setResponseStatus));

        if (responseStatus === 200) {
            Swal.fire({
                icon: "success",
                title: "성공",
                text: "결재 라인이 성공적으로 등록되었습니다.",
            }).then(() => {
                window.location.reload();
            });
        }
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
                                <h1>{documentDTO.docName}</h1>
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
                    detailInfo?.approvalLine?.map((line, i) => (

                        <div key={i} className={approvalDetailCSS.lineBox}>
                            <span>{detailInfo.approvalLine[i].memberDTO.memberName}</span>
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