import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBookModalCSS from "./AddBookFormModal.module.css";

function AddBookFormModal({setLoginModal}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={AddBookModalCSS.modal} >
        <div className={ AddBookModalCSS.modalContainer }>
            <div className={AddBookModalCSS.header}>
                연락처 추가
            </div>
            <div className={ AddBookModalCSS.modalDiv }>
            </div>
            <div className={AddBookModalCSS.buttonDiv}>
                <button>나가기</button>
                <button>추가하기</button>
            </div>
        </div>
    </div>
    );
}

export default AddBookFormModal;