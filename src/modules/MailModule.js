import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {

    mailData : [],
    mailDetail : [],
    tagList : [],
    blackList : [],

    isMailUpdated : false,
    isTagUpdated : false,
    isBlackListUpdated : false,
};

// 액션
export const GET_MAILS = 'mail/GET_MAILS';
export const GET_NEW_MAILS = 'mail/GET_NEW_MAILS';
export const GET_MAIL_DETAIL = 'mail/GET_MAIL_DETAIL';
export const GET_TAGS = 'mail/GET_TAGS';
export const GET_BLACKLIST = 'mail/GET_BLACKLIST';

export const POST_MAIL = 'mail/POST_MAIL';
export const POST_MAIL_TAGS = 'mail/POST_MAIL_TAGS';
export const POST_TAGS = 'mail/POST_TAGS';
export const POST_BLACKLIST = 'mail/POST_BLACKLIST';

export const PUT_IMPORTANT_STATUS = 'mail/PUT_IMPORTANT_STATUS';
export const PUT_TAGS = 'mail/PUT_TAGS';

export const DELETE_MAIL = 'mail/DELETE_MAIL';
export const DELETE_MAIL_FOREVER = 'mail/DELETE_FOREVER_MAIL';
export const DELETE_TAGS = 'mail/DELETE_TAGS';
export const DELETE_BLACKLIST = 'mail/DELETE_BLACKLIST';

// eslint-disable-next-line
const actions = createActions({

    [GET_MAILS] : () => {},
    [GET_NEW_MAILS] : () => {},
    [GET_MAIL_DETAIL] : () => {},
    [GET_TAGS] : () => {},
    [GET_BLACKLIST] : () => {},

    [POST_MAIL] : () => {},
    [POST_MAIL_TAGS] : () => {},
    [POST_TAGS] : () => {},
    [POST_BLACKLIST] : () => {},

    [PUT_IMPORTANT_STATUS] : () => {},
    [PUT_TAGS] : () => {},

    [DELETE_MAIL] : () => {},
    [DELETE_MAIL_FOREVER] : () => {},
    [DELETE_TAGS] : () => {},
    [DELETE_BLACKLIST] : () => {},
});

// 리듀서
const mailReducer = handleActions({

    [GET_MAILS] : (state, { payload }) => {
        return {
            ...state,
            mailData : payload
        }},
    [GET_NEW_MAILS] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [GET_MAIL_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            mailDetail : payload
        }},
    [GET_TAGS] : (state, { payload }) => {
        return {
            ...state,
            tagList : payload
        }},
    [GET_BLACKLIST] : (state, { payload }) => {
        return {
            ...state,
            blackList : payload
        }},

    [POST_MAIL] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [POST_MAIL_TAGS] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [POST_TAGS] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [POST_BLACKLIST] : (state, { payload }) => {
        return {
            ...state,
            isBlackListUpdated : payload
        }},
        
    [PUT_IMPORTANT_STATUS] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [PUT_TAGS] : (state, { payload }) => {
        return {
            ...state,
            isTagUpdated : payload
        }},
        
    [DELETE_MAIL_FOREVER] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [DELETE_MAIL] : (state, { payload }) => {
        return {
            ...state,
            isMailUpdated : payload
        }},
    [DELETE_TAGS] : (state, { payload }) => {
        return {
            ...state,
            isTagUpdated : payload
        }},
    [DELETE_BLACKLIST] : (state, { payload }) => {
        return {
            ...state,
            isBlackListUpdated : payload
        }},
}, initialState);

export default mailReducer;