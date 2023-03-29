import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { callApprovalDetailAPI } from "../../apis/ApprovalAPICalls";
import approvalDetailCSS from "./Approvals.module.css"

function ApprovalDetail() {
    // approvalForm 컴포넌트에서 documentDTO을 가져오기 위한 hook
    const location = useLocation();
    const documentDTO = location.state.documentDTO;
    const paramAppCode = useParams("appCode");
    console.log('appCode', paramAppCode);
    const dispatch = useDispatch();
    // 이전 페이지로 이동하기 위한 history hook
    const detailInfo = useSelector(state => state.approvalReducer.approvalLine);
    useEffect(() => {
        dispatch(callApprovalDetailAPI({ appCode: paramAppCode.appCode}))
      //eslint-disable-next-line
      }, []);
 
    console.log('Info detailInfo : ', detailInfo);
    
    const backEvent = () => {
        window.history.back();
    }
    return( 
        <div className={approvalDetailCSS.detailBox}>
                <div className={approvalDetailCSS.detailView}>
                    <div className={approvalDetailCSS.buttonBox}>
                        <button onClick={ backEvent }>목록</button>
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
                                    {/* <label>{detailApproval.memberDTO.memberName}</label> */}
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
                    <img src={ process.env.PUBLIC_URL + "/checkApproval.png" }  alt="Check Approval"/>
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
                                {i < detailInfo.approvalLine.length-1 &&
                                    <div className={approvalDetailCSS.stick}/>}
                            </div>
                    ))
                }
                </div>
        </div>
    
    )

}

export default ApprovalDetail;