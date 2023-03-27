import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressesCSS from "./Addresses.module.css";
import { callAllMemberAddressesAPI, callGroupAddressAPI, callAddBookDeleteAPI } from "../../apis/AddBookAPICall";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Addresses({category = "전체 주소록"}) {

    const dispatch = useDispatch();
    const addBook = useSelector(state => state.addBookReducer.addresses);
    const addressList = addBook.data;
    const pageInfo = addBook.pageInfo;
    const {groupCode} = useParams();
    const addBookDeleteResult = useSelector(state => state.addBookReducer.addBookDeleteMessage);
    console.log('addBookDeleteResult', addBookDeleteResult);

    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {

            // 체크한게 다른 리스트를 불러와도 유지되서 초기화하는 코드
            const checkBoxes = document.querySelectorAll("input[type=checkBox]");
            for(let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }

            switch(category) {
                case "전체 주소록" : 
                    dispatch(callAllMemberAddressesAPI({
                        currentPage : currentPage
                    }));
                    break;
                case "개인 주소록" :
                case "공용 주소록" :
                    dispatch(callGroupAddressAPI({
                        currentPage : currentPage,
                        groupCode : groupCode
                    }));
                    break;
                default :
                    dispatch(callAllMemberAddressesAPI({
                        currentPage : currentPage
                    }));
                    break;
            }
        }// eslint-disable-next-line
        , [currentPage, category, groupCode]
    )

    useEffect(
        () => {
            
            if(addBookDeleteResult.status === 200) {
                Swal.fire({
                    icon : "success",
                    title : "주소록 삭제",
                    text : addBookDeleteResult.message
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(true); 
                    } else {
                        window.location.reload(true); 
                    }
                })
            } else if(addBookDeleteResult.status === 400) {
                Swal.fire({
                    icon : "error",
                    title : "주소록 삭제",
                    text : addBookDeleteResult.message
                })
        }// eslint-disable-next-line
    }, [addBookDeleteResult]);

    // 검색 상자 state 관리용 함수
    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    // 체크 박스 관리용 함수
    const onClickCheck = (e) => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);

        if(e.target.id === 'all' && e.target.checked === false) {
            // eslint-disable-next-line
            [...checkList].map(check => {
                document.querySelector(`checkBox${check.id}`).checked = true;
            });
        } else if (e.target.id === 'all' && e.target.checked === true) {

            [...checkList].stream(check => {
                document.querySelector(`checkBox${check.id}`).checked = false;
            });
        } else {
            const ckBox = document.querySelector(`#checkBox${e.currentTarget.id}`)
            ckBox.checked = !ckBox.checked;
        }
    }

    // 주소록 삭제 버튼 함수
    const onClickDelete = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const deleteList = [...checkList].filter(check => check.checked === true).map(item => item.id.replace("checkBox", ""));

        Swal.fire({
            icon : "warning",
            title : `${deleteList.length} 개의 주소록이 삭제됩니다.`,
            text : "정말 삭제하시겠습니까?",
            showCancelButton : true
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(callAddBookDeleteAPI({
                    addBookNos : deleteList
                }));
            } else {
                Swal.fire('취소되었습니다.');
            }
        })
    }

    return (
        <div className={AddressesCSS.addressesDiv}>
            <div className={AddressesCSS.addressesHeader}>
                {category}
            </div>
            <div className={AddressesCSS.addressesSearch}>
                <select>
                    <option value="name">이름</option>
                    <option value="name">부서</option>
                    <option value="name">회사</option>
                    <option value="name">이메일</option>
                </select>
                <input type="text" name="searchValue" value={searchValue} onChange={onChangeHandler}/>
                <button type="button">검&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                <div className={AddressesCSS.imgDiv}>
                    <img src={process.env.PUBLIC_URL + "/sendMail.png"} alt="메일 발송"/>
                    {category === "전체 주소록" && <img src={process.env.PUBLIC_URL + "/insert.png"} alt="추가"/>}
                    {category !== "전체 주소록" && <img src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>}
                    {category !== "전체 주소록" && <img onClick={onClickDelete} src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>}
                </div>
            </div>
            <table className={AddressesCSS.contentTable}>
                <thead className={AddressesCSS.contentHead}>
                    <tr>
                        <th>
                            <input type="checkBox" id="all" onClick={onClickCheck}/>
                        </th>
                        <th>
                            이름
                        </th>
                        <th>
                            휴대폰
                        </th>
                        <th>
                            이메일
                        </th>
                        <th>
                            회사
                        </th>
                        <th>
                            부서
                        </th>
                        <th>
                            회사 전화
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(addressList) && addressList.map((address) => (
                            <tr key={address.addBookNo} id={address.addBookNo} onClick={onClickCheck}>
                                <td>
                                    <input type="checkBox" id={`checkBox${address.addBookNo}`}/>
                                </td>
                                <td>
                                    {address.name}
                                </td>
                                <td>
                                    {address.phone}
                                </td>
                                <td>
                                    {address.email}
                                </td>
                                <td>
                                    {address.company}
                                </td>
                                <td>
                                    {address.department}
                                </td>
                                <td>
                                    {address.comPhone}
                                </td>
                            </tr>
                        ))
                    }
                    {
                        Array.isArray(addressList) && addressList.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{textAlign:"center"}}>
                                    검색 결과가 없습니다.
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            <div className={ AddressesCSS.pagingBtnDiv }>
                { Array.isArray(addressList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ AddressesCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ AddressesCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(addressList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                    className={ AddressesCSS.pagingBtn }
                >
                    &gt;
                </button>
                }
            </div>
        </div>
    );
}

export default Addresses;