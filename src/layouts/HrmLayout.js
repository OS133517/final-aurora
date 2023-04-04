import React from 'react';
import HrmSidebar from '../components/subSidebar/HrmSidebar';
import { Outlet } from "react-router";
import HrmLayoutCSS from "./HrmLayout.module.css";

export default function HrmLayout() {
    return (
        <div className={HrmLayoutCSS.hrmLayout}>
        <HrmSidebar/>
            <Outlet/>
        </div>
    );
}

