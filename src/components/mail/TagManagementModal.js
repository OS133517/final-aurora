import { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { callRegisterTagsAPI,
            callSelectTagsAPI,
            callUpdateTagsAPI,
            callDeleteTagsAPI
        } from "../../apis/MailAPICall";

import TagManagementModalCSS from "./TagManagementModal.module.css";
import Swal from "sweetalert2";

function TagManagerModal(props) {

    // const { onUpdate } = props;
    const { onUpdate, toggleTagModal } = props;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [tagUpdated, setTagUpdated] = useState(false); 
    const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 문제 
    // 태그 등록
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('');
    // 태그 수정 
    // const [input, setInput] = useState({ tagCode: "", value: "" }); // 태그 목록중 태그 각 입력칸의 값 
    // const [inputColor, setInputColor] = useState({ tagCode: "", value: "" }); // 태그 목록중 태그의 아이콘 클릭시 나타난 목록중 클릭된 값 
    const [input, setInput] = useState({ tagCode: "", value: "", color: "" }); // 태그 목록중 태그 각 입력칸의 값
    const [colorPickerVisible, setColorPickerVisible] = useState({ tagCode: "", visible: false });

    const handleClose = () => setShow(false);

    const tagList = useSelector(state => state.mailReducer.tagList);

    useEffect(() => {

        if (input.tagCode && input.value !== "" && input.color !== "") {

            updateTags(input.tagCode);
        }
        dispatch(callSelectTagsAPI({}));
        setTagUpdated(false);
    }, [tagUpdated, input]);

    // 태그 등록 
    const registerTags = () => {

        if (newTagName !== "" && newTagColor !== "") {

            dispatch(callRegisterTagsAPI({

                tagName: newTagName,
                tagColor: newTagColor
            }));
            setNewTagName('');
            setNewTagColor('');
            setTagUpdated(!tagUpdated);
            onUpdate();
        } else if(newTagName == "") {
            
            warningAlert("태그명을 입력해주세요.")
        } else {
            
            warningAlert("태그 색상을 선택해주세요.")
        }
    }

    // 태그 수정 
    const updateTags = (tagCode) => {

        const existingTag = tagList.find((tag) => tag.tagCode === tagCode);
    
        const updatedInput = {

            ...input,
            value: input.value === "" ? existingTag?.tagName : input.value,
            color: input.color === "" ? existingTag?.tagColor : input.color,
        };
        if (updatedInput.value !== "") {

            dispatch(callUpdateTagsAPI({

                tagCode: tagCode,
                tagName: updatedInput.value,
                tagColor: updatedInput.color,
            }));
            setColorPickerVisible({ tagCode: "", visible: false });
            setInput({ tagCode: "", value: "", color: "" });
            setTagUpdated(!tagUpdated);
            onUpdate();
        } else {

            warningAlert("태그명을 입력해주세요.");
        }
    };

    // 수정 입력값 변경 핸들러 
    const handleInputChange = (event, tagCode) => {

        setInput((prevState) => ({

            ...prevState,
            tagCode: tagCode,
            value: event.target.value,
        }));
    };

    // 색상 선택 함수
    const selectTagColor = (tagCode, newColor) => {

        const existingTag = tagList.find((tag) => tag.tagCode === tagCode);

        setInput((prevState) => ({

            ...prevState,
            tagCode: tagCode,
            value: existingTag?.tagName, 
            color: newColor,
        }));
    };
    
    // 색상 변경 박스 토글 
    const toggleColorPicker = (tagCode) => {

        setColorPickerVisible((prevState) => ({

            tagCode: prevState.tagCode === tagCode && prevState.visible ? "" : tagCode,
            visible: prevState.tagCode === tagCode ? !prevState.visible : true,
        }));
    };

    // 태그 삭제 
    const deleteTags = (tagCode) => {

        dispatch(callDeleteTagsAPI({
            
            tagCode : tagCode
        }));
        setTagUpdated(!tagUpdated);
        onUpdate();
    }

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

    // 모달 토글 
    const handleModalToggle = () => {

        if (!show) {

          setScrollPosition(window.pageYOffset);
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollPosition}px`;
        } else {

          document.body.style.overflow = "auto";
          document.body.style.position = "";
          document.body.style.top = "";
          window.scrollTo(0, scrollPosition);
        }
        setShow((prev) => !prev);
    };

    return (
        <>
            <div>
                <span onClick={handleModalToggle}>
                    태그관리
                </span>
                <Modal 
                    show={show} 
                    onHide={handleClose} 
                    centered 
                    className={TagManagementModalCSS.tagModal}
                    onEntered={() => {
                        document.body.style.overflow = "hidden";
                    }}
                    onExited={() => {
                        document.body.style.overflow = "auto";
                    }}
                >
                    <div className={TagManagementModalCSS.tagModalBackground}>
                        <div className={TagManagementModalCSS.tagModalContainer}>
                            <div className={TagManagementModalCSS.tagModalHeader}>태그 관리</div>
                            <div className={TagManagementModalCSS.tagModalBody}>
                                {/* 태그 생성 */}
                                <div className={TagManagementModalCSS.tagCreation}>
                                    <div className={TagManagementModalCSS.iconSelection}>
                                        {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'].map((color) => (
                                            <input
                                                key={color}
                                                style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    border: newTagColor === color ? "2px solid red" : "none"
                                                }}
                                                type='image'
                                                src={`/mail/tags/${color}.png`}
                                                onClick={() => setNewTagColor(color)}
                                            />
                                        ))}
                                    </div>
                                    <input 
                                        type="text" 
                                        className={TagManagementModalCSS.tagNameInput} 
                                        placeholder="태그명" 
                                        value={newTagName}
                                        onChange={(e) => setNewTagName(e.target.value)}
                                    />
                                    <button 
                                        className={TagManagementModalCSS.addTagBtn}
                                        onClick={() => registerTags()}
                                    >
                                        태그 추가
                                    </button>
                                </div>
                                {/* 태그 리스트 */}
                                    <div className={TagManagementModalCSS.tagList}> 
                                        {tagList?.map((tag) => (
                                            <div key={tag.tagCode} className={TagManagementModalCSS.tagItem}>
                                            <div className={TagManagementModalCSS.iconDisplay}>
                                                {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'].map((color) => (
                                                <input
                                                    key={color}
                                                    style={{
                                                        width: "32px",
                                                        height: "32px",
                                                        display: tag.tagColor === color ? 'inline-block' : 'none'
                                                    }}
                                                    type='image'
                                                    src={`/mail/tags/${color}.png`}
                                                    onClick={() => toggleColorPicker(tag.tagCode)}
                                                />
                                                ))}
                                                {colorPickerVisible.tagCode === tag.tagCode && colorPickerVisible.visible && (
                                                    <div className={TagManagementModalCSS.colorPicker} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'].map((color) => (
                                                            <input
                                                                key={color}
                                                                style={{
                                                                    width: "32px",
                                                                    height: "32px",
                                                                }}
                                                                type='image'
                                                                src={`/mail/tags/${color}.png`}
                                                                onClick={() => selectTagColor(tag.tagCode, color)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                className={TagManagementModalCSS.tagName}
                                                value={input.tagCode === tag.tagCode ? input.value : tag.tagName}
                                                onChange={(event) => handleInputChange(event, tag.tagCode)}
                                            />
                                            <button className={TagManagementModalCSS.editTagBtn} onClick={() => updateTags(tag.tagCode)}>수정</button>

                                            <button className={TagManagementModalCSS.deleteTagBtn} onClick={() => deleteTags(tag.tagCode)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                            </div>
                            <div className={TagManagementModalCSS.tagModalFooter}>
                                <button onClick={handleModalToggle}>닫기</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default TagManagerModal;
