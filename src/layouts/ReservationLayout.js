import AddBookLayoutCSS from "./AddBookLayout.module.css";
import ReservationSidebar from "../components/subSidebar/ReservationSidebar";
import { Outlet } from "react-router";

function ReservationLayout() {

    return (
        <div className={AddBookLayoutCSS.addBookLayout}>
            <ReservationSidebar/>
            <Outlet/>
        </div>
    );
}

export default ReservationLayout;