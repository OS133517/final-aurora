import { createActions, handleActions } from 'redux-actions';

const initialState = {
    surveyResult : [],
    surveys : [],
    surveysForManagement : [],
    survey : [],
    surveyReply : []
}

// 액션
export const POST_SURVEY = 'survey/POST_SURVEY';
export const GET_SURVEYS = 'survey/GET_SURVEYS';
export const GET_SURVEYS_FOR_MANAGEMENT = 'survey/GET_SURVEYS_FOR_MANAGEMENT';
export const GET_SURVEYS_SEARCH = 'survey/GET_SURVEYS_SEARCH';
export const POST_SURVEY_REPLY = 'survey/POST_SURVEY_REPLY';
export const DELETE_SURVEYS = 'survey/DELETE_SURVEYS';
export const GET_SURVEY = 'survey/GET_SURVEY';
export const PUT_SURVEY = 'survey/PUT_SURVEY';
export const DELETE_QUESTIONS = 'survey/DELETE_QUESTIONS';
export const GET_SURVEY_REPLY_DETAIL = 'survey/GET_SURVEY_REPLY_DETAIL';
export const INIT_ACTION = 'survey/INIT_ACTION';

// eslint-disable-next-line
const actions = createActions({
    [POST_SURVEY] : () => {},
    [GET_SURVEYS] : () => {},
    [GET_SURVEYS_FOR_MANAGEMENT] : () => {},
    [GET_SURVEYS_SEARCH] : () => {},
    [POST_SURVEY_REPLY] : () => {},
    [DELETE_SURVEYS] : () => {},
    [GET_SURVEY] : () => {},
    [PUT_SURVEY] : () => {},
    [DELETE_QUESTIONS] : () => {},
    [GET_SURVEY_REPLY_DETAIL] : () => {},
    [INIT_ACTION] : () => {}
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
        }},
    [POST_SURVEY_REPLY] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }},
    [DELETE_SURVEYS] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }},
    [GET_SURVEY] : (state, { payload }) => {
        return {
            ...state,
            survey : payload
        }},
    [PUT_SURVEY] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }},
    [DELETE_QUESTIONS] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }},
    [GET_SURVEY_REPLY_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            surveyReply : payload
        }},
    [INIT_ACTION] : (state, { payload }) => {
        return {
            ...state,
            surveyReply : payload
        }}
}, initialState);

export default surveyReducer;