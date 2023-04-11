

import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    vacationRegister: [],
    vacationUse: [],

};

// 액션
export const POST_VACATION = 'vacation/POST_VACATION';
export const POST_VACATION_USE = 'vacation/POST_VACATION_USE';
export const PUT_VACATION = 'vacation/PUT_VACATION';


// eslint-disable-next-line
const actions = createActions({
    [POST_VACATION]: () => { },
    [POST_VACATION_USE]: () => { },
    [PUT_VACATION]: () => { }

});

// 리듀서
const vacationReducer = handleActions({
    [POST_VACATION]: (state, { payload }) => {
        return {
            ...state,
            vacationRegister: payload
        }
    },
    [POST_VACATION_USE]: (state, { payload }) => {
        return {
            ...state,
            vacationUse: payload
        }
    },
    [PUT_VACATION]: (state, { payload }) => {
        return {
            ...state,
            vacationDay: payload
        }
    }

}, initialState)

export default vacationReducer;


