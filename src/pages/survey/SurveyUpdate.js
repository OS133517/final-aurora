import SurveyUpdateCSS from "./SurveyRegist.module.css";
import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { callQuestionDeleteAPI, callSurveyForUpdateAPI, callSurveyRegistAPI, callSurveyUpdateAPI } from "../../apis/SurveyAPICall";

function SurveyUpdate() {

    const {surveyCode} = useParams();
    const scrollRef = useRef();
    const dispatch = useDispatch();
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
    const [deleteQuestions, setDeleteQuestions] = useState([]);
    const [deleteChoices, setDeleteChoices] = useState([]);
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
            Swal.fire({
                icon : 'success',
                text : surveyResult.message,
                confirmButtonText : '확인'
            }).then(() => {
                window.location.reload(true); 
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
    const onClickQuestionDelete = () => {

        if(questions.length === 1) {
            Swal.fire({
                icon : 'warning',
                text : '더 삭제할 수 없습니다.'
            })

            return;
        }
        questions.pop();

        setNextNo(nextNo + 1);
        setQuestions(questions);
    }

    // 질문 추가 버튼
    const onClickChoiceHandler = (questionNo) => {

        const newOne = questions.map(item => {

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

    // 설문 수정 버튼
    const onClickSave = () => {

        const originalQuestionNos = survey.questions.map(question => question.questionNo);
        const newQuestionNos = questions.filter(question => originalQuestionNos.indexOf(question.questionNo) === - 1);
        const deleteQuestionNos = originalQuestionNos.filter(original => questions.map(newOne => newOne.questionNo).indexOf(original) === - 1);
        const remainQuestions = questions.filter(question => newQuestionNos.map(item => item.questionNo).indexOf(question.questionNo) === - 1).filter(question => deleteQuestionNos.indexOf(question.questionNo) === - 1);
        const updateQuestions = [];
        console.log('questions', questions.map(item => item.questionNo));
        console.log('originalQuestionNos', originalQuestionNos);
        console.log('newQuestionNos', newQuestionNos);
        console.log('deleteQuestionNos', deleteQuestionNos);
        console.log('remainQuestions',  remainQuestions);

        dispatch(callSurveyUpdateAPI({
            form : form,
            questions : updateQuestions
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
                                            onChange={onChangeHandler}/>
                                        {index === questions.length - 1 && index !== 0 && <button onClick={() => onClickQuestionDelete(question.questionNo)} className={SurveyUpdateCSS.QXButtons}>X</button>}
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
                                                        onChange={onChangeChoiceHandler}/>
                                                </td>
                                                {index === question.choices.length - 1 && 
                                                <td>
                                                    {index !== 0 && <button onClick={() => onClickChoiceDelete(question.questionNo)} className={SurveyUpdateCSS.CXButtons}>X</button>}
                                                    <button className={SurveyUpdateCSS.addButtons} onClick={() => onClickChoiceHandler(question.questionNo)}> + 보기 추가</button>
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