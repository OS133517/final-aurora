import ApprovalMain from "../components/common/ApprovalMain";
import AttInMain from "../components/common/AttInMain";
import CalendarInMain from "../components/common/CalendarInMain";
import MailMain from "../components/common/MailMain";
import MainCSS from "./Main.module.css";

function Main() {

    return (
        <div className={MainCSS.componentsContainer}>
            <AttInMain />
            <CalendarInMain />
            <ApprovalMain />
            <MailMain />
        </div>
    )
}

export default Main;