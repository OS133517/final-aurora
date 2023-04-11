import { ko } from "date-fns/locale";
import SurveyRegistCSS from "./SurveyRegist.module.css";
import DatePicker from "react-datepicker";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSurveyRegistAPI } from "../../apis/SurveyAPICall";
import { useNavigate } from "react-router";

function SurveyRegist() {

    const scrollRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const surveyResult = useSelector(state => state.surveyReducer.surveyResult);
    const [questions, setQuestions] = useState([{
        questionNo : 1,
        questionBody : "",
        questionType : "choice",
        choices : [{
            choiceBody : '' 
        }, {
            choiceBody : '' 
        }]
    }])
    const [isSelect, setIsSelect] = useState(false);

    useEffect(() => {

        if(surveyResult.status === 200) {
            Swal.fire({
                icon : 'success',
                text : surveyResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                navigate("/aurora/survey/survey-management", { replace: true});
            })
        } else if(surveyResult.status === 400) {
            Swal.fire({
                icon : "error",
                text : surveyResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        }
    // eslint-disable-next-line
    }, [surveyResult])

    useEffect(() => {

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // eslint-disable-next-line
    }, [questions.length, questions[questions.length - 1].choices]);

    const [form, setForm] = useState({
        surveySubject : "",
        startDate : new Date(),
        endDate : new Date()
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
            }, {
                choiceBody : '' 
            }]
        })

        setNextNo(nextNo + 1);
        setQuestions(newQuestions);
    };

    const onClickQuestionDelete = () => {

        if(questions.length === 1) {
            Swal.fire({
                icon : 'warning',
                text : '더 삭제할 수 없습니다.'
            })

            return;
        }
        questions.pop();

        setNextNo(nextNo - 1);
        setQuestions(questions);
    }

    const onClickChoiceHandler = (questionNo) => {

        const newQuestions = questions.map(item => {

            if(item.questionNo === questionNo) {
                item.choices = item.choices.concat({
                    choiceBody : '' 
                })  
            }
            return item;
        });

        setQuestions(newQuestions);
    }

    const onClickChoiceDelete =(questionNo) => {

        const newQuestions = questions.map(item => {

            if(item.questionNo === questionNo) {
                if(item.choices.length === 2) {
                    Swal.fire({
                        icon : 'warning',
                        text : '더 삭제할 수 없습니다'
                    })

                    return item;
                }

                item.choices.pop();
                console.log(item.choices);
            }
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

    const setDate = (type, date) => {

        if(type === 'startDate') {
            setIsSelect(true);
            setForm({
                ...form,
                startDate : date,
                endDate : date
            })
        } else if(type === 'endDate') {
            setForm({
                ...form,
                endDate : date
            })
        }
    }

    const onChangeHandler = (e) => {
        
        let newQuestions;
        
        if(e.target.name === 'questionType') {

            newQuestions = questions.map(item => {
                if(`questionType${item.questionNo}` === e.target.id) {
                    item.questionType = e.target.value
                    if(item.questionType === 'write') {
                        item.choices = [{choiceBody : ''}];
                    } else if(item.questionType === 'choice') {
                        item.choices = [{choiceBody : ''}, {choiceBody : ''}];
                    }
                }
                return item;
            });
        } else if(e.target.name === 'questionBody') {

            newQuestions = questions.map(item => {
                if(`questionBody${item.questionNo}` === e.target.id){
                    item.questionBody = e.target.value
                }
                return item;
            });
        } 

        setQuestions(newQuestions);
    }

    const onChangeChoiceHandler = (e) => {
        
        const newQuestions = questions.map(item => {
            if(item.questionNo === parseInt(e.target.id)){
                const newChoices = item.choices.map((choice, index) => {
                    if(`choiceBody${index}` === e.target.name) {
                        choice.choiceBody = e.target.value;
                    }
                    return choice;
                })
                item.choices = newChoices;
            }
            return item;
        });

        setQuestions(newQuestions);
    }

    const onClickAutoButton = (questionNo, amount) => {

        let newQuestions = questions.map(item => {
                if(item.questionNo === questionNo) {
                    switch(amount) {
                        case 2 : 
                            item.choices = [{choiceBody : '아니오'}, {choiceBody : '예'}];
                            break;
                        case 3 : 
                            item.choices = [{choiceBody : '그렇지 않다.'}, {choiceBody : '보통이다'}, {choiceBody : '그렇다'}];
                            break;
                        case 4 :
                            item.choices = [{choiceBody : '매우 아니다.'}, {choiceBody : '조금 아니다.'}, {choiceBody : '조금 그렇다.'}, {choiceBody : '매우 그렇다'}];
                            break;
                        case 5 :
                            item.choices = [{choiceBody : '매우 아니다.'}, {choiceBody : '조금 아니다.'}, {choiceBody : '보통이다.'},  {choiceBody : '조금 그렇다.'}, {choiceBody : '매우 그렇다'}];
                            break;
                        default : break;
                    }
                }
                return item;
            });
        
        setQuestions(newQuestions);
    }

    const onClickSave = () => {

        const emptyOnes = [];
        let choices = 0;

        questions.map((item, index) => {
            if(item.questionBody === null || item.questionBody === '') {
                emptyOnes.push(index)
            }
            return item;
        })

        questions.map(item => {
            item.choices.map(item2 => {
                if(item2.choiceBody === null || item2.choiceBody === '') {
                    choices++;
                }
                return item2;
            })
            return item;
        });
        console.log(choices);

        if(form.surveySubject === null || form.surveySubject === '') {

            Swal.fire({
                icon : 'error',
                text : '설문 주제를 적어주세요.'
            })

            return;
        }

        if(!isSelect) {

            Swal.fire({
                icon : 'error',
                text : '기간을 설정해주세요.'
            })

            return;
        }

        if(emptyOnes.length > 0) {

            Swal.fire({
                icon : 'error',
                text : `${emptyOnes.map(item => item + 1)} 번 질문을 입력하세요.`
            })

            return;
        }

        if(choices !== 0) {

            Swal.fire({
                icon : 'error',
                text : `빈 선택지가 있습니다.`
            })

            return;
        }
        
        dispatch(callSurveyRegistAPI({
            form : form,
            questions : questions
        }));
    }

    return (
        <div className={SurveyRegistCSS.surveyRegistDiv}>
            <div className={SurveyRegistCSS.header}>
                <span>설문 생성</span>
            </div>
            <div className={SurveyRegistCSS.tableDiv} ref={scrollRef}>
                <table className={SurveyRegistCSS.contentTable}>
                    <tbody>
                        <tr>
                            <td>
                                설문 주제
                            </td>
                            <td colSpan="2">
                                <input 
                                    type="text" 
                                    name="surveySubject" 
                                    value={form.surveySubject} 
                                    maxLength='200'
                                    onChange={onChangeFormHandler}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                기간
                            </td>
                            <td colSpan="2" className={SurveyRegistCSS.datePickerDiv}>
                                <DatePicker
                                    className={SurveyRegistCSS.datePicker}
                                    locale={ko}
                                    name="startDate"
                                    selected={form.startDate}
                                    value={form.startDate}
                                    onChange={(date) => setDate("startDate", date)}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date()}
                                    closeOnScroll={true}
                                    />
                                
                                {isSelect && 
                                    <>
                                        <span>~</span>
                                        <DatePicker
                                        className={SurveyRegistCSS.datePicker}
                                        locale={ko}
                                        name="endDate"
                                        selected={form.endDate||''}
                                        value={form.endDate||''}
                                        onChange={(date) => setDate("endDate", date)}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={new Date(form.startDate)}
                                        />
                                    </>}
                            </td>
                        </tr>
                        {questions.map((question, index) => 
                            ( 
                            <Fragment key={question.questionNo}>
                                <tr>
                                    <td>
                                        질문 {index + 1}
                                    </td>
                                    <td colSpan="2" className={SurveyRegistCSS.questionTr}>
                                        <input 
                                            type="text" 
                                            id={`questionBody${question.questionNo}`} 
                                            name="questionBody" 
                                            value={question.questionBody} 
                                            maxLength='100'
                                            onChange={onChangeHandler}/>
                                        {index === questions.length - 1 && index !== 0 && <button onClick={() => onClickQuestionDelete(question.questionNo)} className={SurveyRegistCSS.QXButtons}>X</button>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        질문 타입
                                    </td>
                                    <td colSpan="2">
                                        <select id={`questionType${question.questionNo}`} name="questionType" value={question.questionType} onChange={onChangeHandler}>
                                            <option value='choice'>선택형</option>
                                            <option value='write'>서술형</option>
                                        </select>
                                        {question.questionType === 'choice' && 
                                            <>
                                                <button className={SurveyRegistCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 2)}>2 개</button>
                                                <button className={SurveyRegistCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 3)}>3 개</button>
                                                <button className={SurveyRegistCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 4)}>4 개</button>
                                                <button className={SurveyRegistCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 5)}>5 개</button>
                                            </>}
                                    </td>
                                </tr>
                                {question.questionType === 'choice' &&
                                    <>
                                        {question.choices.map((choice, index) => (
                                            <tr key={index} className={SurveyRegistCSS.choiceTr}>
                                                <td>
                                                    - {index + 1}번 선택지
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        name={`choiceBody${index}`} 
                                                        id={question.questionNo} 
                                                        value={choice.choiceBody}
                                                        maxLength='50'
                                                        onChange={onChangeChoiceHandler}/>
                                                </td>
                                                {index === question.choices.length - 1 && 
                                                <td>
                                                    {index !== 0 && <button onClick={() => onClickChoiceDelete(question.questionNo)} className={SurveyRegistCSS.CXButtons}>X</button>}
                                                    <button className={SurveyRegistCSS.addButtons} onClick={() => onClickChoiceHandler(question.questionNo)}> + 보기 추가</button>
                                                </td>}
                                            </tr>
                                        ))}
                                    </>
                                }
                                </Fragment>
                            ))}
                        <tr>
                            <td colSpan="3">
                                <button className={SurveyRegistCSS.addButtons} onClick={onClickQuestionHandler}> + 질문 추가</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={SurveyRegistCSS.buttonDiv}>
                <div>
                    <button onClick={onClickSave}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default SurveyRegist