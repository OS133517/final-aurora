import AddBookLayoutCSS from "./AddBookLayout.module.css";
import AddBookSidebar from "../components/subSidebar/AddBookSidebar";
import { Outlet } from "react-router";

function AddBookLayout() {

    return (
        <div className={AddBookLayoutCSS.addBookLayout}>
            <AddBookSidebar/>
            <Outlet/>
        </div>
    );
}

export default AddBookLayout;