import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import Header from "../components/common/Header";
import LoginCSS from "./Login.module.css";
import { callLoginAPI } from "../apis/MemberAPICall";
import Swal from "sweetalert2";

function Login() {

    // navigate 를 이용하기 위해 선언
    const navigate = useNavigate();
    // 리덕스를 이용하기 위한 디스패치, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer.memberLogin);// API 요청하여 가져온 loginMember 정보
    const isLogin = window.localStorage.getItem("accessToken");

    // 인풋 폼 데이터 한번에 변경 및 state에 저장
    const [form, setForm] = useState({
        memberId : '',
        memberPWD : ''
    });

    // 로그인을 해서 loginMember 상태값이 변해 다시 rendering 이 될 때 체크 후 메인 화면으로 보냄
    useEffect(() => {

        if(loginMember.status === 200) {

            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/", {replace : true});
        } else if (loginMember.state === 400){
            console.log("[Login] Login FAIL {}", loginMember);
            Swal.fire({
                icon : 'error',
                text : loginMember.message
            });
        }
    }, [loginMember, navigate]);

    if(isLogin) {
        console.log("[Login] Login is already authenticated by the server");
        return <Navigate to="/aurora"/>;
    }

    // 인풋 입력 시 form state 변경
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    // 로그인 버튼 클릭 핸들러
    const onClickHandler = () => {
        dispatch(callLoginAPI({ // 로그인
            form : form
        }));
    }
  
    return (
        <>
            <div className={LoginCSS.loginDiv}>
            <img src={ `${process.env.PUBLIC_URL}/aurora.png` } onClick={() => navigate("/")} alt="메인로고"/>
                <div className={LoginCSS.loginForm}>
                    <input 
                        type="text" 
                        name="memberId" 
                        placeholder="아이디"
                        autoComplete="off"
                        onChange={onChangeHandler}/>
                    <br/>
                    <input 
                        type="password" 
                        name="memberPWD" 
                        placeholder="비밀번호"
                        autoComplete="off"
                        onChange={onChangeHandler}/>
                    <br/>
                    <button onClick={onClickHandler}>로그인</button>
                </div>
            </div>
        </>
    );
}

export default Login;