import SidebarCSS from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    //eslint-disable-next-line
    const navigate = useNavigate();
    
    const activeStyle = { borderLeft : "7px solid orange"};
    const sidebarMenus = ["home", "mail", "address-book", "board", "calendar", "toDo", "worklog", "innOut", "approval", 
                            "hrm", "report"];

    return (
        <div className={SidebarCSS.sidebarDiv}>

            {sidebarMenus.map((menu) => (
                <NavLink 
                    key={menu}
                    to = { `/${menu}` }
                    style = { ({ isActive }) => isActive? activeStyle : undefined }
                    ><img src={ process.env.PUBLIC_URL + "/" + menu + ".png" } alt={ menu }/></NavLink>
            ))}
        </div>
    )
}

export default Sidebar;
