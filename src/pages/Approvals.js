import { useDispatch, useSelector } from "react-redux";
import ApprovalCSS from "./Approvals.module.css"
// import {decodeJwt} from "../utils/tokenUtils"
import { useEffect } from "react";
import { callGetApprovalsAPI } from "../apis/ApprovalAPICalls";
function Approvals() {

    const dispatch = useDispatch();
    const lastList = useSelector(state => state.approvalReducer);
    // 로그인 기능 구현 되면 사용
    // const token = decodeJwt(window.localStorage.getItem('accessToken'));
    useEffect(() => {
        dispatch(callGetApprovalsAPI(1))
    },[])

    return(
        <div className={ApprovalCSS.mainList}>
            <p>결제 창</p>
        
        </div>
    );
}

export default Approvals;