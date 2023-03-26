import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarCSS from "./SubSidebar.module.css";
import { callPersonalGroupAPI, callTeamGroupAPI, callGroupRegistAPI, callGroupDeleteAPI } from "../../apis/AddBookAPICall";
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
    // 그룹 관리 버튼 조정용
    const [pManageIsOn, setPManageIsOn] = useState(false);
    const [tManageIsOn, setTManageIsOn] = useState(false);
    // 주소록 추가 모달
    const [addBookModal, setAddBookModal] = useState(false);

    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    const groupRegistResult = useSelector(state => state.addBookReducer.groupRegistMessage);
    const groupDeleteResult = useSelector(state => state.addBookReducer.groupDeleteMessage);

    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };
    const manageStyle = {
        visibility : "visible",
        transform : "translateX(0)",
        opacity : "1"
    }

    useEffect(() => {

        getGroups();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if(groupRegistResult.status === 200) {
            
            getGroups();
        } else if(groupRegistResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "그룹 추가",
                text : groupRegistResult.message
            })
        }// eslint-disable-next-line
    }, [groupRegistResult]);

    useEffect(() => {

        if(groupDeleteResult.status === 200) {

            getGroups();
        } else if(groupDeleteResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "그룹 삭제",
                text : groupDeleteResult.message
            })
        }// eslint-disable-next-line
    }, [groupDeleteResult]);

    const getGroups = () => {

        dispatch(callTeamGroupAPI({
            // TODO -> 나중에 토큰에서 꺼내는 걸로
            memberCode : 2
        }));
        
        dispatch(callPersonalGroupAPI({
            // TODO -> 나중에 토큰에서 꺼내는 걸로
            memberCode : 2
        }));
    }

    const toggleMenu = (menuNum) => {
        switch(menuNum) {
            case 1: 
                setFirstIsOpen(!firstIsOpen);
                setTManageIsOn(false);
                setTIsVisible(false);
                break;
            case 2: 
                setSecondIsOpen(!secondIsOpen); 
                setPManageIsOn(false);
                setPIsVisible(false);
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

    const onClickGroupManage = (e) => {

        switch(e.target.id) {
            case "pGroupManage" :
                setPManageIsOn(!pManageIsOn);
                break;
            case "tGroupManage" :
                setTManageIsOn(!tManageIsOn);
                break;
            default :
                break;
        }
    }

    const onClickGroupDelete = (e) => {

        Swal.fire({
            icon : 'warning',
            title : '정말 삭제하시겠습니까?',
            text : '그룹 내의 모든 주소록도 삭제됩니다.',
            showCancelButton : true,
            cancelButtonText : '취소',
            confirmButtonText : '확인'
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(callGroupDeleteAPI({
                    groupCode : e.target.value
                }))
            } else {
                Swal.fire('취소되었습니다.');
            }
        })
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
                                        >
                                        {/* <input type="text" name="groupName" value={group.groupName}/> */}
                                        {group.groupName}
                                        <div style={tManageIsOn? manageStyle:null}>
                                            <button>수정</button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickGroupDelete(e);}}
                                                >삭제
                                            </button>
                                        </div>
                                    </NavLink>
                                ))
                            }
                            {tIsVisible && <input type="text" name="team" value={newTGroupName} onChange={onChangeHandler}/>}
                            {teamGroupList.length <= 4 && <p onClick={() => onClickInsert('t')}>+ 그룹 추가</p>}
                            <p id="tGroupManage" onClick={onClickGroupManage}>그룹 관리</p>
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
                                        >{group.groupName}
                                        <div style={pManageIsOn? manageStyle:null}>
                                            <button>수정</button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickGroupDelete(e);}}
                                                >삭제
                                            </button>
                                        </div>
                                    </NavLink>
                                ))
                            }
                            {pIsVisible && <input type="text" name="personal" value={newPGroupName} onChange={onChangeHandler}/>}
                            {personalGroupList.length <= 4 && <p onClick={() => onClickInsert('p')}>+ 그룹 추가</p>}
                            <p id="pGroupManage" onClick={onClickGroupManage}>그룹 관리</p>
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
                                >전체 주소록</NavLink>
                            {/* <NavLink 
                                style = { ({ isActive }) => isActive? activeStyle : undefined }
                                to={"/address-book/team-addresses"}
                                >팀 주소록</NavLink> */}
                        </div>
                    )}
                </div>
            </div>
            </>
    );
}

export default AddBookSidebar;
