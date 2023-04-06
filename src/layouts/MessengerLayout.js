import MessengerLayouttCSS from "./MessengerLayout.module.css";
import { Outlet } from "react-router";
import MessengerSidebar from "../components/subSidebar/MessengerSidebar";

function MessengerLayout() {

    return (
        <div className={MessengerLayouttCSS.MessengerLayout}>
            <MessengerSidebar />
            <Outlet />
        </div>
    );
}

export default MessengerLayout;