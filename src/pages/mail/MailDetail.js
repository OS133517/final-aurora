import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { callSelectMailDetailAPI,
            callUpdateDeleteStatusAPI,
            callSelectTagsAPI,
            callRegisterBlackListAPI,
            callUpdateImportantStatusAPI,
            callUpdateMailTagAPI,
        } from "../../apis/MailAPICall";
import { decodeJwt } from "../../utils/tokenUtils";

import MailDetailCSS from './MailDetail.module.css'
import moment from 'moment';
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import TagManagementModal from '../../components/mail/TagManagementModal';

function MailDetail() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { mailCode: urlMailCode } = useParams();

    // 메일 
    const [mailCode, setMailCode] = useState(location?.state?.mailCode || urlMailCode);
    const [mailUpdated, setMailUpdated] = useState(false); // 리렌더링 
    // 태그 
    const [updateTagTrigger, setUpdateTagTrigger] = useState(false);
    const [showTagList, setShowTagList] = useState(false); // 태그 이미지 클릭시 변경가능한 태그 목록 
    const [selectedMailCode, setSelectedMailCode] = useState(null);
    const [tagListPosition, setTagListPosition] = useState({ x: 0, y: 0 });
    // const [showColorPicker, setShowColorPicker] = useState({ tagCode: "", visible: false });
    // const [filterOpen, setFilterOpen] = useState(false);

    const mailDetail = useSelector(state => state.mailReducer.mailDetail);
    const tagList = useSelector(state => state.mailReducer.tagList);
    const [importantStatus, setImportantStatus] = useState(mailDetail?.importantStatus); // 중요 상태

    const tagSelectRef = useRef(null);

    // 렌더링 
    useEffect(() => {

        dispatch(callSelectMailDetailAPI({mailCode}));
        dispatch(callSelectTagsAPI({}))

        setMailUpdated(false);
    }, [mailUpdated]);
    
    // 태그 변경 div 밖 클릭시 
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (

                tagSelectRef.current &&
                !tagSelectRef.current.contains(event.target) &&
                !event.target.closest(".filter-container")
            ) {

                setShowTagList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {

            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 삭제 상태 수정 
    const deleteMail = async () => {

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

                mailCodeList: [mailCode],
                deleteStatus: 'Y',
            }));
            navigate('/aurora/mails');
            successAlert("메일을 삭제 완료");
        }
    };

    // 스팸차단 
    const registerBlackList = async () => {

        const result = await Swal.fire({

            title: '스팸 목록에 등록하시겠습니까?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (result.isConfirmed) {
            
            dispatch(callRegisterBlackListAPI({

                emails : [mailDetail?.senderEmail],
            }));
            setMailUpdated(!mailUpdated);
            successAlert("스팸목록에 등록 완료");
        }
    }

    // 중요 상태 수정 
    const updateImportantStatus = (newStatus) => {

        dispatch(callUpdateImportantStatusAPI({

            mailCode : mailCode,
            importantStatus : newStatus
        }));
        setMailUpdated(!mailUpdated);
    };

    // 태그 업데이트 관리 함수 
    const handleTagUpdate = () => {

        setUpdateTagTrigger(!updateTagTrigger);
    };

    // 태그 변경 토글
    const handleTagButtonClick = (mailCode, e) => {

        e.stopPropagation();
        setSelectedMailCode(mailCode);
        setShowTagList(true);
        setTagListPosition({ x: e.clientX, y: e.clientY }); // 위치 계산
    };
    
    // 태그 변경 div 핸들러
    const handleCloseTagList = (e) => {

        e.stopPropagation();
        setShowTagList(false);
    };
    
    // 태그 변경
    const handleTagChange = (tagCode) => {

        dispatch(callUpdateMailTagAPI({

            mailCode: mailDetail.mailCode,
            tagCode: tagCode,
        }));
        setShowTagList(false);
        setMailUpdated(!mailUpdated);
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

    // 파일 다운로드
    const downloadFile = async (fileName, fileOriginName, filePath) => {

        const fullFilePath = `http://${process.env.REACT_APP_RESTAPI_IP}:8090${filePath}`; 

        try {
            const response = await fetch(fullFilePath);
            const blob = await response.blob();

            const fileExtension = fileOriginName.split('.').pop().toLowerCase();

            let mimeType = '';

            switch (fileExtension) {

                case 'png':
                    mimeType = 'image/png';
                    break;
                case 'jpg':
                case 'jpeg':
                    mimeType = 'image/jpeg';
                    break;
                case 'gif':
                    mimeType = 'image/gif';
                    break;
                default:
                    mimeType = 'application/octet-stream';
            }
            const file = new File([blob], fileOriginName, { type: mimeType });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = fileOriginName;
            link.click();
            link.remove();
        } catch (error) {
            
            console.error("파일 다운로드 실패!", error);
        }
    };

    return (
        <>
            <div className={MailDetailCSS.container}>
                <div className={MailDetailCSS.titleHeader}>
                    <span
                        onClick={() => navigate(-1)}
                        style={{cursor:"pointer"}}
                    >
                        &#60;
                    </span>
                    <span> 메일 상세조회</span>
                </div>
                <div className={MailDetailCSS.menuHeader}>
                    <span>
                        답장
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
                    <span style={{cursor: 'pointer'}}>
                        <TagManagementModal onUpdate={handleTagUpdate} />
                    </span>
                </div>
                <div className={MailDetailCSS.mailHeader}>
                    <div className={MailDetailCSS.mailTitle}>
                        {mailDetail?.importantStatus == 'Y'
                            ? <img 
                                src={"/mail/important.png"}
                                style={{width:"32px", cursor:"pointer", marginRight: "16px"}}
                                onClick={() => {
                                    updateImportantStatus('N');
                                    setImportantStatus('N');
                                }}
                            />
                            : <img 
                                src={"/mail/notImportant.png"}
                                style={{width:"32px", cursor:"pointer", marginRight: "16px"}}
                                onClick={() => {
                                    updateImportantStatus('Y');
                                    setImportantStatus('Y');
                                }}
                            />
                        }
                        <img
                            src={`/mail/tags/${mailDetail?.tagDTO?.tagColor || "null"}.png`}
                            alt="태그"
                            style={{ width: "32px", cursor: "pointer", marginRight: "16px" }}
                            onClick={(e) => {
                                handleTagButtonClick(mailDetail?.tagDTO?.tagCode, e)
                            }}
                        />
                        {showTagList && (
                            <div
                                ref={tagSelectRef}
                                className={MailDetailCSS.tagFilterListContainer}
                                style={{
                                    position: "absolute",
                                    top: tagListPosition.y, // 위치 조정
                                    left: tagListPosition.x, // 위치 조정
                                }}
                            >
                                태그 목록
                                <div className={MailDetailCSS.tagFilterScrollContainer}>
                                    {tagList?.map((tag) => (
                                        <div
                                            key={tag.tagCode}
                                            className={
                                                mailDetail?.tagDTO?.tagCode === tag.tagCode
                                                    ? MailDetailCSS.tagFilterSelected
                                                    : MailDetailCSS.tagFilter
                                            }
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
                        <span className={MailDetailCSS.mailTitleContent}>
                            {mailDetail.mailTitle}
                        </span>
                    </div>
                    <div className={MailDetailCSS.mailInfo}>
                        보낸 사람 : {mailDetail?.memberDTO
                            ? `${mailDetail.memberDTO.deptName} ${mailDetail.memberDTO.memberName} ${mailDetail.memberDTO.jobName}`
                            : mailDetail.senderName}
                    </div>
                    <div className={MailDetailCSS.mailInfo}>
                        이메일 : {mailDetail?.senderEmail}
                    </div>
                    <div className={MailDetailCSS.mailInfo}>
                        수신일 : {mailDetail?.shipDate}
                    </div>
                </div>
                <hr></hr>
                {mailDetail.fileList && mailDetail.fileList.length > 0 && (
                    <>
                        {/* <div>
                            파일 목록 디브
                        </div>
                        <hr></hr> */}
                        <div 
                            className={MailDetailCSS.detailReportContainer}
                            key={mailDetail.mailCode}
                        >
                            {/* 첨부파일 목록 */}
                            <div className={MailDetailCSS.detailReportHeader}>
                                {/* 첨부 파일 */}
                            </div>
                            <div>
                                {mailDetail.fileList && mailDetail.fileList.length === 0 ? 
                                    <ul>
                                        <li>첨부된 파일이 없습니다.</li> 
                                    </ul> : 
                                    <ul>
                                        {mailDetail.fileList?.map((file, index) => (
                                            <li key={index}>
                                                <span onClick={() => downloadFile(file.fileName, file.fileOriginName, file.filePath)}>
                                                    <img 
                                                        src={'/mail/file.png'}
                                                        className={MailDetailCSS.fileImg}
                                                        style={{width: "16px"}}
                                                    />
                                                    &nbsp;
                                                    {file.fileOriginName} ({file.fileSize})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                        <hr></hr>
                    </>
                )}
                <div className={MailDetailCSS.mailBody}>
                    {mailDetail.mailBody}
                </div>
            </div>
        </>
    )
}

export default MailDetail;