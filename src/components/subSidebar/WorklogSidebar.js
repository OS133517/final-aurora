import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SidebarCSS from "./SubSidebar.module.css";

function WorklogSidebar() {

    const dispatch = useDispatch();

    // 드롭다운 메뉴 조정용
    const [firstIsOpen, setFirstIsOpen] = useState(false);
    const [secondIsOpen, setSecondIsOpen] = useState(false);

    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };

    const toggleMenu = (menuNum) => {
        switch(menuNum) {
            case 1: 
                setFirstIsOpen(!firstIsOpen);
                break;
            case 2: 
                setSecondIsOpen(!secondIsOpen); 
                break;
            default: break;
        };
    }

    return (
        <>
            <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span>업무일지</span>
                </div>
                <div>
                    <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(1)}>
                        <img 
                        className={SidebarCSS.dropDownArrow} 
                        style={firstIsOpen? {transform:`rotate(90deg)`}:{}} 
                        src={process.env.PUBLIC_URL + "/arrow.png"}
                        alt="화살표"/>일일 업무일지
                    </button>
                    {firstIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                        <NavLink 
                            style = { ({ isActive }) => isActive? activeStyle : undefined }
                            to={"/aurora/worklog/day"}
                            >일일 업무일지</NavLink>
                        <NavLink className={SidebarCSS.buttons}
                        style={ ({ isActive }) => isActive? activeStyle : undefined }
                        to={"/aurora/worklog/day/insert"}>일일업무 추가</NavLink>
                        </div>
                    )}
                    <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(2)}>
                        <img 
                        className={SidebarCSS.dropDownArrow} 
                        style={secondIsOpen? {transform:`rotate(90deg)`}:{}} 
                        src={process.env.PUBLIC_URL + "/arrow.png"} 
                        alt="화살표"/>주간 업무일지
                    </button>
                    {secondIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                        <NavLink 
                            style = { ({ isActive }) => isActive? activeStyle : undefined }
                            to={"/aurora/worklog/week"}
                            >주간 업무일지</NavLink>
                        <NavLink className={SidebarCSS.buttons}
                        style={ ({ isActive }) => isActive? activeStyle : undefined }
                        to={"/aurora/worklog/week/insert"}>주간업무 추가</NavLink>
                        </div>
                        )}
                </div>
            </div>
        </>
    )        
}

export default WorklogSidebar;