import SidebarCSS from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

function Sidebar() {

    const activeStyle = { borderLeft : "7px solid orange"};

    const sidebarMenus = ["home", "mail", "address-book", "calendar", "toDo", "worklog", "innOut", "approval", 
                            "hrm", "report", "reservation", "survey"];

    return (
        <div className={SidebarCSS.sidebarDiv}>
            {sidebarMenus.map((menu) => (
                <NavLink 
                    key={menu}
                    to = { `/aurora/${menu}` }
                    style = { ({ isActive }) => isActive? activeStyle : undefined }
                    ><img src={ process.env.PUBLIC_URL + "/" + menu + ".png" } alt={ menu }/></NavLink>
            ))}
        </div>
    )
}

export default Sidebar;
