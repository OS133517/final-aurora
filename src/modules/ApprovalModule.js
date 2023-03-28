import { createAction, handleActions } from "redux-actions";

// 초기값
const initialState = {
    detailapproval :  [],
    approvalLine : []
};

// 액션
export const GET_APPROVALCOUNT = 'approvals/GET_APPROVALCOUNT';
export const GET_APPROVALS = 'approvals/GET_APPROVALS';
export const GET_PENDING = 'approvals/GET_PENDING';
export const GET_COMPLETED = 'approvals/GET_COMPLETED';
export const POST_APPROVALS = 'approvals/POST_APPROVALS';
export const PUT_APPROVALS = 'approvals/PUT_APPROVALS';
export const DETELE_APPROVALS = 'approvals/DETELE_APPROVALS';

// eslint-disable-next-line
const actions = createAction({
    [GET_APPROVALCOUNT] : () => {},
    [GET_APPROVALS] : () => {},
    [GET_PENDING] : () => {},
    [GET_COMPLETED] : () => {},
    [POST_APPROVALS] : () => {},
    [PUT_APPROVALS] : () => {},
    [DETELE_APPROVALS] : () => {}

});

// reducer
const approvalReducer = handleActions(
    {
        [GET_APPROVALCOUNT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVALS]: (state, { payload }) => {

            return payload;
        },
        [GET_PENDING]: (state, { payload }) => {

            return payload;
        },
        [GET_COMPLETED]: (state, { payload }) => {

            return payload;
        },
        [POST_APPROVALS]: (state, { payload }) => {

            return payload;
        },
        [PUT_APPROVALS]: (state, { payload }) => {

            return payload;
        },
        [DETELE_APPROVALS]: (state, { payload }) => {

            return payload;
        }

    },
    initialState
)

export default approvalReducer;