import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {
    addresses : [],
    personalGroups : [],
    teamGroups : [],
    groupMessage : [],
    // groupRegistMessage : [],
    // groupDeleteMessage : [],
    // groupUpdateMessage : [],
    addBookRegistMessage : [],
    addBookDeleteMessage : [],
    addBookUpdateMessage : [],
    memberToGroupMessage : []
};

// 액션
export const GET_ALL_MEMBER_ADDRESSES = 'addBook/GET_ALL_MEMBER_ADDRESSES';
export const GET_PERSONAL_GROUP = 'addBook/GET_PERSONAL_GROUP';
export const GET_TEAM_GROUP = 'addBook/GET_TEAM_GROUP';
export const GET_GROUP_ADDRESSES = 'addBook/GET_GROUP_ADDRESSES';
export const POST_GROUP_REGIST = 'addBook/POST_GROUP_REGIST';
export const POST_ADD_BOOK_REGIST = 'addBook/POST_ADD_BOOK_REGIST';
export const DELETE_ADD_BOOK_DELETE = 'addBook/DELETE_ADD_BOOK_DELETE';
export const GET_MEMBER_SEARCH = 'addBook/GET_MEMBER_SEARCH';
export const GET_GROUP_SEARCH = 'addBook/GET_GROUP_SEARCH';
export const POST_MEMBER_TO_GROUP = 'addBook/POST_MEMBER_TO_GROUP';
export const DELETE_GROUP = 'addBook/DELETE_GROUP';
export const PUT_GROUP = 'addBook/PUT_GROUP';

// eslint-disable-next-line
const actions = createActions({
    [GET_ALL_MEMBER_ADDRESSES] : () => {},
    [GET_PERSONAL_GROUP] : () => {},
    [GET_TEAM_GROUP] : () => {},
    [GET_GROUP_ADDRESSES] : () => {},
    [POST_GROUP_REGIST] : () => {},
    [POST_ADD_BOOK_REGIST] : () => {},
    [DELETE_ADD_BOOK_DELETE] : () => {},
    [GET_MEMBER_SEARCH] : () => {},
    [GET_GROUP_SEARCH] : () => {},
    [POST_MEMBER_TO_GROUP] : () => {},
    [DELETE_GROUP] : () => {},
    [PUT_GROUP] : () => {}
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
            // groupRegistMessage : payload
            groupMessage : payload
        }},
    [POST_ADD_BOOK_REGIST] : (state, { payload }) => {
        return {
            ...state,
            addBookRegistMessage : payload
        }},
    [DELETE_ADD_BOOK_DELETE] : (state, { payload }) => {
        return {
            ...state,
            addBookDeleteMessage : payload
        }},
    [GET_MEMBER_SEARCH] : (state, { payload }) => {
        return {
            ...state,
            addresses : payload
        }},
    [GET_GROUP_SEARCH] : (state, { payload }) => {
        return {
            ...state,
            addresses : payload
        }},
    [POST_MEMBER_TO_GROUP] : (state, { payload }) => {
        return {
            ...state,
            memberToGroupMessage : payload
        }},
    [DELETE_GROUP] : (state, { payload }) => {
        return {
            ...state,
            // groupDeleteMessage : payload
            groupMessage : payload
        }},
    [PUT_GROUP] : (state, { payload }) => {
        return {
            ...state,
            // groupUpdateMessage : payload
            groupMessage : payload
        }}
}, initialState);

export default addBookReducer;