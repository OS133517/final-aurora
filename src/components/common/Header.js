import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";
import { callLogoutAPI } from "../../apis/MemberAPICall";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem("accessToken");

    // 토큰이 만료되었을때 다시 로그인
    if (jwtDecode(isLogin).exp * 1000 < Date.now()) {
        
        Swal.fire({
            icon : 'warning',
            text : '로그인이 필요합니다.',
            confirmButtonText : '확인'
        }).then(() => {

            window.localStorage.removeItem('accessToken'); 
            dispatch(callLogoutAPI());
            navigate("/", {replace : true});
        })
    }
    // 로그아웃 클릭 핸들러
    const onClickLogoutHandler = () => {

        window.localStorage.removeItem('accessToken');

        // 로그아웃
        dispatch(callLogoutAPI());

        Swal.fire({
            icon : 'info',
            text : '로그아웃이 되어 메인화면으로 이동합니다.'
        }).then(() => {

            navigate("/", {replace : true});
            window.location.reload();
        })
    }

    return (
        <div className={HeaderCSS.header}>
            <img src={ `${process.env.PUBLIC_URL}/aurora.png` } onClick={() => navigate("/")} alt="메인로고"/>
            {isLogin && <img className={HeaderCSS.logout} src={ `${process.env.PUBLIC_URL}/logout.png` } onClick={onClickLogoutHandler} alt="로그아웃"/>}
        </div>
    )
}

export default Header;
