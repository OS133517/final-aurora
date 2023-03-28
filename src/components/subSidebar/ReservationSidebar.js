import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { decodeJwt } from "../../utils/tokenUtils";
import SidebarCSS from "./SubSidebar.module.css";
import { callAllAssetsAPI } from "../../apis/ReservationAPICall";
import DropDownButton from "../reservation/DropDownButton";
import { useNavigate } from "react-router";

function ReservationSidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const categoryList = useSelector(state => state.reservationReducer.assetCategories);
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

    // const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {

        // dispatch(callAssetCategoryAPI());
        dispatch(callAllAssetsAPI());
    // eslint-disable-next-line
    }, [])


    return (
        <>
         <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span>예약</span>
                </div>
                <div>
                    <button 
                        className={SidebarCSS.buttons} 
                        onClick={() => navigate("/aurora/reservation/my-reservation")}
                        >내 예약
                    </button>
                    {Array.isArray(categoryList) && categoryList.map(asset => <DropDownButton 
                                                                                        key={asset.assetCode} 
                                                                                        category={asset.assetCategory}
                                                                                        assetList={assetList.filter(item => item.assetCategory === asset.assetCategory)}/>)}
                </div>
            </div>
        </>
    );
}

export default ReservationSidebar;