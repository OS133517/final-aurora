
import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    messengerList: [],
    memberDetail: []
};

// 액션
export const GET_LIST = 'messenger/GET_LIST';
export const GET_DETAIL = 'messenger/GET_DETAIL';

// eslint-disable-next-line
const actions = createActions({
    [GET_LIST]: () => { },
    [GET_DETAIL]: () => { }

});

// 리듀서
const messengerReducer = handleActions({

    [GET_LIST]: (state, { payload }) => {
        return {
            ...state,
            messengerList: payload
        }
    },
    [GET_DETAIL]: (state, { payload }) => {
        return {
            ...state,
            memberDetail: payload
        }
    }


}, initialState)

export default messengerReducer;


