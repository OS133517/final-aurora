import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DayWorklogsCSS from "./DayWorklogs.module.css";
import { callDayWorklogListAPI } from "../../apis/DayWorklogAPICall";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { callMemberInfoAPI } from '../../apis/MemberAPICall';

function DayWorklogs() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

    const memberInfo = useSelector(state => state.memberReducer.memberInfo);
    
    const dayWorklogs = useSelector(state => state.dayWorklogReducer.dayWorklog);
    console.log('dayWorklogs : ', dayWorklogs);
    
    const dayWorklogList = dayWorklogs?.data;

    const dayWorklog = useSelector(state => state.dayWorklogReducer.dayWorklog);

    
    
    useEffect (() => {
        console.log("dayWorklog.memberCode" + dayWorklog.memberCode);
        dispatch(callMemberInfoAPI({
            memberCode : loginMember.memberCode
        }));
    },[dayWorklog]
    );
    
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
            memberCode : loginMember.memberCode
        }));
    },[currentPage]
    );
    
    const onClickDayWorklogHandler = (dayWorklogCode) => {
        navigate(`/aurora/worklog/day/${ dayWorklogCode }`, { replace : false });
        window.location.reload();
    }

    return (
        <div className={ DayWorklogsCSS.dayWorklogsDiv }>
            <div>
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
                            <th>
                                부서
                            </th>
                            <th>
                                직급
                            </th>
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
                                    <td>
                                        { memberInfo.deptName }
                                    </td>
                                    <td>
                                        { memberInfo.jobName }
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
                    <button
                        key={num} 
                        onClick={() => setCurrentPage(num)}
                        style={currentPage === num ? { backgroundColor: "rgb(12, 250, 180)" } : null}
                        className={DayWorklogsCSS.pagingBtn}
                        >
                        {num}
                    </button>
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