import { createActions, handleActions } from 'redux-actions';

const initialState = {
    surveyResult : [],
    surveys : [],
    surveysForManagement : []
}

// 액션
export const POST_SURVEY = 'survey/POST_SURVEY';
export const GET_SURVEYS = 'survey/GET_SURVEYS';
export const GET_SURVEYS_FOR_MANAGEMENT = 'survey/GET_SURVEYS_FOR_MANAGEMENT';
export const GET_SURVEYS_SEARCH = 'survey/GET_SURVEYS_SEARCH';

// eslint-disable-next-line
const actions = createActions({
    [POST_SURVEY] : () => {},
    [GET_SURVEYS] : () => {},
    [GET_SURVEYS_FOR_MANAGEMENT] : () => {},
    [GET_SURVEYS_SEARCH] : () => {}
});

// 리듀서
const surveyReducer = handleActions({
    [POST_SURVEY] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }},
    [GET_SURVEYS] : (state, { payload }) => {
        return {
            ...state,
            surveys : payload
        }},
    [GET_SURVEYS_FOR_MANAGEMENT] : (state, { payload }) => {
        return {
            ...state,
            surveysForManagement : payload
        }},
    [GET_SURVEYS_SEARCH] : (state, { payload }) => {
        return {
            ...state,
            surveysForManagement : payload
        }}
}, initialState);

export default surveyReducer;