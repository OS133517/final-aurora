import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddBookModalCSS from "./AddBookFormModal.module.css";
import { callAddBookRegistAPI } from "../../apis/AddBookAPICall";
import Swal from "sweetalert2";

function AddBookUpdateModal({setUpdateModalIsOn}) {

    const dispatch = useDispatch();
    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    
    const [form, setForm] = useState({
        name : '',
        phone : '',
        email : '',
        company : '',
        department : '',
        comPhone : '',
        groupCode : ''
    })

  
    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setUpdateModalIsOn(false);
        }
    }

    const onChangeHandler = (e) => {
        
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

  
    return (
        <div className={AddBookModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={AddBookModalCSS.modalContainer}>
                <div className={AddBookModalCSS.header}>
                    주소록 수정
                </div>
                <div className={AddBookModalCSS.modalDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="name">이름</label></td>
                                <td><input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="phone">휴대 전화</label></td>
                                <td><input 
                                        type="text" 
                                        name="phone" 
                                        id="phone" 
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">이메일</label></td>
                                <td><input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="company">회사</label></td>
                                <td><input 
                                        type="text" 
                                        name="company" 
                                        id="company" 
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="department">부서</label></td>
                                <td><input 
                                        type="text" 
                                        name="department" 
                                        id="department"
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="jobName">직급</label></td>
                                <td><input 
                                        type="text" 
                                        name="jobName" 
                                        id="jobName" 
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td>그룹</td>
                                <td>
                                    <select name="groupCode" onChange={onChangeHandler}>
                                        <option value="requireSelect">그룹 선택</option>
                                    {
                                        Array.isArray(teamGroupList) && teamGroupList.map(group => (
                                        <option value={group.groupCode}>팀 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    {
                                        Array.isArray(personalGroupList) && personalGroupList.map(group => (
                                        <option value={group.groupCode}>개인 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={AddBookModalCSS.buttonDiv}>
                    <button onClick={() => setUpdateModalIsOn(false)}>나가기</button>
                    <button onClick={""}>추가하기</button>
                </div>
            </div>
        </div>
    );
}

export default AddBookUpdateModal;