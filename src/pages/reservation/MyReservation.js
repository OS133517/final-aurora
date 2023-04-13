import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import MyReservationCSS from "../reservation/MyReservation.module.css";
import { callMyReservationAPI, callReservationDeleteAPI } from "../../apis/ReservationAPICall";
import ReservationUpdateModal from "../../components/reservation/ReservationUpdateModal";
import Swal from "sweetalert2";

function MyReservation() {

    const dispatch = useDispatch();

    const myReservation = useSelector(state => state.reservationReducer.reservations);
    const reservationResult = useSelector(state => state.reservationReducer?.reservationMessage);
    const reservationList = myReservation?.data;
    const pageInfo = myReservation?.pageInfo;
  
    const isLogin = decodeJwt(window.localStorage.getItem("accessToken"));
    
    const [updateModal, setUpdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNo, setSelectedNo] = useState("");
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {

        if(reservationResult.status === 200) {
            getData();
        } else if (reservationResult.status === 400) {
            Swal.fire({
                icon : 'error',
                text : reservationResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        }
    }, [reservationResult])
    
    useEffect(() => {

        getData();
    // eslint-disable-next-line
    }, [currentPage]);

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

            [...checkList].filter(check => check.id !== 'all' && !check.disabled).forEach(check => check.checked = false);
        } else if (e.target.id === 'all' && e.target.checked === true) {

            [...checkList].filter(check => check.id !== 'all' && !check.disabled).forEach(check => check.checked = true);
        } 
    }

    // 체크 박스 관리용 함수
    const onClickCheck = (e) => {
        
        if(e.target.type === 'checkbox') return;

        const ckBox = document.querySelector(`#checkBox${e.currentTarget.id}`);
        if(!ckBox.disabled) {
            ckBox.checked = !ckBox.checked;
        }
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
        setUpdateModal(!updateModal);
    }

    const onClickReservationDelete = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const deleteList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));

        if(deleteList.length === 0) {

            Swal.fire({
                icon : 'warning',
                text : '선택된 예약이 없습니다.'
            });

            return;
        }

        Swal.fire({
            icon : "warning",
            title : `${deleteList.length} 개의 예약이 삭제됩니다.`,
            text : "정말 삭제하시겠습니까?",
            showCancelButton : true,
            cancelButtonText : '취소',
            confirmButtonText : '확인',
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(callReservationDeleteAPI({
                    reservationNos : deleteList
                }));
            } else {
                Swal.fire('취소되었습니다.');
            }
        })
    }

    return (
        <>
            {updateModal? <ReservationUpdateModal reservationNo={selectedNo} setUpdateModal={setUpdateModal}/>:null}
            <div className={MyReservationCSS.myReservationDiv}>
                <div className={MyReservationCSS.myReservationHeader}>
                    <span>내 예약</span>
                    <div className={MyReservationCSS.imgDiv}>
                        <img onClick={onClickReservationUpdate} src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>
                        <img onClick={onClickReservationDelete} src={process.env.PUBLIC_URL + "/reservationDelete.png"} alt="삭제"/>
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
                                <tr 
                                    key={reservation.reservationNo} 
                                    id={reservation.reservationNo} 
                                    onClick={onClickCheck}
                                    style={new Date(reservation.startTime).getTime() < new Date().getTime()?{backgroundColor:'#E3E3E3', color:'black'}:null}>
                                    <td>
                                        <input 
                                            type="checkBox" 
                                            id={`checkBox${reservation.reservationNo}`}
                                            disabled={new Date(reservation.startTime).getTime() < new Date().getTime()? true:false}/>
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
                                        {reservation.teamName}
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
                    <button
                        key={num} onClick={() => setCurrentPage(num)}
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ MyReservationCSS.pagingBtn }
                    >
                    {num}
                    </button>
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