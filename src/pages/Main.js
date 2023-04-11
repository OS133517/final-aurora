import AttInMain from "../components/common/AttInMain";
import CalendarInMain from "../components/common/CalendarInMain";
import MainCSS from "./Main.module.css";

function Main() {

    return (
        <div className={MainCSS.componentsContainer}>
            <AttInMain />
            <CalendarInMain />
        </div>
    )
}

export default Main;