import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMemberListAPI } from "../../../apis/MemberAPICall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chatRoomAddCSS from "./MessengerForm.module.css"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { callMessengerAddAPI } from "../../../apis/MessengerAPICall";
import { decodeJwt } from "../../../utils/tokenUtils";



function ChatRoomAdd({ roomNum }) {

    /** useDispatch */
    const dispatch = useDispatch();
    /** Jwt */
    const loginMember = decodeJwt(window.localStorage.getItem('accessToken'));
    /** 로그인된 멤버의 코드 */
    const memberCode = loginMember.memberCode
    console.log('memberCode : ', memberCode);

    /** useState */
    const [selectedMember, setSelectedMember] = useState([]);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        roomNum: 0,
        memberCode: [memberCode],
        mesName: ''
    });
    console.log('form : ', form);

    /** useSelector */
    const lists = useSelector(state => state.memberReducer.memberList);


    // roomNum 배열에서 존재하지않는 숫자를 난수로 빼와서 방 번호로 지정
    // 난수 roomNum 생성
    const RandomRoomNum = () => {
        return Math.floor(Math.random() * 10000);
    };

    /** roomNum배열에 존재하는 지 확인  */
    const roomNumExists = (roomNumber, roomList) => {
        return roomList.some((room) => room.roomNum === roomNumber);
    };

    // 


    /** useEffect */
    useEffect(() => {
        dispatch(callMemberListAPI());
        setStep(1);
        setForm({
            ...form,
            roomNum: 0,
            memberCode: [memberCode],
            mesName: ''
        })
        //eslint-disable-next-line
    }, []);
    useEffect(() => {
        setForm({
            ...form,
            memberCode: [memberCode, ...selectedMember.map((m) => m.memberCode)],
        });
        //eslint-disable-next-line
    }, [selectedMember]);
    /** event */
    const checkboxHandle = (e, list) => {
        if (e.target.checked) {
            // 체크박스가 선택 될 때
            setSelectedMember([
                ...selectedMember,
                {
                    ...list,
                    memberCode: list.memberCode,
                },
            ]);
        } else {
            // 체크박스가 해제 될 때
            setSelectedMember(selectedMember.filter((m) => m.memberCode !== list.memberCode));
        }

        // console.log('[checkboxHandle] : ', selectedMember);
    }

    // 
    const nextStepHandler = () => {

        // 난수 
        let roomNumber = RandomRoomNum();

        while (roomNumExists(roomNumber, roomNum)) {
            roomNumber = RandomRoomNum();
        }

        setStep(step + 1);

        if (step === 2) {
            dispatch(callMessengerAddAPI({ form: form }));

            Swal.fire({
                icon: "success",
                title: "성공!",
                text: '방이 성공적으로 생성되었습니다.',
                confirmButtonText: "확인"
            }).then(() => {
                window.location.reload();
            })
        }

    }
    // 이름 지정
    const chatRoomNameHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div>
            <div className={chatRoomAddCSS.title}>
                {step === 1 ? <h2>Step 1. 함께 할 사람</h2> : <h2>Step 2. 제목 설정</h2>}
                {selectedMember.length > 0 &&
                    <button onClick={nextStepHandler}>
                        <FontAwesomeIcon icon={faArrowRight} size="2xl" />
                    </button>}
            </div>
            {/* 같이 대화방에 입장할 사원 선택 */}
            {step === 1 &&
                <div className={chatRoomAddCSS.listBox}>
                    <ul>
                        {
                            Array.isArray(lists.data) && lists.data
                                .filter((list) => list.memberCode !== memberCode)
                                .map((list, i) => (

                                    <li key={i}>
                                        {/* selectedMember 배열에서 현재 list.memberCode와 일치하는 멤버코드를 가진 요소가 있다면 체크 상태로 없으면 체크되지 않은 상태로 설정 */}
                                        <input type="checkbox" name="AddMember" checked={selectedMember.some((m) => m.memberCode === list.memberCode)}
                                            onChange={(e) => checkboxHandle(e, list)} />
                                        <span>{list?.memberName} </span>
                                        <span>{list?.jobName} </span>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            }
            {step === 2 &&
                <div className={chatRoomAddCSS.nameBox}>
                    <input type="text" placeholder="대화방 제목을 입력하세요" name="mesName" onChange={chatRoomNameHandler} />
                </div>
            }
        </div>
    )
}

export default ChatRoomAdd;