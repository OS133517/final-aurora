import SidebarCSS from "./Sidebar.module.css";

function Sidebar() {

    return (
        <div className={SidebarCSS.sidebarDiv}>
            <div>
                <img src={ `${process.env.PUBLIC_URL}home.png` } alt="홈"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}mail.png` } alt="메일"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}addBook.png` } alt="주소록"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}board.png` } alt="게시판"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}calendar.png` } alt="일정관리"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}toDo.png` } alt="to Do"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}worklog.png` } alt="업무일지"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}innOut.png` } alt="근태관리"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}approval.png` } alt="전자결재"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}hrm.png` } alt="인사관리"/>
            </div>
            <div>
                <img src={ `${process.env.PUBLIC_URL}report.png` } alt="보고"/>
            </div>
        </div>
    )
}

export default Sidebar;