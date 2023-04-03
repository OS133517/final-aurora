import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {

    reportSummary : [],
    routineReportList : [],
    casualReportList : [],
    matchingMembers : [],
    registReportMessage : []
};

// 액션
export const GET_REPORT_SUMMARY = 'report/GET_REPORT_SUMMARY';
export const GET_ROUTINE_REPORT_LIST_BY_CONDITIONS = 'report/GET_ROUTINE_REPORT_LIST_BY_CONDITIONS';
export const GET_CASUAL_REPORT_LIST_BY_CONDITIONS = 'report/GET_CASUAL_REPORT_LIST_BY_CONDITIONS';
export const POST_REGISTER_REPORT = 'report/POST_REGISTER_REPORT';

export const GET_MATCHING_MEMBERS = 'report/GET_MATCHING_MEMBERS';

// eslint-disable-next-line
const actions = createActions({

    [GET_REPORT_SUMMARY] : () => {},
    [GET_ROUTINE_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_CASUAL_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_MATCHING_MEMBERS] : () => {},
    [POST_REGISTER_REPORT] : () =>{}
});

// 리듀서
const reportReducer = handleActions({

    [GET_REPORT_SUMMARY] : (state, { payload }) => {
        return {
            ...state,
            reportSummary : payload
        }},
    [GET_ROUTINE_REPORT_LIST_BY_CONDITIONS] : (state, { payload }) => {
        return {
            ...state,
            routineReportList : payload
        }},
    [GET_CASUAL_REPORT_LIST_BY_CONDITIONS] : (state, { payload }) => {
        return {
            ...state,
            casualReportList : payload
        }},
    [GET_MATCHING_MEMBERS] : (state, { payload }) => {
        return {
            ...state,
            matchingMembers : payload
        }},
    [POST_REGISTER_REPORT] : (state, { payload }) => {
        return {
            ...state,
            registReportMessage : payload
        }},

}, initialState);

export default reportReducer;