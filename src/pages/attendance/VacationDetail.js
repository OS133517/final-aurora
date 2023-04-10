import React from 'react';
import VacationDetailCSS from "./VacationDetail.module.css"

export default function VacationDetail() {
    return (

    
        <div className={VacationDetailCSS.vacationDiv}>
            <div className={VacationDetailCSS.vacationHeader}>
                <span>휴가 상세</span>
            </div>
            <div className={VacationDetailCSS.topContainer}>
                <div className={VacationDetailCSS.topContentWrapper}>
                    <span className={VacationDetailCSS.topContentTitle}>휴가관리</span>
                <div className={VacationDetailCSS.topContent}>
                    
                
                    <div className={VacationDetailCSS.topBox}>
                        <div className={VacationDetailCSS.inBox}>

                        </div>
                        <div className={VacationDetailCSS.inBox}>

                        </div>
                        <div className={VacationDetailCSS.inBox}>

                        </div>
                        
                    </div>
                    
                </div>
                <div className={VacationDetailCSS.buttonWrapper}>
                     <button className={VacationDetailCSS.VacationButton} type="">휴가신청</button>
                </div>
                </div>
            </div>
            <div className={VacationDetailCSS.lowContainer}>

            </div>
        </div>
    
    );
}

