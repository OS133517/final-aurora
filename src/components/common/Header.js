import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callLogoutAPI } from "../../apis/MemberAPICall";
import { decodeJwt } from "../../utils/tokenUtils";
import { callSelectAlertListAPI } from "../../apis/AlertAPICall";

import HeaderCSS from "./Header.module.css";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem("accessToken");
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const [connected, setConnected] = useState(false); // 연결 상태 확인 
    const [hasNotification, setHasNotification] = useState(false);

    const stompClient = useRef(null);

    useEffect(() => {

        if (!connected) {

          connectWebSocket();
        }
    
        return () => {

          if (stompClient.current) {

            disconnectWebSocket();
          }
        };
      }, [connected]);
      
    useEffect(() => {
        dispatch(callSelectAlertListAPI({}));
        setHasNotification(false);
    }, [hasNotification]);

    if (jwtDecode(isLogin).exp * 1000 < Date.now()) {
        Swal.fire({
            icon : 'warning',
            text : '로그인이 필요합니다.',
            confirmButtonText : '확인'
        }).then(() => {
            window.localStorage.removeItem('accessToken'); 
            dispatch(callLogoutAPI());
            navigate("/", {replace : true});
        });
    }
    
    const connectWebSocket = () => {
        const socket = new SockJS("/websocket-endpoint");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, onConnected, onError);
    };

    const disconnectWebSocket = () => {
        if (stompClient.current && stompClient.current.connected) {
          stompClient.current.disconnect();
        }
        setConnected(false);
    };

    const onConnected = () => {
      console.log("Connected to WebSocket!");
      setConnected(true);
      subscribeAlerts();
      stompClient.current.connected = true;
    };

    const onError = (error) => {
        console.log("WebSocket connection error: ", error);
        setConnected(false);
    };

    const subscribeAlerts = () => {
        const memberCode = accessToken.sub;
        stompClient.current.subscribe(`/topic/alert/${memberCode}`, (message) => {
            const alert = JSON.parse(message.body);
            onAlertReceived(alert);
        });
    };
  
    const onAlertReceived = (alert) => {
        console.log("New alert received: ", alert);
        setHasNotification(!hasNotification);
    };

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        Swal.fire({
            icon : 'info',
            text : '로그아웃이 되어 메인화면으로 이동합니다.'
        }).then(() => {
            navigate("/", {replace : true});
            window.location.reload();
        });
    };

    return (
        <div className={HeaderCSS.header}>
            <img src={ `${process.env.PUBLIC_URL}/aurora.png` } onClick={() => navigate("/")} alt="메인로고"/>
            <div className={HeaderCSS.headerRight}>
            <div 
                    className={HeaderCSS.notification} 
                >
                    <img
                        className={`${HeaderCSS.notification}`}
                        src={`${process.env.PUBLIC_URL}/bell.png`}
                        alt="알림"
                    />
                    {hasNotification && <span className={HeaderCSS.notificationDot}></span>}
                </div>
                {isLogin && <img className={HeaderCSS.logout} src={ `${process.env.PUBLIC_URL}/logout.png` } onClick={onClickLogoutHandler} alt="로그아웃"/>}
            </div>
        </div>
    )
}
export default Header;