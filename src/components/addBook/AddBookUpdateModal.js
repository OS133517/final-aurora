import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddBookModalCSS from "./AddBookFormModal.module.css";
import Swal from "sweetalert2";
import { callAddBookForUpdateAPI, callAddBookUpdateAPI } from "../../apis/AddBookAPICall";

function AddBookUpdateModal({updateList, setUpdateModalIsOn}) {

    const dispatch = useDispatch();
    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    const addressDetail = useSelector(state => state.addBookReducer.address);

    useEffect(() => {

        dispatch(callAddBookForUpdateAPI({
            addBookNo : updateList[0]
        }))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if(updateList.length === 1) {
            setForm({
                ...form,
                name : addressDetail.name,
                phone : addressDetail.phone,
                company : addressDetail.company,
                department : addressDetail.department,
                jobName : addressDetail.jobName,
                groupCode : addressDetail.groupCode,
                email : addressDetail.email
            });
        } else {
            setForm({
                ...form,
                company : addressDetail.company,
                department : addressDetail.department,
                groupCode : addressDetail.groupCode
            })
        }
    // eslint-disable-next-line
    }, [addressDetail]);
    
    const [form, setForm] = useState({
        name : '',
        phone : '',
        email : '',
        company : '',
        department : '',
        jobName : '',
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

    const onClickAddBookUpdate = () => {

        Swal.fire({

            icon : "warning",
            title : "주소록 수정",
            text : `${updateList.length} 개의 주소록이 수정됩니다.`,
            showCancelButton : true,
            cancelButtonText : "취소",
            confirmButtonText : "확인",
        }).then(result => {

            if(result.isConfirmed) {

                dispatch(callAddBookUpdateAPI({
                    addBookNos : updateList,
                    form : form
                }));
                
                setUpdateModalIsOn(false);
            } else {

                Swal.fire('취소되었습니다.');
                return;
            }
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
                                        value={updateList.length === 1? form.name||'' : '다중 선택시 변경 불가'}
                                        style={updateList.length === 1? null : {backgroundColor : "#C1C1C1", border : "none"}}
                                        disabled={updateList.length === 1? false : true}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="phone">휴대 전화</label></td>
                                <td><input 
                                        type="text" 
                                        name="phone" 
                                        id="phone" 
                                        value={updateList.length === 1? form.phone||'' : '다중 선택시 변경 불가'}
                                        style={updateList.length === 1? null : {backgroundColor : "#C1C1C1", border : "none"}}
                                        disabled={updateList.length === 1? false : true}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">이메일</label></td>
                                <td><input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        value={updateList.length === 1? form.email||'' : '다중 선택시 변경 불가'}
                                        style={updateList.length === 1? null : {backgroundColor : "#C1C1C1", border : "none"}}
                                        disabled={updateList.length === 1? false : true}
                                        onChange={onChangeHandler}/></td>
                                </tr>
                            <tr>
                                <td><label htmlFor="company">회사</label></td>
                                <td><input 
                                        type="text" 
                                        name="company" 
                                        id="company" 
                                        value={form.company || ''}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="department">부서</label></td>
                                <td><input 
                                        type="text" 
                                        name="department" 
                                        id="department"
                                        value={form.department || ''}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="jobName">직급</label></td>
                                <td><input 
                                        type="text" 
                                        name="jobName" 
                                        id="jobName" 
                                        value={updateList.length === 1? form.jobName||'' : '다중 선택시 변경 불가'}
                                        style={updateList.length === 1? null : {backgroundColor : "#C1C1C1", border : "none"}}
                                        disabled={updateList.length === 1? false : true}
                                        onChange={onChangeHandler}/></td>
                            </tr>
                            <tr>
                                <td>그룹</td>
                                <td>
                                    <select name="groupCode" onChange={onChangeHandler} value={form.groupCode||''}>
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
                    <button onClick={() => setUpdateModalIsOn(false)}>나가기</button>
                    <button onClick={onClickAddBookUpdate}>수정하기</button>
                </div>
            </div>
        </div>
    );
}

export default AddBookUpdateModal;