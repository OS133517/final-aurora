

import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    varctionDay: [],

};

// 액션
export const PUT_VACATION = 'vacation/PUT_VACATION';


// eslint-disable-next-line
const actions = createActions({
    [PUT_VACATION]: () => { }

});

// 리듀서
const vacationReducer = handleActions({
    [PUT_VACATION]: (state, { payload }) => {
        return {
            ...state,
            varctionDay: payload
        }
    }

}, initialState)

export default vacationReducer;


