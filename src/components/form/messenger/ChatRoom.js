import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import messengerCSS from './MessengerForm.module.css';
import SockJsClient from 'react-stomp';
import { decodeJwt } from "../../../utils/tokenUtils";

function ChatRoom() {

    /** Ref */
    const clientRef = useRef(null);
    /** disPatch */
    const dispatch = useDispatch();
    /** useParam */
    const param = useParams();
    /** decode */
    const loginMemeber = decodeJwt(window.localStorage.getItem('accessToken'));
    const loginCode = loginMemeber.memberCode;
    /** useState */
    // 연결 상태 확인
    const [connected, setConnected] = useState(false);
    // 메시지 리스트
    const [messages, setMessages] = useState([]);
    // 메시지 하나
    const [message, setMessage] = useState('');

    /** Event */
    // socket이랑 연결되었는지
    const onConnected = () => {
        console.log("Connected to WebSocket!");
        setConnected(true);
    };

    const onMessageReceived = (msg) => {
        console.log("New message received: ", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
    };

    const sendMessage = () => {
        if (connected) {

            const msg = {
                memberCode: loginCode, // 로그인한 사용자의 코드로 변경하세요.
                messageDescript: message,
                messageTime: new Date(),
            };
            clientRef.current.sendMessage('/pub/chat', JSON.stringify(msg));
            setMessage('');
        } else {
            console.log("메시지를 보낼 수 없습니다. WebSocket이 연결되어 있지 않습니다.");
        }

    };

    return (
        <div className={messengerCSS.messengerRoom}>
            <div>
                <p>메시지 창 뜨는 지 확인 용</p>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <span>{msg.memberCode}: </span>
                        <span>{msg.messageDescript}</span>
                    </div>
                ))}
                {/* url : webSocket의 엔드포인트  */}
                <SockJsClient url="http://localhost:8090/ws-stomp"
                    topics={['/topic/messages']}
                    onConnect={onConnected}
                    onDisconnect={() => {
                        console.log('disconnected');
                        setConnected(false);
                    }}
                    onMessage={onMessageReceived}
                    debug={false}
                    ref={clientRef}
                    headers={{ Authorization: `Bearer ${window.localStorage.getItem('accessToken')}` }}
                />
            </div>
            <div className={messengerCSS.inputText}>
                <input type="text" name='messengerDescript' onChange={(e) => setMessage(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatRoom;