import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurveysCSS from "./SurveyManagement.module.css";
import Swal from "sweetalert2";
import { callAllSurveysForManagementAPICall, callSurveyDeleteAPI, callSurveySearchAPICall } from "../../apis/SurveyAPICall";
import { useNavigate } from "react-router-dom";

function SurveyManagement() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const surveys = useSelector(state => state.surveyReducer.surveysForManagement);
    const surveyResult = useSelector(state => state.surveyReducer.surveyResult);
    const surveyList = surveys?.data;
    const pageInfo = surveys?.pageInfo;
  
    const [searchInput, setSearchInput]  = useState({
        condition : "condition",
        value : ""
    });
    const [searchForm, setSearchForm] = useState({
        searchCondition : "condition",
        searchValue : ""
    });
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }
    // const [currentStatus, setCurrentStatus] = useState(true);
    
    useEffect(() => {

        if(!isSearching) {
            dispatch(callAllSurveysForManagementAPICall({
                currentPage : currentPage
            }))
        } else {
            searchCall();
        }
    // eslint-disable-next-line
    }, [currentPage]);

    useEffect(() => {
            
        if(surveyResult.status === 200) {
            Swal.fire({
                icon : "success",
                text : surveyResult.message,
                confirmButtonText: '확인'
            }).then(() => {
                window.location.reload(true); 
            })
        } else if(surveyResult.status === 400) {
            Swal.fire({
                icon : "error",
                text : surveyResult.message
            })
        }
    // eslint-disable-next-line
    }, [surveyResult]);

    // 검색 시
    useEffect(() => {

        searchCall();
        setCurrentPage(1);
    // eslint-disable-next-line
    }, [searchForm])

    // 검색 요청 쏘기
    const searchCall = () => {

        dispatch(callSurveySearchAPICall({
            searchCondition : searchForm.searchCondition,
            searchValue : searchForm.searchValue,
            currentPage : currentPage
        }));
    }

    // 검색 상자 state 관리용 함수
    const onChangeHandler = (e) => {

        setSearchInput({
            ...searchInput,
            [e.target.name] : e.target.value
        });
    }

    // 검색 버튼 함수
    const onClickSearch = () => {

        setIsSearching(true);

        setSearchForm({
            ...searchForm,
            searchCondition : searchInput.condition,
            searchValue : searchInput.value
        });
    }

    // 전체 체크 박스 관리용 함수
    const onClickAllCheck = (e) => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);

        if(e.target.id === 'all' && e.target.checked === false) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = false);
        } else if (e.target.id === 'all' && e.target.checked === true) {

            [...checkList].filter(check => check.id !== 'all').forEach(check => check.checked = true);
        } 
    }

    // 체크 박스 관리용 함수
    const onClickCheck = (e) => {

        if(e.target.type === 'checkbox') return;

        const ckBox = document.querySelector(`#checkBox${e.currentTarget.id}`)
        ckBox.checked = !ckBox.checked;
    }

    const onClickUpdate = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]:not(#all)`);
        const checkedList = [...checkList].filter(check => check.checked === true).map(item => item.id.replace("checkBox", ""));
        const checkedDate = checkedList.length > 0 && surveyList.filter(survey => survey.surveyCode === checkedList[0])[0].startDate;

        if(checkedList.length > 1) {

            Swal.fire({
                icon : 'error',
                text : '수정 시 한개만 선택해주세요.'
            });
            return;
        } else if (checkedList.length === 0) {

            Swal.fire({
                icon : 'error',
                text : '선택된 설문이 없습니다.'
            });
            return;
        }  else if (checkedList.length === 1) {

            if(new Date(`${checkedDate} 06:00`).getTime() <= new Date().getTime()) {
                Swal.fire({
                    icon : 'error',
                    text : '이미 시작된 설문입니다.'
                });
                return;
            } else {
                navigate(`/aurora/survey/survey-management/update/${checkedList[0]}`)
            }
        }
    }

    // 설문 삭제 버튼 함수
    const onClickDelete = () => {

        const checkList = document.querySelectorAll(`input[type=checkBox]`);
        const deleteList = [...checkList].filter(check => check.id !== 'all' && check.checked === true).map(item => item.id.replace("checkBox", ""));

        if(deleteList.length === 0) {

            Swal.fire({
                icon : 'warning',
                text : '선택된 설문이 없습니다.'
            });

            return;
        }

        Swal.fire({
            icon : "warning",
            title : `${deleteList.length} 개의 설문이 삭제됩니다.`,
            text : "정말 삭제하시겠습니까?",
            showCancelButton : true,
            cancelButtonText : '취소',
            confirmButtonText : '확인',
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(callSurveyDeleteAPI({
                    surveyCodes : deleteList
                }));
            } 
        })
    }
    
    return (
        <div className={SurveysCSS.surveyDiv}>
            <div className={SurveysCSS.surveyHeader}>
                <span>설문 관리</span>
            </div>
            <div className={SurveysCSS.surveySearch}>
                {/* <button 
                    style={currentStatus?null:{backgroundColor:'#3F4940'}}
                    onClick={() => setCurrentStatus(!currentStatus)}>{currentStatus? '진행중':'마감'}</button> */}
                <select name="condition">
                    <option name="condition" value="name">주제</option>
                </select>
                <input type="text" name="value" value={searchInput.value} onChange={onChangeHandler}/>
                <button type="button" onClick={onClickSearch}>검&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                <div className={SurveysCSS.imgDiv}>
                    <img onClick={onClickUpdate} src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>
                    <img onClick={onClickDelete} src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>
                </div>
            </div>
            <table className={SurveysCSS.contentTable}>
                <thead className={SurveysCSS.contentHead}>
                    <tr>
                        <th>
                            <input type="checkBox" id="all" onClick={onClickAllCheck}/>
                        </th>
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
                            진행률
                        </th>
                        <th>
                            설문 상태
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(surveyList) && surveyList.map(survey => (
                            <tr key={survey.surveyCode} id={survey.surveyCode} onClick={onClickCheck}>
                                <td>
                                    <input type="checkBox" id={`checkBox${survey.surveyCode}`}/>
                                </td>
                                <td>{survey.surveyCode}</td>
                                <td>{survey.surveySubject}</td>
                                <td>{survey.startDate}&nbsp;~&nbsp;{survey.endDate}</td>
                                <td>{Math.floor(survey.replyStatus)} %</td>
                                <td>
                                    <span style={new Date(`${survey.endDate} 18:00`).getTime() < new Date().getTime()? {backgroundColor:'#3F4940'}:{backgroundColor:'#58b99c'}}>
                                        {new Date(`${survey.endDate} 18:00`).getTime() < new Date().getTime()? '마감':'진행중'}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                    {
                        (!Array.isArray(surveyList) || surveyList.length === 0) &&
                            <tr>
                                <td colSpan="7" style={{textAlign:"center"}}>
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
                <button
                    key={num} onClick={() => setCurrentPage(num)}
                    style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                    className={ SurveysCSS.pagingBtn }
                >
                    {num}
                </button>
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

export default SurveyManagement;