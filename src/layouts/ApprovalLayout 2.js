import { Outlet } from "react-router-dom"
import ApprovalSidebar from "../components/subSidebar/ApprovalSidebar";
import ApprovalLayoutCSS from "./ApprovalLayout.module.css"

function ApprovalLayout() {

    return(
        <div className={ApprovalLayoutCSS.approvalLayout}>
            <ApprovalSidebar/>
            <Outlet/>
        </div>
    );
}

export default ApprovalLayout;