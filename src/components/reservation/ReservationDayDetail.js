import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { callReservationByDateAPI } from "../../apis/ReservationAPICall";
import DetailCSS from "./ReservationDayDetail.module.css";
import ReservationRegistModal from "./ReservationRegistModal";

function ReservationDayDetail({assetCode, assetName, selectedDate}) {

    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.reservationReducer.reservationsByDate);
    const [registModal, setRegistModal] = useState(false);


    useEffect(() => {

        if(selectedDate.day === '일요일' || selectedDate.day === '토요일') {
            return;
        }
        console.log("assetCode", assetCode);
        dispatch(callReservationByDateAPI({
            startDateTime : selectedDate.startDateTime,
            endDateTime : selectedDate.endDateTime,
            assetCode : assetCode
        }));
    // eslint-disable-next-line
    }, [selectedDate, assetCode]);

    const onClickRegist = () => {

        if(selectedDate.startDateTime === '') {
            Swal.fire({
                icon : 'warning',
                text : '날짜를 선택하세요.',
                confirmButtonText : '확인'
            }).then(() => {
                return;
            })
        } else {
            setRegistModal(!registModal);
        }
    }

    return (
        <div>
            {registModal?<ReservationRegistModal assetName={assetName} assetCode={assetName} setRegistModal={setRegistModal}/>:null}
            <div className={DetailCSS.detailHeader}>
                <span>{`${selectedDate.startDateTime.replace('00:00:00', '')||''}   ${selectedDate.day||''}`}</span>
                {selectedDate.day !== '토요일' && selectedDate.day !== '일요일' && <button onClick={onClickRegist} className={DetailCSS.okButton}>예약하기</button>}
                {selectedDate.day === '토요일' && <button className={DetailCSS.noButton}>예약불가</button>}
                {selectedDate.day === '일요일' && <button className={DetailCSS.noButton}>예약불가</button>}
            </div>
            <table className={DetailCSS.contentTable}>
                <thead className={DetailCSS.contentHead}>
                    <tr>
                        <th>
                            자산
                        </th>
                        <th>
                            이름
                        </th>
                        <th>
                            내용
                        </th>
                        <th>
                            소속팀
                        </th>
                        <th>
                            시간
                        </th>
                    </tr>
                </thead>
                <tbody className={DetailCSS.contentBody}>
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