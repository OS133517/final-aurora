import { useEffect, useState } from "react";
import SidebarCSS from "../subSidebar/SubSidebar.module.css";

function DropDownButton({category}) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

    })

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <button className={SidebarCSS.dropDownButtons} onClick={toggleMenu}>
            <img 
                className={SidebarCSS.dropDownArrow} 
                style={isOpen? {transform:`rotate(90deg)`}:{}} 
                src={process.env.PUBLIC_URL + "/arrow.png"} 
                alt="화살표"/>
            {category}
        </button>
    );
}

export default DropDownButton