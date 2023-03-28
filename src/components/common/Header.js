import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";
import { callLogoutAPI } from "../../apis/MemberAPICall";
import Swal from "sweetalert2";

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = window.localStorage.getItem("accessToken");

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
