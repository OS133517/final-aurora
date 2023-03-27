import WorklogLayoutCSS from "./WorklogLayout.module.css";
import WorklogSidebar from "../components/subSidebar/WorklogSidebar";
import { Outlet } from "react-router";

function WorklogLayout() {

    return (
        <div className={WorklogLayoutCSS.WorklogLayout}>
            <WorklogSidebar/>
            <Outlet/>
        </div>
    );
}

export default WorklogLayout;