import { createActions, handleActions } from 'redux-actions';

const initialState = {
    assetCategories : [],
    assets : []
};

// 액션
export const GET_ASSET_CATEGORY = 'reservation/GET_ASSET_CATEGORY';
export const GET_ASSETS = 'reservation/GET_ASSETS';

// eslint-disable-next-line
const actions = createActions({
    [GET_ASSET_CATEGORY] : () => {},
    [GET_ASSETS] : () => {}
});

// 리듀서
const reservationReducer = handleActions({
    [GET_ASSET_CATEGORY] : (state, { payload }) => {
        return {
            ...state,
            assetCategories : payload
        }},
    [GET_ASSETS] : (state, { payload }) => {
        return {
            ...state,
            assets : payload
        }}
}, [initialState]);

export default reservationReducer;