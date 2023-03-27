function Worklog() {

    return (
        <div   
        className={ WorklogCSS.worklogDiv } 
        onClick={ () => onClickDayWorklogHandler(dayWorklogCode) }   
        >
            { dayReportingDate}


        </div>
    )
}

export default Worklog;