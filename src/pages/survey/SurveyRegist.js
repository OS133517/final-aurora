import { ko } from "date-fns/locale";
import SurveyRegistCSS from "./Surveys.module.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Swal from "sweetalert2";

function SurveyRegist() {

    const [questions, setQuestions] = useState([{
        questionNo : 1,
        questionBody : "",
        questionType : "choice",
        choices : [{
            choiceBody : '' 
        }]
    }])

    const [form, setForm] = useState({
        surveySubject : "",
        startDate : new Date(),
        endDate : new Date(),
        questions : questions
    });

    const max = Math.max.apply(Math, questions.map(item => item.questionNo));
    const [nextNo, setNextNo] = useState(parseInt(max) + 1);

    const onClickQuestionHandler = () => {

        const newQuestions = questions.concat({
            questionNo : nextNo,
            questionBody : "",
            questionType : "choice",
            choices : [{
                choiceBody : '' 
            }]
        })

        setNextNo(nextNo + 1);
        setQuestions(newQuestions);
    };

    const onClickChoiceHandler = (questionNo) => {

        const newQuestions = questions.map(item => {
            console.log('작동중?', item.choices);
            console.log('작동중?', item.questionNo === questionNo?true : false);
            if(item.questionNo === questionNo) {
                if(item.choices.length === 5) {
                    Swal.fire({
                        icon : 'warning',
                        text : '최대 보기 수 입니다.'
                    })

                    return item;
                }
                item.choices = item.choices.concat({
                    choiceBody : '' 
                })  
                console.log('작동중? choices', item.choices);
            }
            console.log('작동중? item', item);
            return item;
        });

        setQuestions(newQuestions);
    }

    const onChangeFormHandler = (e) => {

        setForm({
            ...form,
           [e.target.name] : e.target.value
        })
    }

    const onChangeHandler = (e) => {

        const newQuestions = questions.map(item => {
            if(item.questionNo === parseInt(e.target.id)) {
                item.questionType = e.target.value
            }
            return item;
        });

        setQuestions(newQuestions);
    }

    return (
        <div>
            <div className={SurveyRegistCSS.addressesHeader}>
                <span>설문 생성</span>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                설문 주제
                            </td>
                            <td colSpan="2">
                                <input type="text" name="surveySubject" value={form.surveySubject} onChange={onChangeFormHandler}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                기간
                            </td>
                            <td colSpan="2">
                                <DatePicker
                                    className={SurveyRegistCSS.datePicker}
                                    locale={ko}
                                    selected={form.startDate}
                                    value={form.startDate}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date()}
                                    />
                                &nbsp;&nbsp;~&nbsp;&nbsp;
                                <DatePicker
                                    className={SurveyRegistCSS.datePicker}
                                    locale={ko}
                                    selected={form.endDate}
                                    value={form.endDate}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date()}
                                    />
                            </td>
                        </tr>
                        {questions.map(question => 
                            ( 
                            <>
                                <tr key={question.questionNo}>
                                    <td>
                                        질문 {question.questionNo}
                                    </td>
                                    <td colSpan="2">
                                        <input type="text" name="survey" value=""/>
                                    </td>
                                    </tr>
                                <tr>
                                    <td>
                                        질문 타입
                                    </td>
                                    <td colSpan="2">
                                        <select id={question.questionNo} name="questionType" value={question.questionType} onChange={onChangeHandler}>
                                            <option value='choice'>선택형</option>
                                            <option value='write'>서술형</option>
                                        </select>
                                    </td>
                                </tr>
                                {question.questionType === 'choice' &&
                                    <>
                                        {question.choices.map((choice, index) => (
                                            <tr key={index}>
                                                <td>
                                                    보기 {index + 1}
                                                </td>
                                                <td>
                                                    <input type="text" name="survey" value={choice.choiceBody}/>
                                                </td>
                                                {index === question.choices.length - 1 && 
                                                <td>
                                                    <button onClick={() => onClickChoiceHandler(question.questionNo)}>보기 추가</button>
                                                </td>}
                                            </tr>
                                        ))}
                                    </>
                                }
                            </>
                            ))}
                        <tr>
                            <td colSpan="3">
                                <button onClick={onClickQuestionHandler}>질문 추가</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SurveyRegist