import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    // callRoutineReportListByConditionsAPI,
    // callCasualReportListByConditionsAPI,
} from "../../apis/MailAPICall";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import MailSidebarCSS from "./MailSidebar.module.css";

function MailSidebar() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeMenu, setActiveMenu] = useState('');

    useEffect(() => {

        const currentPath = window.location.pathname;

        if (currentPath === '/aurora/mails') {
            
            setActiveMenu('mails');
        }
    }, []);
      
    const handleClick = (menu) => {
        
        setActiveMenu(activeMenu === menu ? '' : menu);
    };
    
    const activeStyle = {

        backgroundColor : "#73b8a3",
        color : "white"
    };

    return (
        <>
            <div className={MailSidebarCSS.sidebarDiv}>
                <div className={MailSidebarCSS.sideHeader}>
                    <span onClick={ () => window.location.href = "/aurora/mails" }>메일</span>
                </div>
                <div>
                    <button 
                        className={MailSidebarCSS.buttons}
                        onClick={() => navigate('/aurora/mails/write')}
                    >
                        메일 작성
                    </button>
                    <NavLink
                        to="/aurora/mails"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('mails')}
                        style={activeMenu === 'mails' ? activeStyle : undefined}
                    >
                        받은 메일함
                    </NavLink>
                    <NavLink
                        to="sent"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('sent')}
                        style={activeMenu === 'sent' ? activeStyle : undefined}
                    >
                        보낸 메일함
                    </NavLink>
                    {/* <NavLink
                        to="important"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('important')}
                        style={activeMenu === 'important' ? activeStyle : undefined}
                    >
                        중요 메일함
                    </NavLink> */}
                    {/* <NavLink
                        to="spam"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('spam')}
                        style={activeMenu === 'spam' ? activeStyle : undefined}
                    >
                        스팸 메일함
                    </NavLink> */}
                    <NavLink
                        to="trash"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('trash')}
                        style={activeMenu === 'trash' ? activeStyle : undefined}
                    >
                        휴지통
                    </NavLink>
                    {/* <NavLink
                        to="statistics"
                        className={MailSidebarCSS.dropDownButtons}
                        onClick={() => handleClick('statistics')}
                        style={activeMenu === 'statistics' ? activeStyle : undefined}
                    >
                        통계
                    </NavLink> */}
                </div>
            </div>
        </>
    )
}

export default MailSidebar;