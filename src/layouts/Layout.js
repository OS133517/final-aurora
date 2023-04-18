import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import LayoutCSS from "./Layout.module.css";
import Messenger from "../components/common/Messenger";

function Layout() {

    return (
        <>
            <Header />
            <div className={LayoutCSS.layout}>
                <Sidebar />
                <Messenger />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;