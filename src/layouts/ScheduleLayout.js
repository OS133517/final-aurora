import ScheduleLayoutCSS from "./ScheduleLayout.module.css";
import ScheduleSidebar from "../components/subSidebar/ScheduleSidebar";
import { Outlet } from "react-router";

function ScheduleLayout() {

    return (
        <div className={ScheduleLayoutCSS.scheduleLayout}>
            <ScheduleSidebar/>
            <Outlet/>
        </div>
    );
}

export default ScheduleLayout;