import SidebarCSS from "./Sidebar.module.css";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();
    const activeStyle = { borderLeft : "7px solid orange"};

    const sidebarMenus = ["home", "mail", "address-book", "board", "calendar", "toDo", "worklog", "innOut", "approval", 
                            "hrm", "report"];

    return (
        <div className={SidebarCSS.sidebarDiv}>
            {sidebarMenus.map((menu) => (
                <NavLink 
                    to = { `/${menu}` }
                    style = { ({ isActive }) => isActive? activeStyle : undefined }
                    ><img src={ process.env.PUBLIC_URL + menu + ".png" } alt={ menu }/></NavLink>
            ))}
        </div>
    )
}

export default Sidebar;
