import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReservationByDateAPI } from "../../apis/ReservationAPICall";
import DetailCSS from "./ReservationDayDetail.module.css";

function ReservationDayDetail({assetCode, selectedDate}) {

    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.reservationReducer.reservations)

    useEffect(() => {

        if(selectedDate.day === '일요일' || selectedDate.day === '토요일') {
            return;
        }

        dispatch(callReservationByDateAPI({
            selectedDate : selectedDate.date,
            assetCode : assetCode
        }));
    }, [selectedDate])

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
                            소속팀
                        </td>
                        <td>
                            시간
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(reservationList) && reservationList.length > 0? reservationList.map(
                        item => (
                            <tr key={item.reservationNo}>
                                <td>
                                    {item.assetName}
                                </td>
                                <td>
                                    {item.memberName}
                                </td>
                                <td>
                                    {item.description}
                                </td>
                                <td>
                                    {item.team}
                                </td>
                                <td>
                                    {item.startTime} ~ {item.endTime}
                                </td>
                            </tr>
                        )
                    ): (
                        <tr>
                            <td colSpan="5" style={{textAlign:"center"}}>
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationDayDetail;