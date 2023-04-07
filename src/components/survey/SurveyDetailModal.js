import { useState } from "react";
import SurveyModalCSS from "./SurveyDetailModal.module.css";
import { decodeJwt } from "../../utils/tokenUtils";

function SurveyDetailModal({survey, setIsModalOn}) {

    const isLogin = decodeJwt(window.localStorage.getItem("accessToken"));
    const [form, setForm] = useState(survey.questions.map(question => (
        ""
    )));

    const onChangeInputHandler = (e) => {

        const choiceAnswer = {
            choiceNo : e.target.value,
            membercode : isLogin.memberCode
        }

        setForm(form.concat(choiceAnswer));

        console.log(form);
    }

    return (
        <div className={SurveyModalCSS.modalBackground}>
        <div className={SurveyModalCSS.modalContainer}>
            <div className={SurveyModalCSS.header}>
                {survey.surveySubject}
            </div>
            <div className={SurveyModalCSS.subHeader}>
                기간 : {survey.startDate}&nbsp;~&nbsp;{survey.endDate}
                <div>
                    {'\u00A0'}
                </div>
            </div>
            <div className={SurveyModalCSS.modalDiv}>
                {Array.isArray(survey?.questions) && survey.questions.map((question, index) => 
                    <>
                        <p>{index + 1}번. {question.questionBody}</p>
                        {
                            Array.isArray(question?.choices) && question.choices.length !== 1? question.choices.map((choice, index) => (
                                <label key={choice.choiceNo}>
                                    <input 
                                        type="radio" 
                                        name={question.questionNo} 
                                        value={choice.choiceNo}
                                        onChange={onChangeInputHandler}/>
                                        {choice.choiceBody}
                                </label>
                            )) : <input type="text" value=""/>}
                    </>
                )}
            </div>
            <div className={SurveyModalCSS.buttonDiv}>
                <button onClick={() => setIsModalOn(false)}>나가기</button>
                <button>답변하기</button>
            </div>
        </div>
    </div>
    );
}

export default SurveyDetailModal;