import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import SidebarCSS from "./SubSidebar.module.css";
import { callAssetsAPI } from "../../apis/ReservationAPICall";
import DropDownButton from "../reservation/DropDownButton";

function ReservationSidebar() {

    const dispatch = useDispatch();

    const assetList = useSelector(state => state.reservationReducer.assets);

    const loginMember = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {

        dispatch(callAssetsAPI());
    }, [])


    return (
        <>
         <div className={SidebarCSS.sidebarDiv}>
                <div className={SidebarCSS.sideHeader}>
                    <span>예약</span>
                </div>
                <div>
                    <button className={SidebarCSS.buttons}>내 예약</button>
                    {Array.isArray(assetList) && assetList.map(asset => <DropDownButton category={asset.assetCategory}/>)}
                </div>
            </div>
        </>
    );
}

export default ReservationSidebar;