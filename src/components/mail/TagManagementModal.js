import { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { callRegisterTagsAPI,
            callSelectTagsAPI,
            callUpdateTagsAPI,
            callDeleteTagsAPI
        } from "../../apis/MailAPICall";

import TagManagementModalCSS from "./TagManagementModal.module.css";

function TagManagerModal() {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [tagUpdated, setTagUpdated] = useState(false); 
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('');
    const [input, setInput] = useState({ id: "", value: "" }); // 태그 목록중 태그 각 입력칸의 값 
    const [inputColor, setInputColor] = useState({ id: "", value: "" }); // 태그 목록중 태그의 아이콘 클릭시 나타난 목록중 클릭된 값 

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tagList = useSelector(state => state.mailReducer.tagList);

    useEffect(() => {

        dispatch(callSelectTagsAPI({}));

        setTagUpdated(false);
    }, [tagUpdated]);

    const registerTags = () => {

        if (newTagName !== "" && newTagColor !== "") {

            dispatch(callRegisterTagsAPI({

                tagName: newTagName,
                tagColor: newTagColor
            }));
            setNewTagName('');
            setNewTagColor('');
            setTagUpdated(!tagUpdated);
        }
    }

    const updateTags = () => {

        // dispatch(callRegisterTagsAPI({
            
        //     tagName : input,
        //     tagColor : inputColor
        // }));
        // setTagUpdated(!tagUpdated);
        if (input.id !== "" && input.value !== "") {
            dispatch(callUpdateTagsAPI({
                tagCode: input.id,
                tagName: input.value,
                tagColor: inputColor.value
            }));
            setInput({ id: "", value: "" });
            setInputColor({ id: "", value: "" });
            setTagUpdated(!tagUpdated);
        }
    }

    const inputChangeHandler = (event, tagCode) => {

        setInput({ id: tagCode, value: event.target.value });
    }
    
    const selectTagColor = (color, tagCode) => {

        setInputColor({ id: tagCode, value: color });
        updateTags();
    }

    const deleteTags = (tagCode) => {

        dispatch(callRegisterTagsAPI({
            
            tagCode : tagCode
        }));
        setTagUpdated(!tagUpdated);
    }

    return (
        <>
            <div>
                <span onClick={handleShow}>
                    태그관리
                </span>
                <Modal show={show} onHide={handleClose} centered className={TagManagementModalCSS.tagModal}>
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
                                                    border: newTagColor === color ? "2px solid black" : "none"
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
                                        onClick={registerTags}
                                    >
                                        태그 추가
                                    </button>
                                </div>
                                {/* 태그 리스트 */}
                                <div className={TagManagementModalCSS.tagList}>
                                    {/* 태그 항목 예시 */}
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
                                                        onClick={() => selectTagColor(color, tag.tagCode)}
                                                    />
                                                ))}
                                            </div>
                                            <input
                                                type="text"
                                                className={TagManagementModalCSS.tagName}
                                                value={tag.tagName}
                                                onChange={(e) => inputChangeHandler(e, tag.tagCode)}
                                            />
                                            <button className={TagManagementModalCSS.editTagBtn} onClick={updateTags}>수정</button>
                                            <button className={TagManagementModalCSS.deleteTagBtn} onClick={() => deleteTags(tag.tagCode)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={TagManagementModalCSS.tagModalFooter}>
                                <button onClick={() => handleClose()}>닫기</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default TagManagerModal;
