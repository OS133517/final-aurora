import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    memberLogin : []
};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
// eslint-disable-next-line
const actions = createActions({
    [POST_LOGIN] : () => {}
});

// 리듀서
const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => {
        return {
            ...state,
            memberLogin : payload
        }}
}, initialState)

export default memberReducer;


