import { useState } from "react";
import AssetModalCSS from "./ReservationAssetModal.module.css";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { callAssetRegistAPI } from "../../apis/ReservationAPICall";

function ReservationAssetModal({setAssetModal}) {

    const dispatch = useDispatch();
    const assetList = useSelector(state => state.reservationReducer.assets);
    let categoryList;
    if(Array.isArray(assetList)) {

        categoryList = assetList.filter((asset, index) => {
            return (
    
                assetList.findIndex((asset2, index2) => {
                return asset.assetCategory === asset2.assetCategory;
                }) === index
            );
        });
    }
   
    const [form, setForm] = useState({
        assetCode : "",
        assetName : "",
        assetCategory : "",
        status : "Y"
    });

    const [newCategory, setNewCategory] = useState(false);

    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setAssetModal(false);
        }
    }

    const onChangeHandler = (e) => {
        
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClickAssetRegist = () => {

        if(form.assetName === '' || form.assetCategory === '' || form.assetCode === '') {
            Swal.fire({
                icon : 'warning',
                text : '모두 작성해주세요'
            });
        } else {
            dispatch(callAssetRegistAPI({
                form : form
            }));

            setAssetModal(false);
        }
    }

    return (
        <div className={AssetModalCSS.modalBackground} onClick={onClickModalOff}>
        <div className={AssetModalCSS.modalContainer}>
            <div className={AssetModalCSS.header}>
                예약 품목 추가
            </div>
            <div className={AssetModalCSS.modalDiv}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="assetName">품명</label></td>
                            <td><input type="text" name="assetName" value={form.assetName} onChange={onChangeHandler}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="name">카테고리</label></td>
                            <td id={AssetModalCSS.category}>
                                <select name="assetCategory" value={!newCategory && form.assetCategory} onChange={onChangeHandler}>
                                    <option name="assetCategory">선택</option>
                                    {Array.isArray(categoryList) && categoryList.map(item => (
                                        <option key={item.assetCode} name="assetCategory" value={item.assetCategory}>{item.assetCategory}</option>
                                    ))}
                                </select>
                                <button onClick={() => {setForm({...form, assetCategory : ""}); setNewCategory(!newCategory);}}>카테고리 추가</button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                {newCategory && <input type="text" name="assetCategory" value={newCategory && form.assetCategory} onChange={onChangeHandler}/>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="assetCode">품목 코드</label></td>
                            <td><input type="text" name="assetCode" value={form.assetCode} onChange={onChangeHandler}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="startTime">상태</label></td>
                            <td>
                                <select name="status" value={form.status} onChange={onChangeHandler}>
                                    <option name="status" value="Y">Y</option>
                                    <option name="status" value="N">N</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={AssetModalCSS.buttonDiv}>
                <button onClick={() => setAssetModal(false)}>나가기</button>
                <button onClick={onClickAssetRegist}>추가하기</button>
            </div>
        </div>
    </div>
    );
}

export default ReservationAssetModal;