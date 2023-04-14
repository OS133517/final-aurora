import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from "../../utils/tokenUtils";
import { callSelectMailListByConditionsAPI,
            callUpdateImportantStatusAPI,
            callSelectNewMailListAPI,
            callUpdateMailTagAPI,
            callSelectTagsAPI,
        } from "../../apis/MailAPICall";

import MailMainCSS from './MailMain.module.css'
import Swal from "sweetalert2";

function MailMain() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = decodeJwt(window.localStorage.getItem("accessToken"));

    const [mailUpdated, setMailUpdated] = useState(false); // 메일 리렌더링 
    const [isLoading, setIsLoading] = useState(false); // 새로고침중 
    const [selectedMailTag, setSelectedMailTag] = useState(null); // 태그 변경 - 선택된 태그 
    const [showTagList, setShowTagList] = useState(false); // 태그 변경 
    const [selectedMailCode, setSelectedMailCode] = useState(null); // 태그 변경할 메일 코드 
    const [tagListPosition, setTagListPosition] = useState({ x: 0, y: 0 }); // 태그 변경 div 좌표 설정 

    const mailData = useSelector(state => state.mailReducer.mailData);
    const mailList = mailData?.data; 
    const tagList = useSelector(state => state.mailReducer.tagList);

    // 렌더링 
    useEffect(() => {

        const searchParams = {

            offset: 1,
            recipients: accessToken.memberEmail,
            deleteStatus: "N",
            // [searchInput.type]: searchInput.value
        };
        dispatch(callSelectMailListByConditionsAPI(searchParams));
        dispatch(callSelectTagsAPI({}))

        setMailUpdated(false);
    }, [mailUpdated]);

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

        e.stopPropagation();
        setSelectedMailCode(mailCode);
        setShowTagList(!showTagList);
        // 위치 확인후 태그 변경 DIV 출력 
        const buttonPosition = e.currentTarget.getBoundingClientRect();
        setTagListPosition({ x: buttonPosition.right, y: buttonPosition.top + window.scrollY }); 
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
    // 태그 클릭 위치 
    const getElementPosition = (element) => {

        const rect = element.getBoundingClientRect();

        return {

            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY
        };
    };
    // 클릭시 위치 조정 
    const handleTagClick = (event, tag) => {

        const position = getElementPosition(event.currentTarget);

        setTagListPosition({ x: position.x, y: position.y + event.currentTarget.offsetHeight });
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

    return (
        <div className={MailMainCSS.boxWrapper2}>
            <div className={MailMainCSS.Box2}>
                <div className={MailMainCSS.header}>
                    <div onClick={() => navigate("/aurora/mails")} style={{ cursor: "pointer" }}>
                        메일
                    </div>
                    <div style={{marginTop: "3px"}}>
                        <img 
                            src="/mail/refresh.png" 
                            alt="새로 고침" 
                            style={{width:"32px", height:"32px", cursor: "pointer"}}
                            onClick={() => updateMailList()}
                        />
                        {isLoading && (
                            <div className={MailMainCSS.loadingSpinner}>
                                <img 
                                    src="/mail/refresh.png" 
                                    alt="로딩 스피너" 
                                    style={{width:"128px"}}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={MailMainCSS.mailBox}>
                    <table className={MailMainCSS.mailTable}>
                        <tbody>
                            {/* 메일 항목 */}
                            {Array.isArray(mailList) && mailList.length > 0 ? (
                                mailList?.map(mail => (
                                    <tr key={mail.mailCode} className={MailMainCSS.mail}>
                                        <td className={MailMainCSS.narrow}>
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
                                        <td className={MailMainCSS.narrow}>
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
                                        <td
                                            style={{cursor:"pointer"}}
                                            onClick={() => navigate(`/aurora/mails/detail/${mail.mailCode}`, { state: { mailCode: mail.mailCode } })}
                                        >
                                            <div className={MailMainCSS.textOverflow}>
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
                                            className={MailMainCSS.wide}
                                            style={{cursor:"pointer"}}
                                            onClick={() => navigate(`/aurora/mails/detail/${mail.mailCode}`, { state: { mailCode: mail.mailCode } })}
                                        >
                                            <div className={MailMainCSS.textOverflow}>
                                                {mail.mailTitle} {mail.hasAttachments && <img src={"/mail/file.png"} style={{width: "16px"}}/>}
                                            </div>
                                        </td>
                                        <td 
                                            className={MailMainCSS.date}
                                            style={{cursor:"pointer"}}
                                            onClick={() => navigate(`/aurora/mails/detail/${mail.mailCode}`, { state: { mailCode: mail.mailCode } })}
                                        >
                                            {mail.shipDate}
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className={MailMainCSS.centerText}>
                                                조회된 메일 목록이 없습니다.
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            {/* 태그 변경 */}
                            {showTagList && (
                                <div 
                                    className={MailMainCSS.tagFilterListContainer}
                                    style={{
                                        position: "absolute",
                                        top: tagListPosition.y, // 위치 조정
                                        left: tagListPosition.x, // 위치 조정
                                    }}
                                >
                                    {tagList && tagList.length > 0 ? (
                                        <>
                                            태그 목록
                                            <div className={MailMainCSS.tagFilterScrollContainer}>
                                                {tagList?.map((tag) => (
                                                    <div
                                                        key={tag.tagCode}
                                                        className={selectedMailTag?.tagCode === tag.tagCode
                                                            ? MailMainCSS.tagFilterSelected 
                                                            : MailMainCSS.tagFilter}
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
                                        </>
                                    ) : (
                                        <div className={MailMainCSS.noTagsMessage}>
                                            태그가 없습니다.
                                        </div>
                                    )}
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default MailMain;