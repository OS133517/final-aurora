import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressesCSS from "./Addresses.module.css";
import { callAllMemberAddressesAPI, callGroupAddressAPI } from "../apis/AddBookAPICall";
import { useParams } from "react-router-dom";

function Addresses({category = "전사원 주소록"}) {

    const dispatch = useDispatch();
    const addBook = useSelector(state => state.addBookReducer.addresses);
    const addressList = addBook.data;
    const pageInfo = addBook.pageInfo;
    const {groupCode} = useParams();

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
            switch(category) {
                case "전사원 주소록" : 
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
        } // eslint-disable-next-line
        , [currentPage, category, groupCode]
    )

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
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
                <div>
                    <img src={process.env.PUBLIC_URL + "/sendMail.png"} alt="메일 발송"/>
                    <img src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>
                </div>
            </div>
            <table className={AddressesCSS.contentTable}>
                <thead className={AddressesCSS.contentHead}>
                    <tr>
                        <th>
                            <input type="checkBox" name=""/>
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
                        Array.isArray(addressList) && addressList.map((address, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkBox" name=""/>
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