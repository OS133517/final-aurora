import { createActions, handleActions } from 'redux-actions';

const initialState = {
    surveyResult : [],
    surveys : []
}

// 액션
export const POST_SURVEY = 'survey/POST_SURVEY';
export const GET_SURVEYS = 'survey/GET_SURVEYS';

// eslint-disable-next-line
const actions = createActions({
    [POST_SURVEY] : () => {},
    [GET_SURVEYS] : () => {}
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
        }}
}, initialState);

export default surveyReducer;