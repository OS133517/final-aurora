import { createAction, handleActions } from "redux-actions";

// 초기값
const initialState = {
    approvalInfo :  [],
    approvalLine : [] ,
    pendingList : []
};

// 액션 상수로 정의
export const GET_APPROVALCOUNT = 'approvals/GET_APPROVALCOUNT';
export const GET_APPROVALS = 'approvals/GET_APPROVALS';
export const GET_PENDING = 'approvals/GET_PENDING';
export const GET_COMPLETED = 'approvals/GET_COMPLETED';
export const POST_APPROVALS = 'approvals/POST_APPROVALS';
export const PUT_APPROVALS = 'approvals/PUT_APPROVALS';
export const DETELE_APPROVALS = 'approvals/DETELE_APPROVALS';
export const GET_DETAIL = 'approvals/GET_DETAIL';

// eslint-disable-next-line
const actions = createAction({
    [GET_APPROVALCOUNT] : () => {},
    [GET_APPROVALS] : () => {},
    [GET_PENDING] : () => {},
    [GET_COMPLETED] : () => {},
    [POST_APPROVALS] : () => {},
    [PUT_APPROVALS] : () => {},
    [DETELE_APPROVALS] : () => {},
    [GET_DETAIL] : () => {}

});

// reducer
// 각 액션 타입에 대한 상태 변화를 처리하는 함수를 정의
const approvalReducer = handleActions(
    {
        [GET_APPROVALCOUNT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVALS]: (state, { payload }) => {

            return  {
                ...state,
                approvalInfo : payload
            } 
        },
        [GET_PENDING]: (state, { payload }) => {

            return {
                ...state,
                pendingList : payload
            } 
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
        },
        [GET_DETAIL]: (state, { payload }) => {

            return {
                ...state,
                approvalLine: payload
            }
        }

    },
    initialState
)

export default approvalReducer;