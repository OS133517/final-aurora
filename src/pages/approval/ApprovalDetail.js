import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { callApprovalDetailAPI } from "../../apis/ApprovalAPICalls";
import approvalDetailCSS from "./Approvals.module.css"
function ApprovalDetail() {

    const location = useLocation();
    const dispatch = useDispatch();
    const app = location.state.appCode;
    const documentDTO = location.state.documentDTO;
    const detailInfo = useSelector(state => state.approvalReducer.detailApproval);
    const lineInfo = useSelector(state => state.approvalReducer.approvalLine);
    const {appTitle, appDescript, memberDTO} = detailInfo;
    useEffect(() => {
        dispatch(callApprovalDetailAPI({
            appCode : app
        }));
    //eslint-disable-next-line
    },[])
    detailInfo.length > 0 && console.log('Info : ', detailInfo);
    detailInfo.length > 0 && console.log('Info : ', lineInfo);
    
    return(

        <div className={approvalDetailCSS.detailBox}>
            <div className={approvalDetailCSS.detailView}>
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
                                <label>{appTitle}</label>
                            </td>
                        </tr>
                        <tr>
                            <td className={approvalDetailCSS.detailTitle}>
                                작성자
                            </td>
                            <td className={approvalDetailCSS.description}> 
                                {/* <label>{memberDTO.memberName}</label> */}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className={approvalDetailCSS.detailDescript}>
                                {appDescript}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={approvalDetailCSS.approvalLineBox}>
                {/* {
                    lineInfo.map((line, i) => (
                        <div>
                            test
                        </div>
                    ))
                } */}
            </div>
        </div>
    )

}

export default ApprovalDetail;