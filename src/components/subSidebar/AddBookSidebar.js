import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarCSS from "./SubSidebar.module.css";
import { callPersonalGroupAPI } from "../../apis/AddBookAPICall";
import { useNavigate } from "react-router-dom";

function AddBookSidebar() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstIsOpen, setFirstIsOpen] = useState(false);
    const [secondIsOpen, setSecondIsOpen] = useState(false);
    const [thirdIsOpen, setThirdIsOpen] = useState(false);

    const groups = useSelector(state => state.addBookReducer);
    console.log("groups : ", groups);
    const [groupList, setGroupList] = useState([]);
    
   
    useEffect(() => {
        if(Array.isArray(groupList) && groupList === []) {
            setGroupList(groups);
        }
    }, [groups])

    const toggleMenu = (menuNum) => {
        switch(menuNum) {
            case 1: 
                setFirstIsOpen(!firstIsOpen); 
                break;
            case 2: 
                setSecondIsOpen(!secondIsOpen); 
                groupList.length === 0 && dispatch(callPersonalGroupAPI({
                    memberCode : 2
                }))
                break;
            case 3: setThirdIsOpen(!thirdIsOpen); break;
            default: break;
        }
    }

    const onClickHandler = () => {
        navigate("/address-book/addresses")
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
                        {
                            Array.isArray(groupList) && groupList.length > 0 && groupList.map(group => (
                                <p key={group.groupCode}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{group.groupName}</p>
                            ))
                        }
                        {/* <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 1</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 2</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Item 3</p> */}
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
                        <p onClick={() => onClickHandler()}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 주소록</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부서 주소록</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀 주소록</p>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default AddBookSidebar;