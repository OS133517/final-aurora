import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressesCSS from "./Addresses.module.css";
import { callAllMemberAddressesAPI, 
            callGroupAddressAPI, 
            callAddBookDeleteAPI, 
            callMemberSearchAPI,
            callAddBookSearchAPI,
            callMemberToGroupsAPI } from "../../apis/AddBookAPICall";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddBookUpdateModal from "../../components/addBook/AddBookUpdateModal";

function Addresses({category = "전체 주소록"}) {

    const dispatch = useDispatch();
    const addBookDeleteResult = useSelector(state => state.addBookReducer.addBookDeleteMessage);
    const addBookUpdateResult = useSelector(state => state.addBookReducer.addBookUpdateMessage);
    const addBook = useSelector(state => state.addBookReducer.addresses);
    const addressList = addBook.data;
    const pageInfo = addBook.pageInfo;
    const {groupCode} = useParams();
    const personalGroupList = useSelector(state => state.addBookReducer.personalGroups);
    const teamGroupList = useSelector(state => state.addBookReducer.teamGroups);
    const memberToGroupResult = useSelector(state => state.addBookReducer.memberToGroupMessage);
    
    const [searchInput, setSearchInput]  = useState({
        condition : "name",
        value : ""
    });
    const [searchForm, setSearchForm] = useState({
        searchCondition : "",
        searchValue : ""
    });
    const [isSearching, setIsSearching] = useState(false);
    const [updateModalIsOn, setUpdateModalIsOn] = useState(false);
    const [updateList, setUpdateList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    // TODO - api 두번 쏘는거 수정해야됨

    // 페이지 번호 바뀔 때
    useEffect(() => {

        if(isSearching) {
            searchCall();
        } else {
            listChange();
        }
    // eslint-disable-next-line
    }, [currentPage])

    // 카테고리, 그룹코드 변할 때
    useEffect(() => {

        // 페이지 번호 1번으로 바꾸기
        setCurrentPage(1);
        // 검색 중 아님으로 바꾸기
        setIsSearching(false);
        // 검색창 초기화
        setSearchInput({
            condition : "name",
            value : ""
        });

        listChange();
    // eslint-disable-next-line
    }, [category, groupCode])

    // 주소록 삭제 시 
    useEffect(() => {
            
        if(addBookDeleteResult.status === 200) {
            Swal.fire({
                icon : "success",
                title : "주소록 삭제",
                text : addBookDeleteResult.message,
                confirmButtonText: '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        } else if(addBookDeleteResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "주소록 삭제",
                text : addBookDeleteResult.message
            })
        }
    // eslint-disable-next-line
    }, [addBookDeleteResult]);

    // 검색 시
    useEffect(() => {

        searchCall();
        setCurrentPage(1);
    // eslint-disable-next-line
    }, [searchForm])

    // 사원 -> 그룹 주소록으로 추가 결과
    useEffect(() => {

        if(memberToGroupResult.status === 200) {

            Swal.fire({
                icon : "success",
                title : "추가",
                text : memberToGroupResult.message,
                confirmButtonText: '확인'
            }).then(() => {
                    window.location.reload(true); 
            })
        } else if(memberToGroupResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "추가",
                text : memberToGroupResult.message,
                confirmButtonText: '확인'
            })
        }
    // eslint-disable-next-line
    }, [memberToGroupResult])

    useEffect(() => {

        if(memberToGroupResult.status === 200) {
            Swal.fire({
                icon : "success",
                title : "추가",
                text : memberToGroupResult.message,
                confirmButtonText: '확인'
            }).then(() => {
                    window.location.reload(true); 
            })
        } else if(memberToGroupResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "추가",
                text : memberToGroupResult.message,
                confirmButtonText: '확인'
            })
        }  
    }, [memberToGroupResult])

    useEffect(() => {

        if(addBookUpdateResult.status === 200) {
            Swal.fire({
                icon : "success",
                title : "수정",
                text : addBookUpdateResult.message,
                confirmButtonText: '확인'
            }).then(() => {
                    window.location.reload(true); 
            })
        } else if(addBookUpdateResult.status === 400) {
            Swal.fire({
                icon : "error",
                title : "수정",
                text : addBookUpdateResult.message,
                confirmButtonText: '확인'
            })
        }  
    }, [addBookUpdateResult])
    
    // 리스트 새로 불러와도 페이지번호가 유지가 되서 바꾸기 위해 함수를 밖에 둠
    const listChange = () => {

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
    }

    // 검색 요청 쏘기
    const searchCall = () => {

        if(category === '전체 주소록') {

            dispatch(callMemberSearchAPI({
                searchForm : searchForm,
                currentPage : currentPage
            }));
        } else if(category === '개인 주소록' || category === '공용 주소록') {

            dispatch(callAddBookSearchAPI({
                searchForm : searchForm,
                currentPage : currentPage,
                groupCode : groupCode
            }))
        }
    }

    // 검색 상자 state 관리용 함수
    const onChangeHandler = (e) => {

        setSearchInput({
            ...searchInput,
            [e.target.name] : e.target.value
        });
    }

    // 검색 버튼 함수
    const onClickSearch = () => {

        setIsSearching(true);

        setSearchForm({
            ...searchForm,
            searchCondition : searchInput.condition,
            searchValue : searchInput.value
        });
    }

    // 전체 체크 박스 관리용 함수
    const onClickAllCheck = (e) => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);

        if(e.target.id === 'all' && e.target.checked === false) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = false);
        } else if (e.target.id === 'all' && e.target.checked === true) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = true);
        } 
    }

    // 체크 박스 관리용 함수
    const onClickCheck = (e) => {

        if(e.target.type === 'checkbox') return;

        const ckBox = document.querySelector(`#checkBox${e.currentTarget.id}`)
        ckBox.checked = !ckBox.checked;
    }

    // 주소록 삭제 버튼 함수
    const onClickDelete = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const deleteList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));

        if(deleteList.length === 0) {

            Swal.fire({
                icon : 'warning',
                text : '선택된 주소록이 없습니다.'
            });

            return;
        }

        Swal.fire({
            icon : "warning",
            title : `${deleteList.length} 개의 주소록이 삭제됩니다.`,
            text : "정말 삭제하시겠습니까?",
            showCancelButton : true,
            cancelButtonText : '취소',
            confirmButtonText : '확인',
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

    // 사원 -> 그룹 주소록으로 추가
    const onClickMembersToGroups = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const insertList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));
        const groupList = personalGroupList.concat(teamGroupList);
        const map = groupList.reduce((acc, cur) => {
            
            acc[cur.groupCode] = cur.groupName;
            return acc;
        }, {});
        let temp;

        if(insertList.length === 0) {

            Swal.fire({

                icon : 'warning',
                text : '선택된 사원 주소록이 없습니다.'
            });

            return;
        }

        Swal.fire({

            icon : 'question',
            title : `${insertList.length} 개의 주소록이 추가됩니다.`,
            text : '추가할 그룹을 선택하세요.',
            showCancelButton : true,
            input : 'select',
            inputPlaceholder : '그룹 선택',
            inputOptions : map,
            inputValidator : (value) => {
                return !value && '그룹을 선택하세요.'
            },
            confirmButtonText: '확인', 
            cancelButtonText: '취소' 
        }).then((result) => {
            if(result.isConfirmed) {

                temp = result.value;
                dispatch(callMemberToGroupsAPI({
                    'groupCode' : temp,
                    memberCodes : insertList
                }))
            } else {
                
                Swal.fire('취소되었습니다.');
            }
        })
    }

    const onClickUpdateModalOn = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const checkedUpdateList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));
        setUpdateList(checkedUpdateList);
        console.log('updateList', updateList);
        if(checkedUpdateList.length === 0) {

            Swal.fire({
                icon : "warning",
                text : '선택된 주소록이 없습니다.',
                confirmButtonText : '확인'
            });

            return;
        }
        setUpdateModalIsOn(!updateModalIsOn);
    }

    return (
        <div className={AddressesCSS.addressesDiv}>
        {updateModalIsOn? <AddBookUpdateModal updateList={updateList} setUpdateModalIsOn={setUpdateModalIsOn}/> : null}
            <div className={AddressesCSS.addressesHeader}>
                {category}
            </div>
            <div className={AddressesCSS.addressesSearch}>
                <select name="condition" onChange={onChangeHandler} value={searchInput.condition}>
                    <option name="condition" value="name">이름</option>
                    {category !== '전체 주소록' && <option name="condition" value="department">부서</option>}
                    {category !== '전체 주소록' && <option name="condition" value="company">회사</option>}
                    <option name="condition" value="email">이메일</option>
                </select>
                <input type="text" name="value" value={searchInput.value} onChange={onChangeHandler}/>
                <button type="button" onClick={onClickSearch}>검&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                <div className={AddressesCSS.imgDiv}>
                    <img src={process.env.PUBLIC_URL + "/sendMail.png"} alt="메일 발송"/>
                    {category === "전체 주소록" && <img onClick={onClickMembersToGroups} src={process.env.PUBLIC_URL + "/insert.png"} alt="추가"/>}
                    {category !== "전체 주소록" && <img onClick={onClickUpdateModalOn} src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>}
                    {category !== "전체 주소록" && <img onClick={onClickDelete} src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>}
                </div>
            </div>
            <table className={AddressesCSS.contentTable}>
                <thead className={AddressesCSS.contentHead}>
                    <tr>
                        <th>
                            <input type="checkBox" id="all" onClick={onClickAllCheck}/>
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
                            직급
                        </th>
                        <th>
                            부서
                        </th>
                        <th>
                            {category !== '전체 주소록' && '회사'}
                            {category === '전체 주소록' && '소속팀'}
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
                                    {address.jobName}
                                </td>
                                <td>
                                    {address.department}
                                </td>
                                <td>
                                    {address.company}
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