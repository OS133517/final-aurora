import WeekWorklogsCSS from "./WeekWorklogs.module.css";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callWeekWorklogListAPI } from "../../apis/WeekWorklogAPICall";
import { callMemberInfoAPI } from '../../apis/MemberAPICall';

function WeekWorklogs() {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

    const memberInfo = useSelector(state => state.memberReducer.memberInfo);
    
    const weekWorklogs = useSelector(state => state.weekWorklogReducer.weekWorklog);
    console.log('weekWorklogs : ', weekWorklogs);
    
    const weekWorklogList = weekWorklogs?.data;

    useEffect (() => {
        console.log("weekWorklogs.memberCode" + weekWorklogs.memberCode);
        dispatch(callMemberInfoAPI({
            memberCode : loginMember.memberCode
        }));
    },[weekWorklogs]
    );
    
    const pageInfo = weekWorklogs?.pageInfo;
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    };

    useEffect (() => {

        dispatch(callWeekWorklogListAPI({
            currentPage : currentPage,
            memberCode : loginMember.memberCode
        }));
    },[currentPage]
    );
    
    const onClickWeekWorklogHandler = (weekWorklogCode) => {
        navigate(`/aurora/worklog/week/${ weekWorklogCode }`, { replace : false });
    }

    return (
        <div className={ WeekWorklogsCSS.weekWorklogsDiv }>
            <div>
                <div className={ WeekWorklogsCSS.weekWorklogsHeader }>주간 업무일지</div>
                <table className={ WeekWorklogsCSS.contentTable }>
                    <thead className={ WeekWorklogsCSS.contentHead }>
                        
                        <tr>
                            <th>
                                번호
                            </th>
                            <th>
                                작성일
                            </th>
                            <th>
                                직급
                            </th>
                            <th>
                                부서
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            Array.isArray(weekWorklogList) && weekWorklogList.map((weekWorklog) => (
                                <tr key={weekWorklog.weekWorklogCode} id={weekWorklog.weekWorklogCode} onClick={() => onClickWeekWorklogHandler(weekWorklog.weekWorklogCode)}>
                                    <td>
                                        {weekWorklog.weekWorklogCode}
                                    </td>
                                    <td>
                                        {weekWorklog.weekReportingDate}
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
                <div className={ WeekWorklogsCSS.pagingBtnDiv }>
                    { Array.isArray(weekWorklogList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={ WeekWorklogsCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                    }
                    {pageNumber.map((num) => (
                        <button
                            key={num} 
                            onClick={() => setCurrentPage(num)}
                            style={currentPage === num ? { backgroundColor: "rgb(12, 250, 180)" } : null}
                            className={WeekWorklogsCSS.pagingBtn}
                        >
                        {num}
                        </button>
                    ))}
                    { Array.isArray(weekWorklogList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                        className={ WeekWorklogsCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                    }
                </div>
            </div>
        </div>    
    );
};

export default WeekWorklogs;