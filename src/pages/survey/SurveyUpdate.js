import SurveyUpdateCSS from "./SurveyRegist.module.css";
import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callQuestionDeleteAPI, callSurveyForUpdateAPI, callSurveyRegistAPI, callSurveyUpdateAPI } from "../../apis/SurveyAPICall";

function SurveyUpdate() {

    const {surveyCode} = useParams();
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const surveyResult = useSelector(state => state.surveyReducer.surveyResult);
    const survey = useSelector(state => state.surveyReducer.survey);
    const [questions, setQuestions] = useState([{
        questionNo : -1,
        questionBody : "",
        questionType : "choice",
        choices : [{
            choiceBody : '' 
        }, {
            choiceBody : '' 
        }]
    }]);
    const [form, setForm] = useState({
        surveyCode : "",
        surveySubject : "",
        startDate : new Date(),
        endDate : new Date()
    });
    
    const min = Array.isArray(questions) && Math.min.apply(Math, questions.map(item => item.questionNo));
    const [nextNo, setNextNo] = useState(parseInt(min) - 1);

    useEffect(() => {

        dispatch(callSurveyForUpdateAPI({
            surveyCode : surveyCode
        }))
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // eslint-disable-next-line
    }, [Array.isArray(questions) && questions.length, Array.isArray(questions) && questions[questions.length - 1].choices]);

    useEffect(() => {

        if(surveyResult.status === 200) {
            navigate("/aurora/survey/survey-management", { replace: true});
        } else if(surveyResult.status === 400) {
            Swal.fire({
                icon : "error",
                text : surveyResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        }
    }, [surveyResult])

    useEffect(() => {
        
        survey && setForm({
            surveyCode : survey?.surveyCode,
            surveySubject : survey?.surveySubject,
            startDate : new Date(survey?.startDate||null),
            endDate : new Date(survey?.endDate||null)
        });

        Array.isArray(survey.questions) && setQuestions([
            ...survey.questions
        ]);
    }, [survey])

    // 질문 추가 버튼
    const onClickQuestionAdd = () => {

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

        setNextNo(nextNo - 1);
        setQuestions(newQuestions);
    };

    // 질문 삭제 버튼
    const onClickQuestionDelete = (questionNo) => {

        if(questions.length === 1) {
            Swal.fire({
                icon : 'warning',
                text : '더 삭제할 수 없습니다.'
            })

            return;
        }

        const deleteQuestions = questions.filter(item => item.questionNo !== questionNo);

        setNextNo(nextNo + 1);
        setQuestions(deleteQuestions);
    }

    // 질문 추가 버튼
    const onClickChoiceHandler = (questionNo) => {

        const newOne = questions.map(item => {

            if(item.questionNo === questionNo) {
                item.choices = item.choices.concat({
                    choiceBody : '' 
                })  
            }
            return item;
        });

        setQuestions(newOne);
    }

    // 선택지 삭제 버튼
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

    // 설문 주제 관리
    const onChangeFormHandler = (e) => {

        setForm({
            ...form,
           [e.target.name] : e.target.value
        })
    }

    // 날짜 선택 관리
    const setDate = (type, date) => {

        if(type === 'startDate') {
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

    // 질문 input 관리
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

    // 선택지 input 내용 관리
    const onChangeChoiceHandler = (e) => {
        
        const newQuestions = questions.map(item => {
            if(parseInt(item.questionNo) === parseInt(e.target.id)){
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

    // 자동 생성 버튼
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

    // 설문 수정 버튼
    const onClickSave = () => {

        const originalQuestionNos = survey.questions.map(question => question.questionNo);
        const newQuestionNos = questions.filter(question => originalQuestionNos.indexOf(question.questionNo) === - 1);
        const deleteQuestionNos = originalQuestionNos.filter(original => questions.map(newOne => newOne.questionNo).indexOf(original) === - 1);
        const emptyOnes = [];   
        let choices = 0;

        questions.map((item, index) => {
            if(item.questionBody === null || item.questionBody === '') {
                emptyOnes.push(index)
            }
        })

        questions.map(item => {
            item.choices.map(item2 => {
                if(item2.choiceBody === null || item2.choiceBody === '') {
                    choices++;
                }
            })
        });

        if(form.surveySubject === null || form.surveySubject === '') {

            Swal.fire({
                icon : 'error',
                text : '설문 주제를 적어주세요.'
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

        dispatch(callSurveyUpdateAPI({
            form : form
        }));

        newQuestionNos.length > 0 && dispatch(callSurveyRegistAPI({
            form : form,
            questions : newQuestionNos
        }));

        deleteQuestionNos.length > 0 && dispatch(callQuestionDeleteAPI({
            questionNos : deleteQuestionNos
        }));
    }

    return (
        <div className={SurveyUpdateCSS.surveyRegistDiv}>
            <div className={SurveyUpdateCSS.header}>
                <span>설문 수정</span>
            </div>
            <div className={SurveyUpdateCSS.tableDiv} ref={scrollRef}>
                <table className={SurveyUpdateCSS.contentTable}>
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
                            <td colSpan="2" className={SurveyUpdateCSS.datePickerDiv}>
                                <DatePicker
                                    className={SurveyUpdateCSS.datePicker}
                                    locale={ko}
                                    name="startDate"
                                    selected={form.startDate}
                                    value={form.startDate}
                                    onChange={(date) => setDate("startDate", date)}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date()}
                                    closeOnScroll={true}
                                    />
                                    <span>~</span>
                                    <DatePicker
                                    className={SurveyUpdateCSS.datePicker}
                                    locale={ko}
                                    name="endDate"
                                    selected={form.endDate||''}
                                    value={form.endDate||''}
                                    onChange={(date) => setDate("endDate", date)}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date(form.startDate)}
                                    />
                            </td>
                        </tr>
                        {Array.isArray(questions) && questions.map((question, index) => 
                            ( 
                            <Fragment key={question.questionNo}>
                                <tr>
                                    <td>
                                        질문 {index + 1}
                                    </td>
                                    <td colSpan="2" className={SurveyUpdateCSS.questionTr}>
                                        <input 
                                            type="text" 
                                            id={`questionBody${question?.questionNo}`} 
                                            name="questionBody" 
                                            value={question?.questionBody}
                                            maxLength='100'
                                            disabled={question.questionNo > 0?true:false}
                                            onChange={onChangeHandler}/>
                                        <button onClick={() => onClickQuestionDelete(question.questionNo)} className={SurveyUpdateCSS.QXButtons}>X</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        질문 타입
                                    </td>
                                    <td colSpan="2">
                                        <select 
                                            id={`questionType${question.questionNo}`} 
                                            name="questionType" 
                                            value={question.questionType} 
                                            disabled={question.questionNo > 0?true:false}
                                            onChange={onChangeHandler}>
                                            <option value='choice'>선택형</option>
                                            <option value='write'>서술형</option>
                                        </select>
                                        {question.questionType === 'choice' && question.questionNo < 0 &&
                                            <>
                                                <button className={SurveyUpdateCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 2)}>2 개</button>
                                                <button className={SurveyUpdateCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 3)}>3 개</button>
                                                <button className={SurveyUpdateCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 4)}>4 개</button>
                                                <button className={SurveyUpdateCSS.autoBtns} onClick={() => onClickAutoButton(question.questionNo, 5)}>5 개</button>
                                            </>}
                                    </td>
                                </tr>
                                {question.questionType === 'choice' &&
                                    <>
                                        {question.choices.map((choice, index) => (
                                            <tr key={index} className={SurveyUpdateCSS.choiceTr}>
                                                <td>
                                                    - {index + 1}번 선택지
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        name={`choiceBody${index}`} 
                                                        id={question?.questionNo} 
                                                        value={choice?.choiceBody||''}
                                                        maxLength='50'
                                                        disabled={question.questionNo > 0?true:false}
                                                        onChange={onChangeChoiceHandler}/>
                                                </td>
                                                {index === question.choices.length - 1 && 
                                                <td>
                                                    {index !== 0 && question.questionNo < 0 && <button onClick={() => onClickChoiceDelete(question.questionNo)} className={SurveyUpdateCSS.CXButtons}>X</button>}
                                                    {question.questionNo < 0 && <button className={SurveyUpdateCSS.addButtons} onClick={() => onClickChoiceHandler(question.questionNo)}> + 보기 추가</button>}
                                                </td>}
                                            </tr>
                                        ))}
                                    </>
                                }
                                </Fragment>
                            ))}
                        <tr>
                            <td colSpan="3">
                                <button className={SurveyUpdateCSS.addButtons} onClick={onClickQuestionAdd}> + 질문 추가</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={SurveyUpdateCSS.buttonDiv}>
                <div>
                    <button onClick={onClickSave}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default SurveyUpdate;