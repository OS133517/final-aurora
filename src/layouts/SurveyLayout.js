import SurveySidebar from "../components/subSidebar/SurveySidebar";
import AddBookLayoutCSS from "./AddBookLayout.module.css";
import { Outlet } from "react-router";

function SurveyLayout() {

    return (
        <div className={AddBookLayoutCSS.addBookLayout}>
            <SurveySidebar/>
            <Outlet/>
        </div>
    );
}

export default SurveyLayout;