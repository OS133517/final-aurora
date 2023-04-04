import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    memberLogin : []
};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_MEMEBER_INFO = 'member/GET_MEMEBER_INFO';
// eslint-disable-next-line
const actions = createActions({
    [GET_MEMEBER_INFO] : () => {},
    [POST_LOGIN] : () => {}
});

// 리듀서
const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => {
        return {
            ...state,
            memberLogin : payload
        }},
        [GET_MEMEBER_INFO] : (state, { payload }) => {
            return payload
            }
}, initialState)

export default memberReducer;


