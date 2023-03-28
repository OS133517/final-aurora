import { createActions, handleActions } from 'redux-actions';

const initialState = {
    assets : []
};

// 액션
export const GET_ASSETS = 'reservation/GET_ASSETS';

// eslint-disable-next-line
const actions = createActions({
    [GET_ASSETS] : () => {}
});

// 리듀서
const reservationReducer = handleActions({
    [GET_ASSETS] : (state, { payload }) => {
        return {
            ...state,
            assets : payload
        }}
}, [initialState]);

export default reservationReducer;