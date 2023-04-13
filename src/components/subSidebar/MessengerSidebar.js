import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callMemberDetailAPI } from "../../apis/MemberAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import SidebarCSS from "./SubSidebar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { callMessengerListAPI } from "../../apis/MessengerAPICall";
import ChatRoomAdd from "../form/messenger/ChatRoomAdd";
import ChatRoom from "../form/messenger/ChatRoom";

function MessengerSidebar() {
    /** useDispatch */
    //eslint-disable-next-line
    const dispatch = useDispatch();
    // /** useSelector */
    // 로그인한 맴버의 이름을 가져오기 위해
    const list = useSelector(state => state.memberReducer.memberDetail);
    const roomList = useSelector(state => state.messengerReducer.messengerList);
    /** navigate */
    const navigate = useNavigate();
    // const waitingCount = useSelector(state => state.approvalReducer.lineList);
    // /** useState */
    const [inputChatRoom, setInputChatRoom] = useState(false);
    const [selectedRoomNum, setSelectedRoomNum] = useState(null);

    // /** useNavigate */
    // const navigate = useNavigate();
    /** decode */
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const memberCode = Number(token.memberCode);
    /** 변수 */
    const memberName = list?.memberDTO?.memberName;
    const roomNum = roomList.map(room => room.roomNum);
    console.log('roomList : ', roomList);
    /** useEffect */
    useEffect(() => {
        const fetchData = async () => {

            await dispatch(callMemberDetailAPI({ memberCode: memberCode }));
        };

        fetchData();
        //eslint-disable-next-line
    }, [])

    // 메신저 리스트용
    useEffect(() => {

        const fetchMessengerData = async () => {
            await dispatch(callMessengerListAPI({ memberCode: memberCode }));
        }

        fetchMessengerData();
        //eslint-disable-next-line
    }, [memberName])

    const chatRoomAddHandler = () => {
        setInputChatRoom(!inputChatRoom)
    }

    const chatRoomHandler = (roomNum) => {
        navigate(`/aurora/messenger/detail/${roomNum}`);
    }
    return (
        <div className={SidebarCSS.sidebarDiv}>
            <div className={SidebarCSS.sideHeader}>
                <div className={SidebarCSS.memberIcon}><FontAwesomeIcon icon="user" size="xl" /></div>
                <h3>{memberName}</h3>
            </div>
            <div className={SidebarCSS.search}>
                <div className={SidebarCSS.searchBox}>
                    <FontAwesomeIcon icon="search" />
                    <input type="text" />
                </div>
            </div>
            <div className={SidebarCSS.bottomAdd} onClick={chatRoomAddHandler}>
                <FontAwesomeIcon icon="plus" />
                <span>대화방 추가</span>
            </div>
            {/* 모달 창 */}
            {inputChatRoom &&
                <div className={SidebarCSS.modalWrapper}>
                    <div className={SidebarCSS.modalAddChat}>
                        <ChatRoomAdd />
                    </div>
                </div>
            }
            <div >
                <ul className={SidebarCSS.approvalList}>
                    {
                        Array.isArray(roomList) && roomList.map((list, i) => (
                            <li key={i} className={SidebarCSS.chatRoomList} onClick={() => chatRoomHandler(list.roomNum)}>
                                {list?.mesName}
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
}

export default MessengerSidebar;