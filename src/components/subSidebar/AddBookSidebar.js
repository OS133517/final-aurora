import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarCSS from "./SubSidebar.module.css";
import { callPersonalGroupAPI, callTeamGroupAPI, callGroupRegistAPI } from "../../apis/AddBookAPICall";
import { NavLink } from "react-router-dom";
import AddBookFormModal from "../addBook/AddBookFormModal";
import Swal from "sweetalert2";

function AddBookSidebar() {
    
    const dispatch = useDispatch();

    // 드롭다운 메뉴 조정용
    const [firstIsOpen, setFirstIsOpen] = useState(false);
    const [secondIsOpen, setSecondIsOpen] = useState(false);
    const [thirdIsOpen, setThirdIsOpen] = useState(false);
    // 그룹 추가 인풋창 조정용
    const [pIsVisible, setPIsVisible] = useState(false);
    const [tIsVisible, setTIsVisible] = useState(false);
    // 그룹 추가 인풋창 밸류 조정용
    const [newPGroupName, setNewPGroupName] = useState("");
    const [newTGroupName, setNewTGroupName] = useState("");
    // 주소록 추가 모달
    const [addBookModal, setAddBookModal] = useState(false);

    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    const groupRegistResult = useSelector(state => state.addBookReducer.groupRegistMessage);

    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };

    useEffect(() => {

        dispatch(callTeamGroupAPI({
            // TODO -> 나중에 토큰에서 꺼내는 걸로
            memberCode : 2
        }));
        
        dispatch(callPersonalGroupAPI({
            // TODO -> 나중에 토큰에서 꺼내는 걸로
            memberCode : 2
        }));// eslint-disable-next-line
    }, []);

    useEffect(() => {

        if(groupRegistResult.status === 200) {
            dispatch(callTeamGroupAPI({
                // TODO -> 나중에 토큰에서 꺼내는 걸로
                memberCode : 2
            }));
            
            dispatch(callPersonalGroupAPI({
                // TODO -> 나중에 토큰에서 꺼내는 걸로
                memberCode : 2
            }));
        } else if(groupRegistResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "그룹 추가",
                text : groupRegistResult.message
            })
        }// eslint-disable-next-line
    }, [groupRegistResult])

    const toggleMenu = (menuNum) => {
        switch(menuNum) {
            case 1: 
                setFirstIsOpen(!firstIsOpen);
                break;
            case 2: 
                setSecondIsOpen(!secondIsOpen); 
                break;
            case 3: 
                setThirdIsOpen(!thirdIsOpen); 
                break;
            default: break;
        }
    }

    const onClickInsert = (onOff) => {

        switch(onOff) {
            case 't' :
                if(tIsVisible && newTGroupName.trim().length !== 0) {
                    dispatch(callGroupRegistAPI({
                        groupName : newTGroupName,
                        // TODO -> 나중에 토큰에서 꺼내는 걸로
                        team : '개발4팀'
                    }));
                }
                setTIsVisible(!tIsVisible);
                setNewTGroupName("");
                break;
            case 'p' :
                if(pIsVisible && newPGroupName.trim().length !== 0) {
                    dispatch(callGroupRegistAPI({
                        groupName : newPGroupName,
                        // TODO -> 나중에 토큰에서 꺼내는 걸로
                        memberCode : 2
                    }));
                }
                setPIsVisible(!pIsVisible);
                setNewPGroupName("");
                break;
            default :
                setTIsVisible(!tIsVisible);
                setPIsVisible(!pIsVisible);
                break;
        }
    }

    const onChangeHandler = (e) => {

        switch(e.target.name) {
            case "personal" :
                setNewPGroupName(e.target.value);
                break;
            case "team" :
                setNewTGroupName(e.target.value);
                break;
            default :
                break;
        }
    }

    return (
        <>
            {addBookModal? <AddBookFormModal setAddBookModal={setAddBookModal}/>:null}
            <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span>주소록</span>
                </div>
                <div>
                    <button className={SidebarCSS.buttons} onClick={() => setAddBookModal(true)}>주소록 추가</button>
                    <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(1)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={firstIsOpen? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "/arrow.png"} 
                            alt="화살표"/>공용 주소록
                    </button>
                    {firstIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                            {
                                Array.isArray(teamGroupList) && teamGroupList.map(group => (
                                    <NavLink 
                                        style = { ({ isActive }) => isActive? activeStyle : undefined }
                                        to={`/address-book/team-groups/${group.groupCode}`} 
                                        key={group.groupCode}
                                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{group.groupName}</NavLink>
                                ))
                            }
                            {tIsVisible && <input type="text" name="team" value={newTGroupName} onChange={onChangeHandler}/>}
                            <p onClick={() => onClickInsert('t')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 그룹 추가</p>
                        </div>
                    )}
                    <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(2)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={secondIsOpen? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "/arrow.png"} 
                            alt="화살표"/>개인 주소록
                    </button>
                    {secondIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                            {
                                Array.isArray(personalGroupList) && personalGroupList.map(group => (
                                    <NavLink 
                                        style = { ({ isActive }) => isActive? activeStyle : undefined }
                                        to={`/address-book/personal-groups/${group.groupCode}`} 
                                        key={group.groupCode}
                                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{group.groupName}</NavLink>
                                ))
                            }
                            {pIsVisible && <input type="text" name="personal" value={newPGroupName} onChange={onChangeHandler}/>}
                            <p onClick={() => onClickInsert('p')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ 그룹 추가</p>
                        </div>
                    )}
                    <button className={SidebarCSS.dropDownButtons} onClick={() => toggleMenu(3)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={thirdIsOpen? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "/arrow.png"} 
                            alt="화살표"/>전사 주소록
                    </button>
                    {thirdIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                            <NavLink 
                                style = { ({ isActive }) => isActive? activeStyle : undefined }
                                to={"/address-book/addresses"}
                                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 주소록</NavLink>
                            {/* <NavLink 
                                style = { ({ isActive }) => isActive? activeStyle : undefined }
                                to={"/address-book/team-addresses"}
                                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팀 주소록</NavLink> */}
                        </div>
                    )}
                </div>
            </div>
            </>
    );
}

export default AddBookSidebar;
