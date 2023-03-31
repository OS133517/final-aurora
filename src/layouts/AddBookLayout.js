import AddBookLayoutCSS from "./AddBookLayout.module.css";
import AddBookSidebar from "../components/subSidebar/AddBookSidebar";
import { Outlet } from "react-router";

function AddBookLayout() {

    return (
        <div className={AddBookLayoutCSS.addBookLayout}>
            <AddBookSidebar/>
            <div className={AddBookLayoutCSS.outletDiv}>
                <Outlet/>
            </div>
        </div>
    );
}

export default AddBookLayout;