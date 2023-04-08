import { useEffect, useState } from "react";
import SurveyModalCSS from "./SurveyDetailModal.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { callSurveyReplyRegistAPICall } from "../../apis/SurveyAPICall";

function SurveyDetailModal({survey, setIsModalOn}) {

    const dispatch = useDispatch();
    const isLogin = decodeJwt(window.localStorage.getItem("accessToken"));
    const [form, setForm] = useState([]);
    const [barDivWidth, setBarDivWidth] = useState(form.length / survey.questions.length * 100);

    useEffect(() => {
    // TODO - 한번 느리게 렌더링 되는거 수정하기
        setBarDivWidth(form.length / survey.questions.length * 100);
    }, [form.length])

    const onChangeInputHandler = (e) => {

        let answerEdit = form.filter(item => item.questionNo === e.target.name);
        // let removeIndex;
        
        if(answerEdit.length !== 0) {
            if(e.target.value === null || e.target.value === '') {
                answerEdit = form.filter(item => item.questionNo !== e.target.name);
            } else {
                answerEdit = form.map((answer, index) => {
                    if(answer.questionNo === e.target.name) {
                        answer = {
                            questionNo : e.target.name,
                            choiceNo : e.target.id,
                            answerBody : e.target.value,
                            memberCode : isLogin.memberCode
                        }
                        return answer;
                    }
                    return answer;
                })
            }
        } else {
            answerEdit = form.concat({
                questionNo : e.target.name,
                choiceNo : e.target.id,
                answerBody : e.target.value,
                memberCode : isLogin.memberCode
            })
           
        }
       
        setForm(answerEdit);
    }

    const onClickHandler = (replyStatus) => {

        if(survey.questions.length !== form.length) {
            if(replyStatus === 'reply') {
                Swal.fire({
                    icon : 'warning',
                    text : '답하지 않은 문항이 있습니다.',
                    confirmButtonText : '확인'
                })
                return;
            } else if(replyStatus === 'save') {
                if(form.length > 0) {
                    Swal.fire({
                        icon : 'info',
                        text : `${survey.questions.length} 개의 문항 중 ${form.length} 개 문항을 임시 저장합니다.`,
                        confirmButtonText : '확인',
                        showCancelButton : true,
                        cancelButtonText : '취소',
                        cancelButtonColor : 'red'
                    }).then(result => {
                        if(!result.isConfirmed) {
                            Swal.fire('취소되었습니다.');
    
                            return;
                        } else {
                            insertReply(replyStatus);
                        }
                    });
              } else {
                    Swal.fire({
                        icon : 'warning',
                        text : '답변한 문항이 없습니다.',
                        confirmButtonText : '확인'
                    })
                    return;
                }
            }
        } else {
            if(replyStatus === 'save') {
                Swal.fire({
                    icon : 'info',
                    text : `${survey.questions.length} 개의 문항 중 ${form.length} 개 문항을 임시 저장합니다.`,
                    confirmButtonText : '확인',
                    showCancelButton : true,
                    cancelButtonText : '취소',
                    cancelButtonColor : 'red'
                }).then(result => {
                    if(!result.isConfirmed) {
                        Swal.fire('취소되었습니다.');

                        return;
                    } else {
                        insertReply(replyStatus);
                    }
                });
            } else {
                Swal.fire({
                    icon : 'warning',
                    html : `설문 답변을 입력한 후에는 수정할 수 없습니다.<br/>입력하시겠습니까?`,
                    showCancelButton : true,
                    confirmButtonText : '확인',
                    cancelButtonText : '취소',
                    cancelButtonColor : 'red'
                }).then(result => {
                    if(!result.isConfirmed) {
                        Swal.fire('취소되었습니다.');

                        return;
                    } else {
                        insertReply(replyStatus);
                    }
                })
            }
        }
    }

    const insertReply = (replyStatus) => {

        dispatch(callSurveyReplyRegistAPICall({
            form : form,
            replyStatus : replyStatus === 'reply'?'Y':'O',
            memberCode : isLogin.memberCode,
            surveyCode : survey.surveyCode
        }));
    }
 
    return (
        <div className={SurveyModalCSS.modalBackground}>
        <div className={SurveyModalCSS.modalContainer}>
            <div className={SurveyModalCSS.header}>
                {survey.surveySubject}
            </div>
            <div className={SurveyModalCSS.subHeader}>
                기간 : {survey.startDate}&nbsp;~&nbsp;{survey.endDate}
            </div>
            <div className={SurveyModalCSS.progressionBar} style={{ width:`${barDivWidth}%`}}>
                {'\u00A0'}
            </div>
            <div className={SurveyModalCSS.modalDiv}>
                {Array.isArray(survey?.questions) && survey.questions.map((question, index) => 
                    <div key={question.questionNo}>
                        <p>{index + 1}번. {question.questionBody}</p>
                        {
                            Array.isArray(question?.choices) && question.choices.length !== 1? question.choices.map((choice, index) => (
                                <label key={choice.choiceNo}>
                                    <input 
                                        type="radio" 
                                        name={question.questionNo} 
                                        id={choice.choiceNo}
                                        value={choice.choiceNo}
                                        onChange={onChangeInputHandler}/>
                                        {choice.choiceBody}
                                </label>
                            )) : question.choices.map(choice => 
                                    <input 
                                        key={choice.choiceNo}
                                        type="text" 
                                        name={question.questionNo}
                                        id={choice.choiceNo}
                                        maxLength='100'
                                        onChange={onChangeInputHandler}/>)}
                    </div>
                )}
            </div>
            <div className={SurveyModalCSS.buttonDiv}>
                <button onClick={() => setIsModalOn(false)}>나가기</button>
                <button onClick={() => onClickHandler('save')}>임시저장</button>
                <button onClick={() => onClickHandler('reply')}>답변하기</button>
            </div>
        </div>
    </div>
    );
}

export default SurveyDetailModal;