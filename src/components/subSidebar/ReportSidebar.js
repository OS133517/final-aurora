import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRoutineReportListByConditionsAPI,
    callCasualReportListByConditionsAPI,
} from "../../apis/ReportAPICall";
import { updateReportStatus } from '../../modules/ReportModule';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import SidebarCSS from "./SubSidebar.module.css";

function ReportSidebar() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 드롭다운 메뉴 조정용
    const [routineReportIsOpen, setRoutineReportIsOpen] = useState(false);
    const [casualReportIsOpen, setCasualReportIsOpen] = useState(false);

    const isReportUpdated = useSelector(state => state.reportReducer.isReportListUpdated);
    const routineReportList = useSelector(state => state.reportReducer.routineReportList.data);
    const casualReportList = useSelector(state => state.reportReducer.casualReportList.data);

    const activeStyle = {
        backgroundColor : "#73b8a3",
        color : "white"
    };

    useEffect(() => {

        dispatch(callRoutineReportListByConditionsAPI({
            completionStatus : 'N',
            offset : 1
        }));
        dispatch(callCasualReportListByConditionsAPI({
            completionStatus : 'N',
            offset : 1
        }));
        if (isReportUpdated) {
          dispatch(updateReportStatus(false));
        }
    // eslint-disable-next-line
    }, [isReportUpdated])

    return (
        <>
            <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span onClick={ () => window.location.href = "/aurora/reports/summary" }>보고</span>
                </div>
                <div>
                    <button 
                        className={SidebarCSS.buttons}
                        onClick={() => navigate('/aurora/reports/edit', { state: { isEdit: false }})}
                    >
                        보고서 작성
                    </button>
                    <button className={SidebarCSS.dropDownButtons} onClick={() => setRoutineReportIsOpen(!routineReportIsOpen)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={routineReportIsOpen? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "/arrow.png"} 
                            alt="화살표"/>정기 보고
                    </button>
                    {routineReportIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                            {
                                Array.isArray(routineReportList) && routineReportList.slice(0,10).map(routineReport => (
                                    <NavLink 
                                        style={ ({isActive}) => isActive? activeStyle : undefined }
                                        to={`/aurora/reports/${routineReport.reportCode}/rounds`}
                                        key={routineReport.reportCode}
                                    >
                                        <span id={`reportTitleSpan${routineReport.reportTitle}`}>{routineReport.reportTitle}</span>
                                    </NavLink>
                                ))
                            }
                            {
                                <NavLink 
                                    style={ ({isActive}) => isActive? activeStyle : undefined }
                                    to={`/aurora/reports/routines?completionStatus=N&offset=1`}
                                >
                                    <span>목록 보기</span>
                                </NavLink>
                            }
                        </div>
                    )}
                    <button className={SidebarCSS.dropDownButtons} onClick={() => setCasualReportIsOpen(!casualReportIsOpen)}>
                        <img 
                            className={SidebarCSS.dropDownArrow} 
                            style={casualReportIsOpen? {transform:`rotate(90deg)`}:{}} 
                            src={process.env.PUBLIC_URL + "/arrow.png"} 
                            alt="화살표"/>비정기 보고
                    </button>
                    {casualReportIsOpen && (
                        <div className={SidebarCSS.dropDownMenus}>
                            {
                                Array.isArray(casualReportList) && casualReportList.slice(0,10).map(casualReport => (
                                    <NavLink 
                                        style={ ({isActive}) => isActive? activeStyle : undefined }
                                        to={`/aurora/reports/casuals/${casualReport.reportCode}`}
                                        key={casualReport.reportCode}
                                    >
                                        <span id={`reportTitleSpan${casualReport.reportTitle}`}>{casualReport.reportTitle}</span>
                                    </NavLink>
                                ))
                            }
                            {
                                <NavLink 
                                    style={ ({isActive}) => isActive? activeStyle : undefined }
                                    to={`/aurora/reports/casuals?completionStatus=N&offset=1`}
                                >
                                    <span>목록 보기</span>
                                </NavLink>
                            }
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default ReportSidebar;