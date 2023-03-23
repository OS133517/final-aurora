import HeaderCSS from "./Header.module.css";

function Header() {

    return (
        <div className={HeaderCSS.header}>
            <img src={ `${process.env.PUBLIC_URL}/aurora.png` } alt="메인로고"/>
        </div>
    )
}

export default Header;