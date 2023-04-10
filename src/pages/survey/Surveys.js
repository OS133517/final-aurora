import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurveysCSS from "./Surveys.module.css";
import { callAllSurveysAPICall } from "../../apis/SurveyAPICall";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import SurveyDetailModal from "../../components/survey/SurveyDetailModal";

function Surveys() {

    const dispatch = useDispatch();
    const surveys = useSelector(state => state.surveyReducer.surveys);
    const surveyResult = useSelector(state => state.surveyReducer.surveyResult);
    const surveyList = surveys?.data;
    const pageInfo = surveys?.pageInfo;
    const isLogin = jwtDecode(window.localStorage.getItem("accessToken"));
    const [survey, setSurvey] = useState([]);
    const [isModalOn, setIsModalOn] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    useEffect(() => {

        dispatch(callAllSurveysAPICall({
            currentPage : currentPage,
            memberCode : isLogin.memberCode
        }));
    // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {

        if(surveyResult.status === 200) {
            Swal.fire({
                icon : 'success',
                text : '설문 답변 성공'
            }).then(() => {
                window.location.reload(true); 
            })
        } else if(surveyResult.status === 400) {
            Swal.fire({
                icon : "error",
                text : surveyResult.message
            })
        }
    }, [surveyResult])

    const onClickDetail = (survey) => {

        if(new Date(`${survey.endDate} 18:00`).getTime() < new Date().getTime()) {
            Swal.fire({
                icon : 'warning',
                text : '마감된 설문입니다.'
            });

            return;
        } else if(new Date(`${survey.startDate} 06:00`).getTime() > new Date().getTime()) {
            Swal.fire({
                icon : 'warning',
                text : '아직 답변할 수 없습니다.'
            })

            return;
        }

        setSurvey(survey);
        setIsModalOn(true);
    }
    Array.isArray(surveyList) && console.log(new Date(surveyList[0].startDate + ' 06:00'));
    console.log(new Date());
    return (
        <>
            {isModalOn? <SurveyDetailModal survey={survey} setIsModalOn={setIsModalOn}/>:null}
            <div className={SurveysCSS.surveyDiv}>
                <div className={SurveysCSS.surveyHeader}>
                    <span>설문 목록</span>
                </div>
                <table className={SurveysCSS.contentTable}>
                    <thead className={SurveysCSS.contentHead}>
                        <tr>
                            <th>
                                번호
                            </th>
                            <th>
                                설문 주제
                            </th>
                            <th>
                                기간
                            </th>
                            <th>
                                설문 상태
                            </th>
                            <th>
                                답변 상태
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(surveyList) && surveyList.map(item => (
                                <tr key={item.surveyCode} onClick={() => onClickDetail(item)}>
                                    <td>{item.surveyCode}</td>
                                    <td>{item.surveySubject}</td>
                                    <td>{item.startDate}&nbsp;~&nbsp;{item.endDate}</td>
                                    <td>
                                        <span style={new Date(`${item.startDate} 06:00`).getTime() > new Date().getTime()?{backgroundColor:'#3297f7'}:new Date(`${item.endDate} 18:00`).getTime() < new Date().getTime()? {backgroundColor:'#3F4940'}:{backgroundColor:'#58b99c'}}>
                                            {new Date(`${item.startDate} 06:00`).getTime() > new Date().getTime()? '진행 전':new Date(`${item.endDate} 18:00`).getTime() < new Date().getTime()? '마감':'진행중'}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={item.replyStatus === 'N'? {backgroundColor:'rgb(236, 71, 71)'}:item.replyStatus === 'O'?{backgroundColor:'#3297f7'}:{backgroundColor:'#3F4940'}}>
                                            {item.replyStatus === 'N'? '미답변':item.replyStatus === 'O'? '임시저장':'답변완료'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            (!Array.isArray(surveyList) || surveyList.length === 0) &&
                                <tr>
                                    <td colSpan="5" style={{textAlign:"center"}}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
                <div className={ SurveysCSS.pagingBtnDiv }>
                    {
                        Array.isArray(surveyList) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={ SurveysCSS.pagingBtn }
                            >
                                &lt;
                            </button>
                    }
                    {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                            className={ SurveysCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    {
                        Array.isArray(surveyList) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage + 1)} 
                                disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                                className={ SurveysCSS.pagingBtn }
                            >
                                &gt;
                            </button>
                    }
                </div>
            </div>
        </>
    );
}

export default Surveys;