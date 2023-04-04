import { useEffect, useState } from "react";
import AssetManagementCSS from "../reservation/ReservationAssetManagement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callAllAssetsAPI, callAllAssetsForManagementAPI, callAssetDeleteAPI, callAssetStatusChangeAPI } from "../../apis/ReservationAPICall";
import Swal from "sweetalert2";
import ReservationAssetModal from "../../components/reservation/ReservationAssetModal";

function ReservationAssetManagement() {

    const dispatch = useDispatch();
    const assets = useSelector(state => state.reservationReducer.assetsForManagement);
    const assetResult = useSelector(state => state.reservationReducer.assetResult);
    const assetList = assets?.data;
    const pageInfo = assets?.pageInfo;

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    const [isWarned, setIsWarned] = useState(false);
    const [assetModal, setAssetModal] = useState(false);

    useEffect(() => {

        dispatch(callAllAssetsForManagementAPI());
    // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {

        if(assetResult.status === 200) {
            dispatch(callAllAssetsForManagementAPI());
            dispatch(callAllAssetsAPI());
        } else if(assetResult.status === 400) {
            Swal.fire({
                icon : 'error',
                text : assetResult.message
            })
        }
    }, [assetResult]);

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

    const onChangeStatusHandler = (e) => {

        if(!isWarned) {
            Swal.fire({
                icon : 'warning',
                text : '예약 가능 상태가 변경됩니다.'
            });

            setIsWarned(!isWarned);
        }

        dispatch(callAssetStatusChangeAPI({
            assetCode : e.target.id,
            status : e.target.value
        }));
    }

    const onClickDelete = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const deleteList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));

        if(deleteList.length === 0) {

            Swal.fire({
                icon : 'warning',
                text : '선택된 품목이 없습니다.'
            });

            return;
        }

        Swal.fire({
            icon : "warning",
            title : `${deleteList.length} 개의 품목이 삭제됩니다.`,
            text : "정말 삭제하시겠습니까?",
            showCancelButton : true,
            cancelButtonText : '취소',
            confirmButtonText : '확인',
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(callAssetDeleteAPI({
                    assetCodes : deleteList
                }));
            } else {
                Swal.fire('취소되었습니다.');
            }
        })
    }

    return (
        <>
            {assetModal? <ReservationAssetModal setAssetModal={setAssetModal}/> : null}
            <div className={AssetManagementCSS.myReservationDiv}>
                <div className={AssetManagementCSS.myReservationHeader}>
                    <span>예약 품목 관리</span>
                    <div className={AssetManagementCSS.imgDiv}>
                        <img onClick={() => setAssetModal(!assetModal)} src={process.env.PUBLIC_URL + "/itemInsert.png"} alt="추가"/>
                        <img onClick={onClickDelete} src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>
                    </div>
                </div>
                <table className={AssetManagementCSS.contentTable}>
                    <thead className={AssetManagementCSS.contentHead}>
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
                                        <select name='assetStatus' id={asset.assetCode} value={asset.status} onChange={onChangeStatusHandler}>
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
                <div className={ AssetManagementCSS.pagingBtnDiv }>
                    { Array.isArray(assetList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className={ AssetManagementCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                    }
                    {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                            className={ AssetManagementCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    { Array.isArray(assetList) &&
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                        className={ AssetManagementCSS.pagingBtn }
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