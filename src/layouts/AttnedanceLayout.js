import React from 'react';
import AttendanceSidebar from '../components/subSidebar/AttendanceSidebar';
import { Outlet } from "react-router";
import AttnedanceLayoutCSS from "./AttendanceLayout.module.css";

export default function AttendanceLayout() {
    return (
        <div className={AttnedanceLayoutCSS.attendanceLayout}>
            <AttendanceSidebar/>
            <Outlet/>
        </div>
    );
}

