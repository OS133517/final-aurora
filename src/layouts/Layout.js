import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import LayoutCSS from "./Layout.module.css";

function Layout() {

    return (
        <div className={LayoutCSS.layout}>
            <Header/>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}

export default Layout;