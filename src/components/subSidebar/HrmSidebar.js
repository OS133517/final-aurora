import React from 'react';
import HrmSubSidebarCSS from "./HrmSubSidebar.module.css";
import { NavLink } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useState, useEffect } from 'react';




export default function HrmSidebar() {

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    let decoded = null;

    if (loginMember !== undefined && loginMember !== null) {
        const temp = decodeJwt(window.localStorage.getItem('accessToken'));
        decoded = temp.auth[0]; // accessToken 토큰안에 페이로드 안에 있는 auth 꺼냄
        //aud :Audience 토큰 대상자를 나타냄
      }

      console.log(decoded);

    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };

   

    return (
        <>
            <div className={HrmSubSidebarCSS.sidebarDiv}>
                <div className={HrmSubSidebarCSS.sideHeader}>
                    <span>인사 관리</span>
                </div>
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={`/aurora/hrm/list`}
                        >인사 목록</NavLink>    
                </div>
                <div>
                   {loginMember.memberCode && (
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={`/aurora/hrm/hrm-detail/${loginMember.memberCode}`}
                        >인사 정보</NavLink> 
                         )}    
                </div>
              {(decoded === 'ROLE_ADMIN' || decoded === 'ROLE_MANAGER') &&( 
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={`/aurora/hrm/hrm-modify`}
                        >인사 수정</NavLink>    
                </div>
                )} 
                 {(decoded === 'ROLE_ADMIN' || decoded === 'ROLE_MANAGER') &&( 
                <div>
                    <NavLink 
                        className={HrmSubSidebarCSS.NavLink}
                        style={ ({ isActive }) => isActive?  activeStyle : undefined } 
                        to={`/aurora/hrm/hrm-regist`}
                        >인사 등록</NavLink>    
                </div>
                )} 
            </div>
        </>
    );
}

