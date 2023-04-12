import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { useRef } from "react";
import { callSelectMailListByConditionsAPI,
            callUpdateImportantStatusAPI,
            callSelectNewMailListAPI,
            callUpdateDeleteStatusAPI,
            callUpdateMailTagAPI,
            // 태그 
            callSelectTagsAPI,
        } from "../../apis/MailAPICall";

import MailCSS from './Mail.module.css'
import moment from 'moment';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import TagManagementModal from '../../components/mail/TagManagementModal';

function Sent() {

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
    const [searchInput, setSearchInput] = useState({ type: "mailTitle", value: "" });
    // 태그 
    const [selectedTagFilter, setSelectedTagFilter] = useState(null);
    const [showTagModal, setShowTagModal] = useState(false); // 태그 모달 
    const [showTagList, setShowTagList] = useState(false);
    const [selectedMailTag, setSelectedMailTag] = useState(null);
    const [selectedMailCode, setSelectedMailCode] = useState(null);
    const [tagListPosition, setTagListPosition] = useState({ x: 0, y: 0 });
    // 필터
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);
    // 페이징 
    const [currentPage, setCurrentPage] = useState(1);

    const mailData = useSelector(state => state.mailReducer.mailData);
    // console.log("mailList : " + JSON.stringify(mailList));
    const mailList = mailData?.data; 
    // console.log("routineReportList : " + JSON.stringify(routineReportList));
    const pageInfo = mailData?.pageInfo;
    // console.log("pageInfo : " + JSON.stringify(pageInfo));
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

            offset: currentPage,
            deleteStatus: "N",
            senderEmail: accessToken.memberEmail,
            [searchInput.type]: searchInput.value
        };
        if (searchTag) {

            searchParams.tagCode = searchTag;
        }
        if (searchInput.condition && searchInput.value) { 

            searchParams[searchInput.condition] = searchInput.value; 
        }
        if (startDate) {
            
            searchParams.startDate = moment(startDate).startOf("day").format("YYYY-MM-DD");
        }
        if (endDate) {

            searchParams.endDate = moment(endDate).endOf("day").format("YYYY-MM-DD");
        }
        if (importantStatus) {

            searchParams.importantStatus = importantStatus ? "Y" : "N"; 
        }
        if (!isDateRangeValid(startDate, endDate)) {

            warningAlert("유효하지 않은 날짜 범위입니다. 시작 날짜는 종료 날짜보다 이전이어야 합니다.");

            return;
        }
        console.log("searchParams : " + JSON.stringify(searchParams));

        dispatch(callSelectMailListByConditionsAPI(searchParams));
        dispatch(callSelectTagsAPI({}))

        setMailUpdated(false);
    }, [mailUpdated, currentPage]);

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

    // 태그 변경 밖 클릭시 
    useEffect(() => {

        if (showTagList) {

            document.addEventListener("click", handleCloseTagList);
        } else {

            document.removeEventListener("click", handleCloseTagList);
        }
        return () => {

            document.removeEventListener("click", handleCloseTagList);
        };
    }, [showTagList]);

    // 검색 입력 값 
    const onChangeHandler = (e) => {

        const { name, value } = e.target;
    
        if (name === "condition") {

            setSearchInput((prev) => ({
                ...prev,
                type: value,
            }));
        } else {

            setSearchInput((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // 필터 토글 
    const handleFilterClick = () => {
        
        setFilterOpen(!filterOpen);
    };
  
    // 필터 태그 선택 
    const handleTagFilterChange = (tagCode) => {

        const isTagSelected = selectedTagFilter === tagCode;
        
        if (isTagSelected) {

            setSearchTag(null);
            setSelectedTagFilter(null);
        } else {
            
            setSearchTag(tagCode);
            setSelectedTagFilter(tagCode);
        }
    };

    // 검색 실행
    const onSearchButtonClick = () => {

        setMailUpdated(true); 
    };

    // 태그 업데이트 관리 함수 
    const handleTagUpdate = () => {

        setUpdateTagTrigger(!updateTagTrigger);
    };
    // 모달 관리 함수 
    const toggleTagModal = () => { // 집 모니터가 커서 생기는 문제일 수 있음 - 모달창 생성시 스크롤 내려가는 문제 

        if (!showTagModal) {

            document.body.style.overflow = "hidden";
        } else {

            document.body.style.overflow = "auto";
        }
        setShowTagModal((prev) => !prev);
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

    // 삭제 상태 수정 
    const deleteMail = async () => {

        if (selectedMails.length === 0) {

            warningAlert("선택된 메일이 없습니다.");

            return;
        }
        const result = await Swal.fire({

            title: '메일을 삭제하시겠습니까?',
            text: '삭제된 메일은 휴지통으로 옮겨집니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (result.isConfirmed) {

            dispatch(callUpdateDeleteStatusAPI({

                mailCodeList: selectedMails.map((mail) => mail.mailCode),
                deleteStatus: 'Y',
            }));
            setMailUpdated(!mailUpdated);
            successAlert("메일 삭제 완료");
        }
    };

    // 중요 상태 수정 
    const updateImportantStatus = (mailCode, newStatus) => {

        dispatch(callUpdateImportantStatusAPI({

            mailCode : mailCode,
            importantStatus : newStatus
        }));
        setMailUpdated(!mailUpdated);
    };

    // 태그 변경 토글 - 각 메일 
    const handleTagButtonClick = (mailCode, e) => {

        setShowTagList(false);
        e.stopPropagation();
        setSelectedMailCode(mailCode);
        setShowTagList(true);
        setTagListPosition({ x: e.clientX, y: e.clientY }); // 위치 계산
    };

    // 태그 변경 div 핸들러 - div 밖 클릭시 닫기 
    const handleCloseTagList = (e) => {

        e.stopPropagation();
        setShowTagList(false);
    };
    
    // 태그 변경 
    const handleTagChange = (tagCode) => {

        dispatch(callUpdateMailTagAPI({

            mailCode : selectedMailCode,
            tagCode : tagCode
        }))
        setShowTagList(false);
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

    // 날짜 선택 검증 
    const isDateRangeValid = (startDate, endDate) => {

        if (!startDate || !endDate) {

            return true;
        }
        return endDate >= startDate;
    };

    return (
        <>
            <div className={MailCSS.container}>
                <div className={MailCSS.titleHeader}>
                    <span>보낸 메일함</span>
                </div>
                {/* 검색바 */}
                <div className={MailCSS.searchBar}>
                    <select
                        name="condition"
                        onChange={onChangeHandler}
                        value={searchInput.condition}
                    >
                        <option name="condition" value="mailTitle">메일 제목</option>
                        <option name="condition" value="mailBody">메일 내용</option>
                        <option name="condition" value="recipient">수신자 이메일</option>
                    </select>
                    <input
                        type="text"
                        id="searchBar"
                        value={searchInput.value}
                        name="value" 
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="검색어를 입력하세요"
                        onChange={onChangeHandler}
                    />
                    <button 
                        type="button" 
                        onClick={onSearchButtonClick}
                    >
                        검색
                    </button>
                    <button onClick={() => handleFilterClick()}>
                        필터
                    </button>
                    {filterOpen && (
                        <div className={`${MailCSS.filterSettings} ${MailCSS.filterContainer}`} ref={filterRef}>
                            <div className={MailCSS.tagFilterContainer}>
                                태그 목록
                                <div className={MailCSS.tagFilterScrollContainer}>
                                    {tagList?.map((tag) => (
                                        <div
                                            key={tag.tagCode}
                                            className={selectedTagFilter === tag.tagCode ? MailCSS.tagFilterSelected : MailCSS.tagFilter}
                                            onClick={() => handleTagFilterChange(tag.tagCode)}
                                            style={{cursor:"pointer"}}
                                        >
                                            <img
                                                src={`/mail/tags/${tag.tagColor}.png`}
                                                alt={`${tag.tagColor} ribbon`}
                                                style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    marginRight: "4px",
                                                }}
                                            />
                                            {tag.tagName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr></hr>
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
                            <hr></hr>
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
                    {/* 메일 리스트 */}
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
                                        <span
                                            style={{cursor: 'pointer'}}
                                            onClick={() => deleteMail()}
                                        >
                                            삭제
                                        </span>
                                        <span style={{cursor: 'pointer'}}>
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
                            {/* 메일 항목 */}
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
                                        <td>
                                            <div className={MailCSS.textOverflow}>
                                                {mail.senderName}
                                            </div>
                                        </td>
                                        <td>
                                            <img
                                                src={`/mail/tags/${mail?.tagDTO?.tagColor || "null"}.png`}
                                                alt="태그"
                                                style={{ width: "16px", cursor: "pointer" }}
                                                onClick={(e) => {
                                                    handleTagButtonClick(mail.mailCode, e)
                                                }}
                                            />
                                        </td>
                                        <td 
                                            className={MailCSS.wide}
                                            style={{cursor:"pointer"}}
                                            onClick={() => navigate(`/aurora/mails/detail/${mail.mailCode}`, { state: { mailCode: mail.mailCode } })}
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
                            {/* 태그 변경 */}
                            {showTagList && (
                                <div 
                                    className={MailCSS.tagFilterListContainer}
                                    style={{
                                        position: "absolute",
                                        top: tagListPosition.y, // 위치 조정
                                        left: tagListPosition.x, // 위치 조정
                                    }}
                                >
                                    태그 목록
                                    <div className={MailCSS.tagFilterScrollContainer}>
                                        {tagList?.map((tag) => (
                                            <div
                                                key={tag.tagCode}
                                                className={selectedMailTag?.tagCode === tag.tagCode
                                                    ? MailCSS.tagFilterSelected 
                                                    : MailCSS.tagFilter}
                                                onClick={() => handleTagChange(tag.tagCode)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    src={`/mail/tags/${tag.tagColor}.png`}
                                                    alt={`${tag.tagColor} ribbon`}
                                                    style={{
                                                    width: "16px",
                                                    height: "16px",
                                                    marginRight: "4px",
                                                    }}
                                                />
                                                {tag.tagName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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

export default Sent;