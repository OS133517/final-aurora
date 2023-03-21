import SidebarCSS from "./Sidebar.module.css";
import { useNavigate } from "react-router";

function Sidebar() {

    const navigate = useNavigate();

    const sidebarMenus = ["home", "mail", "address-book", "board", "calendar", "toDo", "worklog", "innOut", "approval", "hrm", "report"];
    const onClickHandler = (menu) => {
        navigate(`/${menu}`);
    }

    return (
        <div className={SidebarCSS.sidebarDiv}>
            {sidebarMenus.map((menu) => (
                <div onClick={() => onClickHandler(menu)}>
                    <img src={process.env.PUBLIC_URL + menu + ".png"} alt={menu}/>
                </div>
            ))}
        </div>
    )
}

export default Sidebar;