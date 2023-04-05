import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SurveysCSS from "./Surveys.module.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Surveys() {

    const dispatch = useDispatch();

    const [searchInput, setSearchInput]  = useState({
        condition : "name",
        value : ""
    });
    const [searchForm, setSearchForm] = useState({
        searchCondition : "",
        searchValue : ""
    });
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumber = [];
    

    // 검색 요청 쏘기
    const searchCall = () => {

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


    return (
        <div className={SurveysCSS.addressesDiv}>
            <div className={SurveysCSS.addressesHeader}>
            </div>
            <div className={SurveysCSS.addressesSearch}>
                <select name="condition" onChange={onChangeHandler}>
                    <option name="condition" value="name">이름</option>
                    <option name="condition" value="email">이메일</option>
                </select>
                <input type="text" name="value" value={searchInput.value} onChange={onChangeHandler}/>
                <button type="button" onClick={onClickSearch}>검&nbsp;&nbsp;&nbsp;&nbsp;색</button>
                <div className={SurveysCSS.imgDiv}>
                    <img src={process.env.PUBLIC_URL + "/update.png"} alt="수정"/>
                    <img src={process.env.PUBLIC_URL + "/delete.png"} alt="삭제"/>
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
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ SurveysCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {/* {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'rgb(12, 250, 180)' } : null}
                        className={ SurveysCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))} */}
                {/* {
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
                    className={ SurveysCSS.pagingBtn }
                >
                    &gt;
                </button>
                } */}
            </div>
        </div>
    );
}

export default Surveys;