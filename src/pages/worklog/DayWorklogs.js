import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayWorklogsCSS from "./DayWorklogs.module.css";
import { callDayWorklogListAPI } from "../../apis/DayWorklogAPICall";
import { useNavigate } from "react-router-dom";

function DayWorklogs() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    
    const dayWorklogs = useSelector(state => state.dayWorklogReducer.dayWorklog);
    console.log('dayWorklogs : ', dayWorklogs);
    
    const dayWorklogList = dayWorklogs?.data;
    
    const pageInfo = dayWorklogs?.pageInfo;
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    };

    useEffect (() => {

        dispatch(callDayWorklogListAPI({
            currentPage : currentPage,
            memberCode : 1 
        }));
    },[currentPage]
    );
    
    const onClickDayWorklogHandler = (dayWorklogCode) => {
        navigate(`/worklog/day/${ dayWorklogCode }`, { replace : false });
    }

    return (
        <div>
            <div className={ DayWorklogsCSS.dayWorklogsDiv }>
                <div className={ DayWorklogsCSS.dayWorklogsHeader }>일일 업무일지</div>
                <table className={ DayWorklogsCSS.contentTable }>
                    <thead className={ DayWorklogsCSS.contentHead }>
                        
                        <tr>
                            <th>
                                번호
                            </th>
                            <th>
                                작성일
                            </th>
                            {/* <th>
                                직급
                            </th>
                            <th>
                                부서
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            Array.isArray(dayWorklogList) && dayWorklogList.map((dayWorklog) => (
                                <tr key={dayWorklog.dayWorklogCode} id={dayWorklog.dayWorklogCode} onClick={() => onClickDayWorklogHandler(dayWorklog.dayWorklogCode)}>
                                    <td>
                                        {dayWorklog.dayWorklogCode}
                                    </td>
                                    <td>
                                        {dayWorklog.dayReportingDate}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className={ DayWorklogsCSS.pagingBtnDiv }>
                    { Array.isArray(dayWorklogList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={ DayWorklogsCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                    }
                    {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                            className={ DayWorklogsCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    { Array.isArray(dayWorklogList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                        className={ DayWorklogsCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                    }
                </div>
            </div>
        </div>    
    );
};
 
export default DayWorklogs;