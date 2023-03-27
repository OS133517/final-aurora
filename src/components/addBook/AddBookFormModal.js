import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddBookModalCSS from "./AddBookFormModal.module.css";
import { callAddBookRegistAPI } from "../../apis/AddBookAPICall";
import Swal from "sweetalert2";

function AddBookFormModal({setAddBookModal}) {

    const dispatch = useDispatch();
    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    const addBookRegistResult = useSelector(state => state.addBookReducer.addBookRegistMessage);
    
    const [form, setForm] = useState({
        name : '',
        phone : '',
        email : '',
        company : '',
        department : '',
        jobName : '',
        groupCode : ''
    })

    useEffect(() => {

            if(addBookRegistResult.status === 200) {

                setAddBookModal(false);
                Swal.fire({
                    icon : "success",
                    title : "주소록 추가",
                    text : addBookRegistResult.message,
                    confirmButtonText: '확인'
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(true); 
                    } else {
                        window.location.reload(true); 
                    }
                })
            } else if (addBookRegistResult.state === 400){
                Swal.fire({
                    icon : "error",
                    title : "주소록 추가",
                    text : addBookRegistResult.message
                });
            } 
        }, // eslint-disable-next-line
    [addBookRegistResult]);


    const onClickModalOff = (e) => {

        if(e.target.className.includes("modalBackground")) {
            setAddBookModal(false);
        }
    }

    const onChangeHandler = (e) => {
        
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClickAddBookRegist = () => {

        if(form.groupCode.trim().length === 0) {

            Swal.fire({
                icon : 'warning',
                title : '주소록 추가',
                text : '그룹을 선택하세요.',
                confirmButtonText: '확인'
            })
            return;
        } 

        // TODO - null 체크, 정규식으로 입력값 체크
        dispatch(callAddBookRegistAPI({
            form : form
        }));
    }

    return (
        <div className={AddBookModalCSS.modalBackground} onClick={onClickModalOff}>
            <div className={AddBookModalCSS.modalContainer}>
                <div className={AddBookModalCSS.header}>
                    주소록 추가
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
                                        <option key={group.groupCode} value={group.groupCode}>팀 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    {
                                        Array.isArray(personalGroupList) && personalGroupList.map(group => (
                                        <option key={group.groupCode} value={group.groupCode}>개인 그룹 - {group.groupName}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={AddBookModalCSS.buttonDiv}>
                    <button onClick={() => setAddBookModal(false)}>나가기</button>
                    <button onClick={onClickAddBookRegist}>추가하기</button>
                </div>
            </div>
        </div>
    );
}

export default AddBookFormModal;