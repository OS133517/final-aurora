import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {

    matchingMembers : [],

    reportSummary : [],
    routineReportList : [],
    casualReportList : [],
    registReportMessage : [],
    reportRoundData : [],
    reportRoundDetailData : [],
    reportDetailList : []
};

// 액션
export const GET_MATCHING_MEMBERS = 'report/GET_MATCHING_MEMBERS';

export const GET_REPORT_SUMMARY = 'report/GET_REPORT_SUMMARY';
export const GET_ROUTINE_REPORT_LIST_BY_CONDITIONS = 'report/GET_ROUTINE_REPORT_LIST_BY_CONDITIONS';
export const GET_CASUAL_REPORT_LIST_BY_CONDITIONS = 'report/GET_CASUAL_REPORT_LIST_BY_CONDITIONS';
export const GET_REPORT_ROUND_LIST = 'report/GET_REPORT_ROUND_LIST';
export const GET_REPORT_ROUND_DETAIL = 'report/GET_REPORT_ROUND_DETAIL';
export const GET_REPORT_DETAIL_LIST = 'report/GET_REPORT_DETAIL_LIST';

export const POST_REGISTER_REPORT = 'report/POST_REGISTER_REPORT';

// eslint-disable-next-line
const actions = createActions({

    [GET_MATCHING_MEMBERS] : () => {},
    [GET_REPORT_SUMMARY] : () => {},
    [GET_ROUTINE_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_CASUAL_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_REPORT_ROUND_LIST] : () => {},
    [GET_REPORT_ROUND_DETAIL] : () => {},
    [GET_REPORT_DETAIL_LIST] : () => {},

    [POST_REGISTER_REPORT] : () => {}
});

// 리듀서
const reportReducer = handleActions({

    [GET_MATCHING_MEMBERS] : (state, { payload }) => {
        return {
            ...state,
            matchingMembers : payload
        }},
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
    [GET_REPORT_ROUND_LIST] : (state, { payload }) => {
        return {
            ...state,
            reportRoundData : payload
        }},
    [GET_REPORT_ROUND_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            reportRoundDetailData : payload
        }},
    [GET_REPORT_DETAIL_LIST] : (state, { payload }) => {
        return {
            ...state,
            reportDetailList : payload
        }},


    [POST_REGISTER_REPORT] : (state, { payload }) => {
        return {
            ...state,
            registReportMessage : payload
        }}
}, initialState);

export default reportReducer;