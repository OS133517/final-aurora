import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {

    matchingMembers : [],
    isReportUpdated : false,
    isReportReplyUpdated : false,

    reportSummary : [],
    reportDetail : [],
    routineReportList : [],
    sideRoutineReportList : [],
    casualReportList : [],
    sideCasualReportList : [],
    registReportMessage : [],
    reportRoundData : [],
    reportRoundDetailData : [],
    reportDetailList : [],
    reportRoundReplyList : [],
};

// 액션
export const GET_MATCHING_MEMBERS = 'report/GET_MATCHING_MEMBERS';

export const GET_REPORT_SUMMARY = 'report/GET_REPORT_SUMMARY';
export const GET_REPORT_DETAIL = 'report/GET_REPORT_DETAIL';
export const GET_SIDE_ROUTINE_REPORT_LIST = 'report/GET_SIDE_ROUTINE_REPORT_LIST';
export const GET_SIDE_CASUAL_REPORT_LIST = 'report/GET_SIDE_CASUAL_REPORT_LIST';
export const GET_ROUTINE_REPORT_LIST_BY_CONDITIONS = 'report/GET_ROUTINE_REPORT_LIST_BY_CONDITIONS';
export const GET_CASUAL_REPORT_LIST_BY_CONDITIONS = 'report/GET_CASUAL_REPORT_LIST_BY_CONDITIONS';
export const GET_REPORT_ROUND_LIST = 'report/GET_REPORT_ROUND_LIST';
export const GET_REPORT_ROUND_DETAIL = 'report/GET_REPORT_ROUND_DETAIL';
export const GET_REPORT_DETAIL_LIST = 'report/GET_REPORT_DETAIL_LIST';
export const GET_REPORT_ROUND_REPLY_LIST = 'report/GET_REPORT_ROUND_REPLY_LIST';

export const POST_REPORT = 'report/POST_REGISTER_REPORT';
export const POST_REPORT_ROUND = 'report/POST_REPORT_ROUND';
export const POST_REPORT_ROUND_REPLY = 'report/POST_REGISTER_REPORT_ROUND_REPLY';
export const POST_REPORT_DETAIL = 'report/POST_REGISTER_REPORT_DETAIL';

export const PUT_REPORT = 'report/PUT_REPORT';
export const PUT_REPORT_ROUND = 'report/PUT_REPORT_ROUND';
export const PUT_REPORT_DETAIL = 'report/PUT_REPORT_DETAIL';
export const PUT_REPORT_ROUND_REPLY = 'report/PUT_REPORT_ROUND_REPLY';

export const DELETE_REPORT = 'report/DELETE_REPORT';
export const DELETE_REPORT_ROUND = 'report/DELETE_REPORT_ROUND';
export const DELETE_REPORT_DETAIL = 'report/DELETE_REPORT_DETAIL';
export const DELETE_REPORT_ROUND_REPLY = 'report/DELETE_REPORT_ROUND_REPLY';

export const UPDATE_REPORT_STATUS = "report/UPDATE_REPORT_STATUS";

export const updateReportStatus = (updated) => {

    return {

        type: UPDATE_REPORT_STATUS,
        payload: updated,
    };
};

// eslint-disable-next-line
const actions = createActions({

    [GET_MATCHING_MEMBERS] : () => {},

    [GET_REPORT_SUMMARY] : () => {},
    [GET_REPORT_DETAIL] : () => {},
    [GET_SIDE_ROUTINE_REPORT_LIST] : () => {},
    [GET_SIDE_CASUAL_REPORT_LIST] : () => {},
    [GET_ROUTINE_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_CASUAL_REPORT_LIST_BY_CONDITIONS] : () => {},
    [GET_REPORT_ROUND_LIST] : () => {},
    [GET_REPORT_ROUND_DETAIL] : () => {},
    [GET_REPORT_DETAIL_LIST] : () => {},
    [GET_REPORT_ROUND_REPLY_LIST] : () => {},

    [POST_REPORT] : () => {},
    [POST_REPORT_ROUND] : () => {},
    [POST_REPORT_DETAIL] : () => {},
    [POST_REPORT_ROUND_REPLY] : () => {},

    [PUT_REPORT] : () => {},
    [PUT_REPORT_ROUND] : () => {},
    [PUT_REPORT_DETAIL] : () => {},
    [PUT_REPORT_ROUND_REPLY] : () => {},
    
    [DELETE_REPORT] : () => {},
    [DELETE_REPORT_ROUND] : () => {},
    [DELETE_REPORT_DETAIL] : () => {},
    [DELETE_REPORT_ROUND_REPLY] : () => {},
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
    [GET_REPORT_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            reportDetail : payload
        }},
    [GET_SIDE_ROUTINE_REPORT_LIST] : (state, { payload }) => {
        return {
            ...state,
            sideRoutineReportList : payload
        }},
    [GET_SIDE_CASUAL_REPORT_LIST] : (state, { payload }) => {
        return {
            ...state,
            sideCasualReportList : payload
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
    [GET_REPORT_ROUND_REPLY_LIST] : (state, { payload }) => {
        return {
            ...state,
            reportRoundReplyList : payload
        }},

    [POST_REPORT] : (state, { payload }) => {
        return {
            ...state,
            registReportMessage : payload,
        }},
    [POST_REPORT_ROUND] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload,
        }},
    [POST_REPORT_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload,
        }},
    [POST_REPORT_ROUND_REPLY] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload,
        }},
        
    [PUT_REPORT] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [PUT_REPORT_ROUND] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [PUT_REPORT_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [PUT_REPORT_ROUND_REPLY] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},

    [DELETE_REPORT] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [DELETE_REPORT_ROUND] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [DELETE_REPORT_DETAIL] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},
    [DELETE_REPORT_ROUND_REPLY] : (state, { payload }) => {
        return {
            ...state,
            isReportUpdated : payload
        }},

    [UPDATE_REPORT_STATUS]: (state, { payload }) => {
        return {
            ...state,
            isReportListUpdated: payload,
        }},
}, initialState);

export default reportReducer;