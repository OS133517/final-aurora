import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { useRef } from "react";
import { callSelectMailListByConditionsAPI,
            callUpdateImportantStatusAPI,
            callSelectNewMailListAPI,
            callUpdateDeleteStatusAPI,
            // 태그 
            callRegisterTagsAPI,
            callSelectTagsAPI,
            callRegisterBlackListAPI,
        } from "../../apis/MailAPICall";

import MailCSS from './Mail.module.css'
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import TagManagementModal from '../../components/mail/TagManagementModal';
import "react-datepicker/dist/react-datepicker.css";

function Inbox() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const [updateTagTrigger, setUpdateTagTrigger] = useState(false);
    const [selectedMails, setSelectedMails] = useState([]);
    const [mailUpdated, setMailUpdated] = useState(false); 
    const [allMailsSelected, setAllMailsSelected] = useState(false); // 전체 선택 
    const [isLoading, setIsLoading] = useState(false);
    // 검색 
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [importantStatus, setImportantStatus] = useState(false);
    const [searchTag, setSearchTag] = useState(null);
    const [searchInput, setSearchInput] = useState({ type: "", value: "" });
    // 태그 
    const [selectedTagFilter, setSelectedTagFilter] = useState(null);
    // const [tagName, setTagName] = useState('');
    // const [tagColor, setTagColor] = useState('');
    const [tags, setTags] = useState([]);
    const [showTagModal, setShowTagModal] = useState(false); // 태그 모달 
    // 필터
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);
    // 페이징 
    const [currentPage, setCurrentPage] = useState(1);

    const mailData = useSelector(state => state.mailReducer.mailData);
    // // console.log("mailList : " + JSON.stringify(mailList));
    const mailList = mailData?.data; 
    // // console.log("routineReportList : " + JSON.stringify(routineReportList));
    const pageInfo = mailData?.pageInfo;
    // // console.log("pageInfo : " + JSON.stringify(pageInfo));
    const tagList = useSelector(state => state.mailReducer.tagList);
    // console.log("tagList : " + JSON.stringify(tagList));

    const pageNumber = [];

    if(pageInfo) {

        for(let i = 1; i <= pageInfo.endPage; i++) {

            pageNumber.push(i);
        }
    }

    // 렌더링 
    useEffect(() => {
        
        const searchParams = {

            offset: 1,
            recipients: accessToken.memberEmail,
            deleteStatus: "N",
        };
        if (searchTag) {

            searchParams.tagCode = searchTag;
        }
        if (searchInput.type && searchInput.value) {

            searchParams[searchInput.type] = searchInput.value;
        }
        if (startDate) {
            
            searchParams.startDate = startDate;
        }
        if (endDate) {

            searchParams.endDate = endDate;
        }
        if (importantStatus) {

            searchParams.importantStatus = importantStatus;
        }
        console.log("searchParams : " + JSON.stringify(searchParams));

        dispatch(callSelectMailListByConditionsAPI(searchParams));
        dispatch(callSelectTagsAPI({}))

        setMailUpdated(false);
    }, [mailUpdated]);

    // 필터밖 클릭시 
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                filterRef.current &&
                !filterRef.current.contains(event.target) &&
                !event.target.closest(".filter-container")
            ) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 검색 입력 값 
    const onChangeHandler = (e) => {

        setSearchInput({ ...searchInput, [e.target.name]: e.target.value });
    };

    // 필터 토글 
    const handleFilterClick = () => {
        
        setFilterOpen(!filterOpen);
    };
  
    // 태그 선택 
    const handleTagFilterChange = (tagCode) => {

        setSelectedTagFilter(tagCode);
    };

    // 태그 업데이트 관리 함수 
    const handleTagUpdate = () => {

        setUpdateTagTrigger(!updateTagTrigger);
    };
  
    // 중요 상태 검색 
    const handleImportantStatusChange = (e) => {

        setImportantStatus(e.target.checked);
    };

    // 메일 새로고침 
    const updateMailList = async () => {

        setIsLoading(true);

        try {

            await dispatch(callSelectNewMailListAPI());
        } catch (error) {

            warningAlert("메일 목록 갱신 실패!")
        } finally {

            setIsLoading(false);
        }
        setMailUpdated(!mailUpdated);
    };

    // 읽음 상태 변경 
    // const handleToggleReadStatus = (mailCode) => {
    // };

    // 삭제 상태 수정 
    const deleteMail = () => {

        dispatch(callUpdateDeleteStatusAPI({

            mailCodeList: selectedMails.map((mail) => mail.mailCode),
            deleteStatus: 'Y',
        }));
        setMailUpdated(!mailUpdated);
    };

    // 중요 상태 수정 
    const updateImportantStatus = (mailCode, newStatus) => {

        dispatch(callUpdateImportantStatusAPI({

            mailCode : mailCode,
            importantStatus : newStatus
        }));
        setMailUpdated(!mailUpdated);
    };

    // 스팸차단 
    const registerBlackList = () => {

        dispatch(callRegisterBlackListAPI({

            emails : selectedMails.map((mail) => mail.senderEmail),
        }));
        setMailUpdated(!mailUpdated);
    }

    // 메일 선택 
    const handleMailSelection = (mail) => {

        setSelectedMails((prevSelectedMails) => {

            const newSelectedMails = prevSelectedMails.some((selectedMail) => selectedMail.mailCode === mail.mailCode)
                ? prevSelectedMails.filter((selectedMail) => selectedMail.mailCode !== mail.mailCode)
                : [...prevSelectedMails, mail];
        
            setAllMailsSelected(newSelectedMails.length === mailList.length);
            
            return newSelectedMails;
        });
    };

    // 전체 메일 선택/해제
    const handleAllMailsSelection = () => {

        if (allMailsSelected) {

            setSelectedMails([]);
        } else {

            setSelectedMails(mailList);
        }
        setAllMailsSelected(!allMailsSelected);
    };

    // 성공 알림 
    const successAlert = (message) => {

        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
        });
    };

    // 경고 실패 알림 
    const warningAlert = (message) => {

        Swal.fire({
            icon: 'warning',
            title: '경고',
            text: message,
            confirmButtonText: '확인',
        });
    };

    // 모달 관리 
    // const toggleTagModal = () => {

    //     setShowTagModal((prev) => !prev);
    // };
    const toggleTagModal = () => { // 집 모니터가 커서 생기는 문제일 수 있음 - 모달창 생성시 스크롤 내려가는 문제 

        if (!showTagModal) {

            document.body.style.overflow = "hidden";
        } else {

            document.body.style.overflow = "auto";
        }
        setShowTagModal((prev) => !prev);
    };

    return (
        <>
            <div className={MailCSS.container}>
                <div className={MailCSS.titleHeader}>
                    <span>받은 메일함 (안 읽은 갯수) / {pageInfo?.totalCount}</span>
                </div>
                <div className={MailCSS.searchBar}>
                    <select 
                        name="condition" 
                        onChange={onChangeHandler} 
                        value={searchInput.condition}
                    >
                        <option name="condition" value="mailTitle">메일 제목</option>
                        <option name="condition" value="mailBody">메일 내용</option>
                        <option name="condition" value="senderName">발신자 이름</option>
                        <option name="condition" value="senderEmail">발신자 이메일</option>
                    </select>
                    <input 
                        type="text" 
                        name="value" 
                        value={searchInput.value} 
                        onChange={onChangeHandler} 
                    />
                    <button 
                        type="button" 
                        onClick={() => setMailUpdated(true)} 
                    >
                        검&nbsp;&nbsp;&nbsp;&nbsp;색
                    </button>
                    <button onClick={() => handleFilterClick()}>
                        필터
                    </button>
                    {filterOpen && (
                        // <div className={MailCSS.filterSettings} ref={filterRef}>
                        <div className={`${MailCSS.filterSettings} filter-container`} ref={filterRef}>
                            <div className="tagFilterContainer">
                                {tagList?.map((tag) => (
                                    <div
                                        key={tag.tagCode}
                                        className={selectedTagFilter === tag.tagCode ? "tagFilterSelected" : "tagFilter"}
                                        onClick={() => handleTagFilterChange(tag.tagCode)}
                                    >
                                        {tag.tagName}
                                    </div>
                                ))}
                            </div>
                            {/* <DropdownButton 
                                id="dropdown-tag-selector" 
                                title="태그 선택"
                                className={MailCSS.dropdownTagSelector}
                            >
                                {tagList.map((tag) => (
                                    <Dropdown.Item key={tag.tagCode} onClick={() => setSearchTag(tag.tagCode)}>
                                        <img
                                            src={`/mail/tags/${tag.tagColor}.png`}
                                            alt={tag.tagColor}
                                            style={{ width: "16px", height: "16px", verticalAlign: "middle", marginRight: "4px" }}
                                        />
                                        {tag.tagName}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton> */}
                            <div style={{ whiteSpace: 'nowrap' }}>시작일</div>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="yyyy-MM-dd"
                            />
                            <div style={{ whiteSpace: 'nowrap' }}>종료일</div>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="yyyy-MM-dd"
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={importantStatus}
                                    onChange={handleImportantStatusChange}
                                />
                                중요 상태
                            </label>
                        </div>
                    )}
                </div>
                <div>
                    <table className={MailCSS.mailTable}>
                        <thead>
                            <tr>
                                {/* 메일리스트 헤더 */}
                                <th colSpan="7">
                                    <div className={MailCSS.header}>
                                        <input
                                            type="checkbox"
                                            checked={allMailsSelected}
                                            onChange={() => handleAllMailsSelection()}
                                        />
                                        {/* 읽음상태 토글 */}
                                        <span 
                                            style={{cursor: "not-allowed"}}
                                        >
                                            읽음
                                        </span>
                                        <span
                                            style={{cursor: 'pointer'}}
                                            onClick={() => deleteMail()}
                                        >
                                            삭제
                                        </span>
                                        <span
                                            style={{cursor: "pointer"}}
                                            onClick={() => registerBlackList()}
                                        >
                                            스팸차단
                                        </span>
                                        {/* 클릭시 태그 선택 또는 생성 div 출력 해당 span 기준으로 하위의 흰색배경 검은 테두리 적당히 작은 크기 */}
                                        {/* <span
                                            style={{cursor: 'pointer'}}
                                            onClick={() => toggleTagModal()}
                                        >
                                            태그관리
                                        </span> */}
                                        <span style={{cursor: 'pointer'}}>
                                            {/* <TagManagementModal onClose={() => toggleTagModal()} /> */}
                                            <TagManagementModal onUpdate={handleTagUpdate} />
                                        </span>
                                        <span 
                                            style={{cursor: 'pointer'}}
                                            onClick={() => updateMailList()}
                                        >
                                            새로고침
                                        </span>
                                        {isLoading && (
                                            <div className={MailCSS.loadingSpinner}>
                                                <img 
                                                    src="/mail/refresh.png" 
                                                    alt="로딩 스피너" 
                                                    style={{width:"128px"}}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 메일 리스트 컴포넌트  */}
                            {Array.isArray(mailList) && mailList.length > 0 ? (
                                mailList?.map(mail => (
                                    <tr key={mail.mailCode} className={MailCSS.mail}>
                                        <td className={MailCSS.narrow}>
                                            {/* 선택시 해당 메일코드 선택된 목록에 추가 */}
                                            <input 
                                                type="checkbox"
                                                checked={selectedMails.some((selectedMail) => selectedMail.mailCode === mail.mailCode)}
                                                onChange={() => handleMailSelection(mail)}
                                            />
                                        </td>
                                        <td className={MailCSS.narrow}>
                                            <img
                                                onClick={() => updateImportantStatus(mail.mailCode, mail.importantStatus === "Y" ? "N" : "Y")}
                                                style={{ width: "16px", cursor: "pointer" }}
                                                src={
                                                    mail.importantStatus === "Y"
                                                        ? "/mail/important.png"
                                                        : "/mail/notImportant.png"
                                                }
                                            />
                                        </td>
                                        <td className={MailCSS.narrow}>
                                            <img
                                                // 읽음 상태 토글 
                                                // onClick={}
                                                style={{ width: "16px", cursor: "not-allowed"}}
                                                src={
                                                mail.readStatus === "Y"?
                                                    "/mail/read.png" :
                                                    "/mail/unRead.png"
                                                }
                                            />
                                        </td>
                                        <td>
                                            <div className={MailCSS.textOverflow}>
                                                {mail.senderName}
                                            </div>
                                        </td>
                                        <td>
                                            <img 
                                                src="/mail/tags/red.png" 
                                                alt="태그" 
                                                style={{width:"16px"}}
                                            />
                                        </td>
                                        <td 
                                            className={MailCSS.wide}
                                            // 해당 메일상세 페이지로 이동, 객체가져가면 될듯 
                                            // onClick={}
                                        >
                                            <div className={MailCSS.textOverflow}>
                                                {mail.mailTitle}
                                            </div>
                                        </td>
                                        <td className={MailCSS.date}>
                                            {mail.shipDate}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className={MailCSS.centerText}>
                                                조회된 메일 목록이 없습니다.
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {/* 페이징 버튼 */}
                    <div className={MailCSS.pagingBtnDiv}>
                        {Array.isArray(mailList) && (
                            <>
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={MailCSS.pagingBtn}    
                                >
                                    &lt;
                                </button>
                                {pageNumber.map((num) => (
                                    <button
                                        key={num} 
                                        onClick={() => setCurrentPage(num)}
                                        style={currentPage === num ? { backgroundColor: "rgb(12, 250, 180)" } : null}
                                        className={MailCSS.pagingBtn}
                                    >
                                    {num}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === pageInfo?.endPage || pageInfo?.total === 0}
                                    className={MailCSS.pagingBtn}
                                >
                                    &gt;
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inbox;