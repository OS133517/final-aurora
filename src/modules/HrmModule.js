import { createActions, handleActions } from 'redux-actions';

const initialState = {
    memberList : [],
    memberDetail : [],
    memberSignUp : [],
    memberModify : [],
    memberMessage : [],
    code : [],
}

export const GET_MEMBER_LIST = 'hrm/GET_MEMBER_LIST';
export const GET_MEMBER_DETAIL = 'hrm/GET_MEMBER_DETAIL';
export const PUT_MEMBER_MODIFY = 'hrm/PUT_MEMBER_MODIFY';
export const POST_MEMBER_SIGN_UP = 'hrm/POST_MEMBER_SIGN_UP';
export const GET_NAME_SEARCH = 'hrm/GET_NAME_SEARCH';
export const GET_EMAIL_SEARCH = 'hrm/GET_EMAIL_SEARCH';
export const GET_DEPT_SEARCH = 'hrm/GET_DEPT_SEARCH';
export const GET_JOB_SEARCH = 'hrm/GET_JOB_SEARCH';
export const GET_TASK_SEARCH = 'hrm/GET_TASK_SEARCH';
export const GET_CODE ='hrm/GET_CODE';

const actions = createActions({
    [GET_MEMBER_LIST] : () => {},
    [GET_MEMBER_DETAIL] : () => {},
    [PUT_MEMBER_MODIFY] : () => {},
    [POST_MEMBER_SIGN_UP] : () => {},
    [GET_NAME_SEARCH] : () => {},
    [GET_EMAIL_SEARCH] : () => {},
    [GET_DEPT_SEARCH] : () => {},
    [GET_JOB_SEARCH] : () => {},
    [GET_TASK_SEARCH] : () => {},
    [GET_CODE] : () => {}

});

const hrmReducer = handleActions({

    [GET_MEMBER_LIST] : (state, { payload }) => { 
       

        return {
            ...state,
            memberList : payload
        }},
    // [GET_MEMBER_LIST] : (state , { payLoad }) => {

    //     console.log(payLoad);
    //     return {
    //         ...state,
    //         allMemberList : payLoad
    //     }},
    [GET_MEMBER_DETAIL] : (state , { payload }) => {
        console.log('payload', payload);
        return {
            ...state,
            memberDetail : payload
        }},
    [PUT_MEMBER_MODIFY] : (state , { payload }) => {
        return {
            ...state,
            memberMessage : payload
        }},  
    [POST_MEMBER_SIGN_UP] : (state , { payload }) => {
        console.log(payload);
        return {
            ...state,
            memberMessage : payload
        }},
    [GET_NAME_SEARCH] : (state , { payload }) => {
        console.log(payload);
        return {
            ...state,
            memberList : payload
        }},
    [GET_EMAIL_SEARCH] : (state , { payload }) => {
        return {
            ...state,
            memberList : payload
        }},     
    [GET_DEPT_SEARCH] : (state , { payload }) => {
        return {
            ...state,
            memberList : payload
        }},   
    [GET_JOB_SEARCH] : (state , { payload }) => {
        return {
            ...state,
            memberList : payload
        }},
    [GET_TASK_SEARCH] : (state , { payload }) => {
        return {
            ...state,
            memberList : payload
        }},                     
    [GET_CODE] : (state , {payload}) => {
        console.log(payload);
        return {
            ...state,
            code : payload
        }} 
        
}, initialState);

export default hrmReducer;