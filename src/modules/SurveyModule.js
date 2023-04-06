import { createActions, handleActions } from 'redux-actions';

const initialState = {
    surveyResult : []
}

// 액션
export const POST_SURVEY = 'survey/POST_SURVEY';

// eslint-disable-next-line
const actions = createActions({
    [POST_SURVEY] : () => {}
});

// 리듀서
const surveyReducer = handleActions({
    [POST_SURVEY] : (state, { payload }) => {
        return {
            ...state,
            surveyResult : payload
        }}
}, initialState);

export default surveyReducer;