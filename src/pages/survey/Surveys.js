import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurveysCSS from "./Surveys.module.css";
import { callAllSurveysAPICall } from "../../apis/SurveyAPICall";
import Swal from "sweetalert2";

function Surveys() {

    const dispatch = useDispatch();
    const surveys = useSelector(state => state.surveyReducer.surveys);
    const surveyList = surveys?.data;
    const pageInfo = surveys?.pageInfo;
    const [survey, setSurvey] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    useEffect(() => {

        dispatch(callAllSurveysAPICall({
            currentPage : currentPage
        }));
    // eslint-disable-next-line
    }, [currentPage]);

    const onClickDetail = (survey) => {

        if(new Date(survey.startDate) < new Date()) {
            Swal.fire({
                icon : 'warning',
                text : '마감된 설문입니다.'
            });

            return;
        } else if(false) {
            Swal.fire({
                icon : 'warning',
                text : '이미 답변한 설문입니다.'
            })

            return;
        }

        setSurvey(survey);
    }

    return (
        <div className={SurveysCSS.addressesDiv}>
            <div className={SurveysCSS.addressesHeader}>
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
                                    <span style={new Date(item.startDate) >= new Date()? {backgroundColor:'#88CFBA'}:{backgroundColor:'#3F4940'}}>
                                        {new Date(item.startDate) >= new Date()? '진행중':'마감'}
                                    </span>
                                </td>
                                <td>1</td>
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
    );
}

export default Surveys;