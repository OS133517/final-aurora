import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { decodeJwt } from "../../utils/tokenUtils";
import SidebarCSS from "./SubSidebar.module.css";
import { useNavigate } from "react-router";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink } from "react-router-dom";

function SurveySidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {

    // eslint-disable-next-line
    }, [])

    return (
        <>
         <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span>설문</span>
                </div>
                <div className={SidebarCSS.sidebarBody}>
                    <button 
                        className={SidebarCSS.buttons} 
                        >설문 생성
                    </button>
                    {loginMember && loginMember.auth[0] === 'ROLE_ADMIN'? <NavLink 
                                                                                to={"/aurora/survey/survey-management"}
                                                                                        
                                                                                    >설문 관리</NavLink>:null}
                    <NavLink
                        to={"/aurora/survey/list"}>설문 목록</NavLink>
                </div>      
            </div>
        </>
    );
}

export default SurveySidebar;