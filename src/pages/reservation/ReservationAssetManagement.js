import { useEffect, useState } from "react";
import MyReservationCSS from "../reservation/MyReservation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callAllAssetsForManagementAPI } from "../../apis/ReservationAPICall";

function ReservationAssetManagement() {

    const dispatch = useDispatch();
    const assets = useSelector(state => state.reservationReducer.assetsForManagement);
    const assetList = assets?.data;
    const pageInfo = assets?.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {

        dispatch(callAllAssetsForManagementAPI());
    // eslint-disable-next-line
    }, [currentPage]);

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


    return (
        <>
            <div className={MyReservationCSS.myReservationDiv}>
                <div className={MyReservationCSS.myReservationHeader}>
                    <span>예약 품목 관리</span>
                    <div className={MyReservationCSS.imgDiv}>
                        {/* <img src={process.env.PUBLIC_URL + "/insert.png"} alt="추가"/> */}
                        <img src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>
                        <img src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>
                    </div>
                </div>
                <table className={MyReservationCSS.contentTable}>
                    <thead className={MyReservationCSS.contentHead}>
                        <tr>
                            <th>
                                <input type="checkBox" id="all" onClick={onClickAllCheck}/>
                            </th>
                            <th>
                                카테고리
                            </th>
                            <th>
                                품목 코드
                            </th>
                            <th>
                                품명
                            </th>
                            <th>
                                예약 가능 여부
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(assetList) && assetList.map((asset) => (
                                <tr key={asset.assetCode} id={asset.assetCode} onClick={onClickCheck}>
                                    <td>
                                        <input type="checkBox" id={`checkBox${asset.assetCode}`}/>
                                    </td>
                                    <td>
                                        {asset.assetCategory}
                                    </td>
                                    <td>
                                        {asset.assetCode}
                                    </td>
                                    <td>
                                        {asset.assetName}
                                    </td>
                                    <td>
                                        <select name='assetCode' value={asset.status}>
                                            <option value='Y'>Y</option>
                                            <option value='N'>N</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            Array.isArray(assetList) && assetList.length === 0 && (
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
                    { Array.isArray(assetList) &&
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
                    { Array.isArray(assetList) &&
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

export default ReservationAssetManagement;