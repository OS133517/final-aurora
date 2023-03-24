import { useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

function Header() {

    const navigate = useNavigate();

    return (
        <div className={HeaderCSS.header}>
            <img src={ `${process.env.PUBLIC_URL}/aurora.png` } onClick={() => navigate("/")} alt="메인로고"/>
        </div>
    )
}

export default Header;