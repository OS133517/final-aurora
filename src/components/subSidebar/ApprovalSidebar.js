import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { callGetApprovalsAPI } from "../../apis/ApprovalAPICalls";
import SidebarCSS from "./SubSidebar.module.css";

function ApprovalSidebar() {
    //eslint-disable-next-line
    const dispatch = useDispatch;
    const list = useSelector(state => state.approvalReducer.approvalInfo)
    const [open, setOpen] = useState('false');

    useEffect(() => {
        callGetApprovalsAPI(1);
    // eslint-disable-next-line
    },[])
    return(
        <div className={SidebarCSS.sidebarDiv}>
            <div className={SidebarCSS.sideHeader}>
                <span>결재 대기</span>
            </div>
            <div >
                <button className={SidebarCSS.buttons}>서류 작성</button>
                <div className={SidebarCSS.checked}>
                    {/* 새로운 컴포넌트로 해서 바꿔야할듯? */}
                    <div className={SidebarCSS.count}>
                        <h1>{list.length}</h1>
                        <label>결재 대기</label>
                    </div>
                    <div className={SidebarCSS.count}>
                        <h1>0</h1>
                        <label>결재 요청</label>
                    </div>
                </div>
                <div>
                    <button className={SidebarCSS.dropDownButtons} onClick={() => setOpen(!open)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={open? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "arrow.png"} 
                            alt="화살표"/>결재함
                    </button>
                    {open && (
                        <>
                            <ul className={SidebarCSS.approvalList}>
                                <li>
                                    <NavLink to="/approval/pending" className={SidebarCSS.approvalItem}>미결재</NavLink>
                                </li>
                                <li>
                                    <NavLink className={SidebarCSS.approvalItem}>결재완료</NavLink>
                                </li>
                                <li>
                                    <NavLink className={SidebarCSS.approvalItem}>요청대기</NavLink>
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