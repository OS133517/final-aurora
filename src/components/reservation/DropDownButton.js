
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SidebarCSS from "../subSidebar/SubSidebar.module.css";

function DropDownButton({ category, assetList }) {

    // const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line
    const activeStyle = {
        backgroundColor: "#73b8a3",
        color: "white"
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <button className={SidebarCSS.dropDownButtons} onClick={toggleMenu}>
                <img
                    className={SidebarCSS.dropDownArrow}
                    style={isOpen ? { transform: `rotate(90deg)` } : {}}
                    src={process.env.PUBLIC_URL + "/arrow.png"}
                    alt="화살표" />
                {category}
            </button>
            {isOpen && (
                <div className={SidebarCSS.dropDownMenus}>
                    {
                        Array.isArray(assetList) && assetList.map(asset => (
                            <NavLink 
                                style = { ({ isActive }) => isActive? activeStyle : undefined }
                                to={`/aurora/reservation/assets/${asset.assetCode}?name=${asset.assetName}`} 
                                key={asset.assetCode}
                            >
                                <span>{asset.assetName}</span>
                            </NavLink>
                        ))
                    }
                </div>
            )}
        </>
    );
}

export default DropDownButton