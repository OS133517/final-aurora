import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {
    addresses : [],
    personalGroups : [],
    teamGroups : [],
    resultMessage : []
};

// 액션
export const GET_ALL_MEMBER_ADDRESSES = 'addBook/GET_ALL_MEMBER_ADDRESSES';
export const GET_PERSONAL_GROUP = 'addBook/GET_PERSONAL_GROUP';
export const GET_TEAM_GROUP = 'addBook/GET_TEAM_GROUP';
export const GET_GROUP_ADDRESSES = 'addBook/GET_GROUP_ADDRESSES';
export const POST_GROUP_REGIST = 'addBook/POST_GROUP_REGIST';

const actions = createActions({
    [GET_ALL_MEMBER_ADDRESSES] : () => {},
    [GET_PERSONAL_GROUP] : () => {},
    [GET_TEAM_GROUP] : () => {},
    [GET_GROUP_ADDRESSES] : () => {},
    [POST_GROUP_REGIST] : () => {}
});

// 리듀서
const addBookReducer = handleActions({
    [GET_ALL_MEMBER_ADDRESSES] : (state, { payload }) => { 
        return {
            ...state,
            addresses : payload
        }},
    [GET_PERSONAL_GROUP] : (state, { payload }) => {
        return {
            ...state,
            personalGroups : payload
        }},
    [GET_TEAM_GROUP] : (state, { payload }) => {
        return {
            ...state,
            teamGroups : payload
        }},
    [GET_GROUP_ADDRESSES] : (state, { payload }) => {
        return {
            ...state,
            addresses : payload
        }},
    [POST_GROUP_REGIST] : (state, { payload }) => {
        return {
            ...state,
            resultMessage : payload
        }}
}, initialState);

export default addBookReducer;