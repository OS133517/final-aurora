import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarCSS from "./SubSidebar.module.css";
import { callPersonalGroupAPI, callTeamGroupAPI, callGroupRegistAPI, callGroupDeleteAPI, callGroupUpdateAPI } from "../../apis/AddBookAPICall";
import { NavLink } from "react-router-dom";
import AddBookFormModal from "../addBook/AddBookFormModal";
import Swal from "sweetalert2";
import { decodeJwt } from "../../utils/tokenUtils";

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
    const groupResultMessage = useSelector(state => state.addBookReducer.groupMessage);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

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

        if(groupResultMessage.status === 200) {
            
            getGroups();
        } else if(groupResultMessage.status === 400) {
            Swal.fire({
                icon : "error",
                text : groupResultMessage.message
            })
        }// eslint-disable-next-line
    }, [groupResultMessage]);

    const getGroups = () => {

        dispatch(callTeamGroupAPI({
            memberCode : loginMember.memberCode
        }));
        
        dispatch(callPersonalGroupAPI({
            memberCode : loginMember.memberCode
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
                        team : loginMember.team
                    }));
                }
                setTIsVisible(!tIsVisible);
                setNewTGroupName("");
                break;
            case 'p' :
                if(pIsVisible && newPGroupName.trim().length !== 0) {
                    dispatch(callGroupRegistAPI({
                        groupName : newPGroupName,
                        memberCode : loginMember.memberCode
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

    const onClickGroupUpdate = (e) => {

        const input = document.querySelector(`#groupUpdateInput${e.target.value}`);
        const nameSpan = document.querySelector(`#groupNameSpan${e.target.value}`);

        if(input.style.display !== 'block') {

            input.style.display = 'block';
            nameSpan.style.display = 'none';
        } else {

            if(input.value.trim().length === 0) {
                Swal.fire('그룹명을 입력하세요.');
                return;
            }

            Swal.fire({
                icon : "warning",
                title : "그룹명 수정",
                text : "수정하시겠습니까?",
                showCancelButton : true,
                cancelButtonText : "취소",
                confirmButtonText : "확인"  
            }).then(result => {
                if(result.isConfirmed) {
                    dispatch(callGroupUpdateAPI({
                        groupCode : e.target.value,
                        groupName : input.value
                    }));
                } else {
                    Swal.fire('취소되었습니다.');
                }
            })

            input.style.display = 'none';
            nameSpan.style.display = 'block';
        }
    }

    const onClickCancel = (tOrP, e) => {
        const input = document.querySelector(`#groupUpdateInput${e.target.value}`);
        const nameSpan = document.querySelector(`#groupNameSpan${e.target.value}`);

        switch(tOrP) {
            case 't' :
                input.style.display = 'none';
                nameSpan.style.display = 'block';
                break;
            case 'p' :
                input.style.display = 'none';
                nameSpan.style.display = 'block';
                break;
            default :
                return;
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
                                        to={`/aurora/address-book/team-groups/${group.groupCode}`} 
                                        key={group.groupCode}
                                        >
                                        <input 
                                            className={SidebarCSS.groupUpdateInput}
                                            id={`groupUpdateInput${group.groupCode}`}
                                            type="text" 
                                            maxLength='10'
                                            name="groupName"/>
                                        <span id={`groupNameSpan${group.groupCode}`}>{group.groupName}</span>
                                        <div style={tManageIsOn? manageStyle:null}>
                                            <button
                                                value={group.groupCode}
                                                onClick={(e) => {e.preventDefault(); onClickGroupUpdate(e);}}
                                                >수정
                                            </button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickGroupDelete(e);}}
                                                >삭제
                                            </button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickCancel('t', e);}}
                                                >X
                                            </button>
                                        </div>
                                    </NavLink>
                                ))
                            }
                            {tIsVisible && <input
                                                className={SidebarCSS.groupInsertInput} 
                                                type="text" 
                                                name="team" 
                                                maxLength='10'
                                                value={newTGroupName} 
                                                onChange={onChangeHandler}/>}
                            {teamGroupList.length <= 4 && <p style={tIsVisible? {backgroundColor:'#73b8a3', color:'white'}:null} onClick={() => onClickInsert('t')}>+ 그룹 추가</p>}
                            <p style={tManageIsOn? {backgroundColor:'#73b8a3', color:'white'}:null} id="tGroupManage" onClick={onClickGroupManage}>그룹 관리</p>
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
                                        to={`/aurora/address-book/personal-groups/${group.groupCode}`} 
                                        key={group.groupCode}
                                        >
                                        <input 
                                            className={SidebarCSS.groupUpdateInput}
                                            id={`groupUpdateInput${group.groupCode}`}
                                            type="text" 
                                            maxLength='10'
                                            name="groupName"/>
                                        <span id={`groupNameSpan${group.groupCode}`}>{group.groupName}</span>
                                        <div style={pManageIsOn? manageStyle:null}>
                                            <button
                                                value={group.groupCode}
                                                onClick={(e) => {e.preventDefault(); onClickGroupUpdate(e);}}
                                                >수정
                                            </button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickGroupDelete(e);}}
                                                >삭제
                                            </button>
                                            <button 
                                                value={group.groupCode} 
                                                onClick={(e) => {e.preventDefault(); onClickCancel('p', e);}}
                                                >X
                                            </button>
                                        </div>
                                    </NavLink>
                                ))
                            }
                            {pIsVisible && <input 
                                                type="text"
                                                name="personal" 
                                                value={newPGroupName} 
                                                maxLength='10'
                                                onChange={onChangeHandler}/>}
                            {personalGroupList.length <= 4 && <p style={pIsVisible? {backgroundColor:'#73b8a3', color:'white'}:null} onClick={() => onClickInsert('p')}>+ 그룹 추가</p>}
                            <p style={pManageIsOn? {backgroundColor:'#73b8a3', color:'white'}:null} id="pGroupManage" onClick={onClickGroupManage}>그룹 관리</p>
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
                                to={"/aurora/address-book/addresses"}
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
