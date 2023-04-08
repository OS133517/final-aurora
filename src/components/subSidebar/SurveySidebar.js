import { useEffect } from "react";
import SidebarCSS from "./SubSidebar.module.css";
import { useNavigate } from "react-router";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink } from "react-router-dom";

function SurveySidebar() {

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
                    {loginMember && loginMember.auth[0] === 'ROLE_ADMIN'? <button onClick={() => navigate("/aurora/survey/survey-management/regist")}
                        className={SidebarCSS.buttons} 
                        >설문 생성
                    </button>:null}
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