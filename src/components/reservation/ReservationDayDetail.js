import DetailCSS from "./ReservationDayDetail.module.css";

function ReservationDayDetail({selectedDate}) {

    return (
        <div>
            <div className={DetailCSS.detailHeader}>
                <span>{`${selectedDate.date||''}   ${selectedDate.day||''}`}</span>
                {selectedDate.day !== '토요일' && selectedDate.day !== '일요일' && <button className={DetailCSS.okButton}>예약하기</button>}
                {selectedDate.day === '토요일' && <button className={DetailCSS.noButton}>예약불가</button>}
                {selectedDate.day === '일요일' && <button className={DetailCSS.noButton}>예약불가</button>}
            </div>
            <table className={DetailCSS.detailContent}>
                <thead>
                    <tr>
                        <td>
                            자산
                        </td>
                        <td>
                            이름
                        </td>
                        <td>
                            내용
                        </td>
                        <td>
                            부서
                        </td>
                        <td>
                            시간
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default ReservationDayDetail;