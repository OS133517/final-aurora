import React from 'react';
import HrmSubSidebarCSS from "./HrmSubSidebar.module.css";
import { NavLink } from "react-router-dom";

export default function HrmSidebar() {


    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };
    return (
        <>
            <div className={HrmSubSidebarCSS.sidebarDiv}>
                <div className={HrmSubSidebarCSS.sideHeader}>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;인사 관리</span>
                </div>
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={"/hrm/hrm-list"}
                        >인사 목록</NavLink>    
                </div>
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={"/hrm/hrm-list"}
                        >인사 정보</NavLink>    
                </div>
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={"/hrm/hrm-list"}
                        >관리자 메뉴</NavLink>    
                </div>
            </div>
        </>
    );
}

