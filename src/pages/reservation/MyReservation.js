import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import MyReservationCSS from "../reservation/MyReservation.module.css";
import { callMyReservationAPI } from "../../apis/ReservationAPICall";
import ReservationModal from "../../components/reservation/ReservationModal";
import Swal from "sweetalert2";

function MyReservation() {

    const dispatch = useDispatch();

    const myReservation = useSelector(state => state.reservationReducer.reservations);
    const reservationList = myReservation?.data;
    const pageInfo = myReservation?.pageInfo;
    const isLogin = decodeJwt(window.localStorage.getItem("accessToken"));
    
    const [reservationModal, setReservationModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNo, setSelectedNo] = useState("");
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {

        getData();
    // eslint-disable-next-line
    }, [currentPage])

    const getData = () => {

        dispatch(callMyReservationAPI({
            memberCode : isLogin.memberCode,
            currentPage : currentPage
        }))
    }

    // 전체 체크 박스 관리용 함수
    const onClickAllCheck = (e) => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);

        if(e.target.id === 'all' && e.target.checked === false) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = false);
        } else if (e.target.id === 'all' && e.target.checked === true) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = true);
        } 
    }

    // 체크 박스 관리용 함수
    const onClickCheck = (e) => {
        
        if(e.target.type === 'checkbox') return;

        const ckBox = document.querySelector(`#checkBox${e.currentTarget.id}`);
        ckBox.checked = !ckBox.checked;
    }

    const onClickReservationUpdate = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]:not(#all)`);
        const checkedList = [...checkList].filter(check => check.checked === true).map(item => item.id.replace("checkBox", ""));

        if(checkedList.length > 1) {

            Swal.fire({
                icon : 'error',
                text : '수정 시 한개만 선택해주세요.'
            })
            return;
        } else if (checkedList.length === 0) {

            Swal.fire({
                icon : 'error',
                text : '선택된 예약이 없습니다.'
            })
            return;
        } 

        setSelectedNo(checkedList[0]);
        setReservationModal(!reservationModal);
    }

    return (
        <>
            {reservationModal? <ReservationModal reservationNo={selectedNo} setReservationModal={setReservationModal}/>:null}
            <div className={MyReservationCSS.myReservationDiv}>
                <div className={MyReservationCSS.myReservationHeader}>
                    <span>내 예약</span>
                    <div className={MyReservationCSS.imgDiv}>
                        <img onClick={onClickReservationUpdate} src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>
                        <img src={process.env.PUBLIC_URL + "/reservationDelete.png"} alt="삭제"/>
                    </div>
                </div>
                <table className={MyReservationCSS.contentTable}>
                    <thead className={MyReservationCSS.contentHead}>
                        <tr>
                            <th>
                                <input type="checkBox" id="all" onClick={onClickAllCheck}/>
                            </th>
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
                                팀
                            </th>
                            <th>
                                시간
                            </th>
                            <th>
                                예약일
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(reservationList) && reservationList.map((reservation) => (
                                <tr key={reservation.reservationNo} id={reservation.reservationNo} onClick={onClickCheck}>
                                    <td>
                                        <input type="checkBox" id={`checkBox${reservation.reservationNo}`}/>
                                    </td>
                                    <td>
                                        {reservation.assetName}
                                    </td>
                                    <td>
                                        {reservation.memberName}
                                    </td>
                                    <td>
                                        {reservation.description}
                                    </td>
                                    <td>
                                        {reservation.team}
                                    </td>
                                    <td>
                                        {reservation.startTime} ~ {reservation.endTime}
                                    </td>
                                    <td>
                                        {reservation.reservationDate}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            Array.isArray(reservationList) && reservationList.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{textAlign:"center"}}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className={ MyReservationCSS.pagingBtnDiv }>
                    { Array.isArray(reservationList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={ MyReservationCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                    }
                    {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                            className={ MyReservationCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    { Array.isArray(reservationList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                        className={ MyReservationCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                    }
                </div>
            </div>
        </>
    );
}

export default MyReservation;