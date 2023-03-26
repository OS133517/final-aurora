import { useState } from "react";
import { NavLink } from "react-router-dom";
import SidebarCSS from "./SubSidebar.module.css";

function ApprovalSidebar() {
    const [open, setOpen] = useState('false');

    return(
        <div className={SidebarCSS.sidebarDiv}>
            <div className={SidebarCSS.sideHeader}>
                <span>결재 대기</span>
            </div>
            <div >
                <button className={SidebarCSS.buttons}>서류 작성</button>
                <div className={SidebarCSS.checked}>
                    <div className={SidebarCSS.count}>
                        <h1>0</h1>
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
                            alt="화살표"/>공용 주소록
                    </button>
                    {open && (
                        <>
                            <ul className={SidebarCSS.approvalList}>
                                <li>
                                    <NavLink to="/approval/pending">미결재</NavLink>
                                </li>
                                <li>
                                    <NavLink>결재완료</NavLink>
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