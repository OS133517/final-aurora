import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    memberLogin: [],
    memberList: [],
    memberDetail: [],
    memberInfo : []
};

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
export const GET_LIST = 'member/GET_LIST';
export const GET_DETAIL = 'member/GET_DETAIL';
export const GET_MEMEBER_INFO = 'member/GET_MEMEBER_INFO';

// eslint-disable-next-line
const actions = createActions({
    [POST_LOGIN]: () => { },
    [GET_LIST]: () => { },
    [GET_DETAIL]: () => { },
    [GET_MEMEBER_INFO] : () => {}
});

// 리듀서
const memberReducer = handleActions({
    [POST_LOGIN]: (state, { payload }) => {
        return {
            ...state,
            memberLogin: payload
        }
    },
    [GET_LIST]: (state, { payload }) => {
        return {
            ...state,
            memberList: payload
        }
    },
    [GET_DETAIL]: (state, { payload }) => {
        return {
            ...state,
            memberLogin : payload
        }},
        [GET_MEMEBER_INFO] : (state, { payload }) => {
            return {
                ...state,
                memberInfo : payload
        }}
}, initialState)

export default memberReducer;


