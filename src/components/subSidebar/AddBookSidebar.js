import { useState } from "react";
// import { useDispatch } from "react-redux";
import SidebarCSS from "./Sidebar.module.css";

function AddBookSidebar() {
    
    // const useDispatch = useDispatch();
    const [firstIsOpen, setFirstIsOpen] = useState(false);
    const [secondIsOpen, setSecondIsOpen] = useState(false);
    const [thirdIsOpen, setThirdIsOpen] = useState(false);

    const toggleMenu = (menuNum) => {
        switch(menuNum) {
            case 1: setFirstIsOpen(!firstIsOpen); break;
            case 2: setSecondIsOpen(!secondIsOpen); break;
            case 3: setThirdIsOpen(!thirdIsOpen); break;
            default: break;
        }
    }

    return (
        <div className={SidebarCSS.sidebarDiv}>
            <div className={SidebarCSS.sideHeader}>
                <span>주소록</span>
            </div>
            <div>
                <button className={SidebarCSS.buttons}>주소록 추가</button>
                <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(1)}>
                    <img 
                        className={SidebarCSS.dropDownArrow} 
                        style={firstIsOpen? {transform:`rotate(90deg)`}:{}} 
                        src={process.env.PUBLIC_URL + "arrow.png"} 
                        alt="화살표"/>공용 주소록
                </button>
                {firstIsOpen && (
                    <div className={SidebarCSS.dropDownMenus}>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 1</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 2</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 3</p>
                    </div>
                )}
                <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(2)}>
                    <img 
                        className={SidebarCSS.dropDownArrow} 
                        style={secondIsOpen? {transform:`rotate(90deg)`}:{}} 
                        src={process.env.PUBLIC_URL + "arrow.png"} 
                        alt="화살표"/>개인 주소록
                </button>
                {secondIsOpen && (
                    <div className={SidebarCSS.dropDownMenus}>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 1</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 2</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 3</p>
                    </div>
                )}
                <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(3)}>
                    <img 
                        className={SidebarCSS.dropDownArrow} 
                        style={thirdIsOpen? {transform:`rotate(90deg)`}:{}} 
                        src={process.env.PUBLIC_URL + "arrow.png"} 
                        alt="화살표"/>전사 주소록
                </button>
                {thirdIsOpen && (
                    <div className={SidebarCSS.dropDownMenus}>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 주소록</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부서 주소록</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀 주소록</p>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default AddBookSidebar;