import { useEffect, useState } from "react";
import AttendanceCSS from "./AttInMain.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useDispatch, useSelector } from "react-redux";
import { callEndTimeAPI, callSelectWorkStatus, callWorkTimeAPI } from "../../apis/AttendanceAPICall";
import Swal from "sweetalert2";
import { callMemberDetailAPI } from "../../apis/HrmAPICall";
import { useNavigate } from "react-router";

function AttInMain() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [workStatus, setWorkStatus] = useState("퇴근");
    const memberInfo = useSelector(state => state.hrmReducer?.memberDetail);
    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberCode = loginMember.memberCode;
    const memberName = memberInfo?.memberDTO?.memberName;
    const deptName = memberInfo?.memberDTO?.deptName;

    useEffect(() => {

        dispatch(callMemberDetailAPI({

            memberCode: memberCode
        }));
    }, [])

    useEffect(() => {

        const savedWorkStatus = localStorage.getItem("workStatus");

        if (savedWorkStatus) {
            setWorkStatus(savedWorkStatus);
        } else {
            setWorkStatus("퇴근");
        }
    }, []);

    const handleStartWork = async (memberCode) => {

        await dispatch(callWorkTimeAPI({

            memberCode: memberCode
        }));

        const action = await dispatch(callSelectWorkStatus({ memberCode: memberCode }));

        if (action && action.payload) {

            const response = action.payload;
            setWorkStatus(response.WORK_STATUS);
            localStorage.setItem("workStatus", "근무");

            Swal.fire({
                title: "Success!",
                text: "출근 처리되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "출근 처리에 실패하였습니다.",
                icon: "error",
                confirmButtonText: "확인",
            });

            localStorage.setItem("workStatus", "근무");
        }
    };

    const handleEndWork = async (memberCode) => {

        await dispatch(callEndTimeAPI({

            memberCode: memberCode
        }));

        const action = await dispatch(callSelectWorkStatus({ memberCode: memberCode }));

        if (action && action.payload) {

            const response = action.payload;
            setWorkStatus(response.WORK_STATUS);
            localStorage.setItem("workStatus", "퇴근");

            Swal.fire({
                title: "Success!",
                text: "퇴근 처리되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            });
        } else {

            Swal.fire({
                title: "Error!",
                text: "퇴근 처리에 실패하였습니다.",
                icon: "error",
                confirmButtonText: "확인",
            });

            localStorage.setItem("workStatus", "퇴근");
        }
    };

    return (
        <div className={AttendanceCSS.boxWrapper2}>
            <div className={AttendanceCSS.Box2}>
                <div className={AttendanceCSS.header}>
                    <div onClick={() => navigate("/aurora/attendance")} style={{ cursor: "pointer" }}>
                        근태
                    </div>
                    <div>
                        {new Date().toLocaleDateString('kr')}
                    </div>
                </div>
                <div className={AttendanceCSS.graphDiv}>
                    그래프 넣을 곳
                </div>
                <div className={AttendanceCSS.footer}>
                    <span> {deptName} 부서, {memberName}님 환영합니다 </span>
                    <div>
                        {workStatus === '퇴근' && (
                            <button type="button" onClick={() => handleStartWork(memberCode)}>출근</button>
                        )}
                        {workStatus === '근무' && (
                            <button type="button" onClick={() => handleEndWork(memberCode)}>퇴근</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttInMain;