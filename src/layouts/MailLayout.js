import { Outlet } from "react-router";

import MailLayoutCSS from "./MailLayout.module.css";
import MailSidebar from "../components/subSidebar/MailSidebar";

function MailLayout() {

    return (
        <div className={MailLayoutCSS.mailLayout}>
            <MailSidebar/>
            <Outlet/>
        </div>
    );
}

export default MailLayout;