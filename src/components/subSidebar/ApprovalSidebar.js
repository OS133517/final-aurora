import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callGetApprovalsAPI, callGetwaitingAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import SidebarCSS from "./SubSidebar.module.css";

function ApprovalSidebar() {
    /** useDispatch */
    //eslint-disable-next-line
    const dispatch = useDispatch();
    /** useSelector */
    const list = useSelector(state => state.approvalReducer.pendingList);
    const waitingCount = useSelector(state => state.approvalReducer.lineList);
    /** useState */
    const [open, setOpen] = useState('false');
    /** useNavigate */
    const navigate = useNavigate();
    /** decode */
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberCode = Number(token.memberCode);
    // 서류 작성 페이지로 이동
    const cilckMakeApproval = () => {
        navigate('/aurora/approval/draft');
    }

    const pendingListHandler = () => {
        navigate("/aurora/approval")
    }

    const waitingListHandler = () => {
        navigate("/aurora/approval/waiting")
    }

    useEffect(() => {
        dispatch(callGetApprovalsAPI({ memberCode: memberCode }));
        dispatch(callGetwaitingAPI({ memberCode: memberCode }));

        // eslint-disable-next-line
    }, [])
    return (
        <div className={SidebarCSS.sidebarDiv}>
            <div className={SidebarCSS.sideHeader}>
                <span>결재 대기</span>
            </div>
            <div >
                <button className={SidebarCSS.buttons} onClick={cilckMakeApproval}>서류 작성</button>
                <div className={SidebarCSS.checked}>
                    <div className={SidebarCSS.count} onClick={pendingListHandler}>
                        <h1>{Array.isArray(list) && list.length}</h1>
                        <label>결재 대기</label>
                    </div>
                    <div className={SidebarCSS.count} onClick={waitingListHandler}>
                        <h1>{waitingCount.length}</h1>
                        <label>결재 요청</label>
                    </div>
                </div>
                <div>
                    <button className={SidebarCSS.dropDownButtons} onClick={() => setOpen(!open)}>
                        <img
                            className={SidebarCSS.dropDownArrow}
                            style={open ? { transform: `rotate(90deg)` } : {}}
                            src={process.env.PUBLIC_URL + "/arrow.png"}
                            alt="화살표" />결재함
                    </button>
                    {open && (
                        <>
                            <ul className={SidebarCSS.approvalList}>
                                <li>
                                    <NavLink to="/aurora/approval/pending" className={SidebarCSS.approvalItem}>진행중</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/aurora/approval/compeleted" className={SidebarCSS.approvalItem}>결재완료</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/aurora/approval/waiting" className={SidebarCSS.approvalItem}>요청대기</NavLink>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>

        </div>

    );
}

export default ApprovalSidebar;