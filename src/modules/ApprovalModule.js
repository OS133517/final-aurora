import { createAction, handleActions } from "redux-actions";

// 초기값
const initialState = {
    approvalInfo: [],
    approvalLine: [],
    pendingList: [],
    draftapproval: [],
    draftapprovalLine: [],
    lineList: [],
    completedList: [],
    modifyLine: [],
    modifyStatus: []
};

// 액션 상수로 정의
export const GET_APPROVALCOUNT = 'approvals/GET_APPROVALCOUNT';
export const GET_APPROVALS = 'approvals/GET_APPROVALS';
export const GET_PENDING = 'approvals/GET_PENDING';
export const GET_COMPLETED = 'approvals/GET_COMPLETED';
export const GET_WAIT = 'approvals/GET_WAIT';
export const POST_APPROVALS = 'approvals/POST_APPROVALS';
export const PUT_APPROVALS = 'approvals/PUT_APPROVALS';
export const DETELE_APPROVALS = 'approvals/DETELE_APPROVALS';
export const GET_DETAIL = 'approvals/GET_DETAIL';
export const POST_APPROVALLINE = 'approvals/POST_APPROVALLINE';
export const PUT_APPROVALS_STATUS = 'approvals/PUT_APPROVALS_STATUS';

// eslint-disable-next-line
const actions = createAction({
    [GET_APPROVALCOUNT]: () => { },
    [GET_APPROVALS]: () => { },
    [GET_PENDING]: () => { },
    [GET_COMPLETED]: () => { },
    [POST_APPROVALS]: () => { },
    [PUT_APPROVALS]: () => { },
    [DETELE_APPROVALS]: () => { },
    [GET_DETAIL]: () => { },
    [POST_APPROVALLINE]: () => { },
    [GET_WAIT]: () => { },
    [PUT_APPROVALS_STATUS]: () => { }

});

// reducer
// 각 액션 타입에 대한 상태 변화를 처리하는 함수를 정의
const approvalReducer = handleActions(
    {
        [GET_APPROVALCOUNT]: (state, { payload }) => {

            return payload;
        },
        [GET_APPROVALS]: (state, { payload }) => {

            return {
                ...state,
                approvalInfo: payload
            };
        },
        [GET_PENDING]: (state, { payload }) => {

            return {
                ...state,
                pendingList: payload
            };
        },
        [GET_COMPLETED]: (state, { payload }) => {

            return {
                ...state,
                completedList: payload
            };
        },
        [POST_APPROVALS]: (state, { payload }) => {

            return {
                ...state,
                draftapproval: payload
            };
        },
        [PUT_APPROVALS]: (state, { payload }) => {

            return {
                ...state,
                modifyLine: payload
            };
        },
        [DETELE_APPROVALS]: (state, { payload }) => {

            return payload;
        },
        [GET_DETAIL]: (state, { payload }) => {

            return {
                ...state,
                approvalLine: payload
            }
        },
        [POST_APPROVALLINE]: (state, { payload }) => {

            return {
                ...state,
                draftapprovalLine: payload
            }
        },
        [GET_WAIT]: (state, { payload }) => {

            return {
                ...state,
                lineList: payload
            };
        },
        [PUT_APPROVALS_STATUS]: (state, { payload }) => {

            return {
                ...state,
                modifyStatus: payload
            }
        }

    },
    initialState
)

export default approvalReducer;