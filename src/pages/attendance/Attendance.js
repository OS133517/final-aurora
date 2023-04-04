import React from 'react';
import AttendanceCSS from "./Attendance.module.css";

export default function Attendance() {
    return (
        <>
        <div className={AttendanceCSS.allArea}>
            <div className={AttendanceCSS.hrmHeader}>
                <span>근태 목록</span>
            </div>
            <div className={AttendanceCSS.attDiv}> 
                <div className={AttendanceCSS.boxContainer}>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>근태현황</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>지각</th>
                                        <th>결근</th>
                                        <th>조퇴</th>
                                        <th>무단결근</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>내용1</td>
                                        <td>내용2</td>
                                        <td>내용3</td>
                                        <td>내용4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>근무시간</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>근무일수</th>
                                        <th>총근무시간</th>
                                        <th>평균근무시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>내용1</td>
                                        <td>내용2</td>
                                        <td>내용3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={AttendanceCSS.boxWrapper}>
                        <span>휴가현황</span>
                        <div className={AttendanceCSS.box}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>잔여 휴가</th>
                                        <th></th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>내용1</td>
                                        <td><button type="">휴가신청</button>
                                            <button type="">반차신청</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div> 
                        </div>
                        <br/>
                      <div className={AttendanceCSS.boxContainer2}>
                        <div className={AttendanceCSS.boxWrapper2}>
                            <span>새로운 작은 박스 1</span>
                            <div className={AttendanceCSS.Box2}>
                    
                            </div>
                        </div>
                        <div className={AttendanceCSS.boxWrapper3}>
                            <span>새로운 작은 박스 2</span>
                            <div className={AttendanceCSS.Box3}>
                        
                            </div>
                        </div>  
                    </div>
                    
                </div>           
            </div>
        </>
    );
}