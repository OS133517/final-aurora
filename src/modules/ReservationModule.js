import { createActions, handleActions } from 'redux-actions';

const initialState = {
    assetCategories : [],
    assets : [],
    reservations : [],
    reservation : [],
    reservationMessage : []
};

// 액션
export const GET_ASSET_CATEGORY = 'reservation/GET_ASSET_CATEGORY';
export const GET_ASSETS = 'reservation/GET_ASSETS';
export const GET_MY_RESERVATION = 'reservation/GET_MY_RESERVATION';
export const GET_RESERVATION = 'reservation/GET_RESERVATION';
export const PUT_RESERVATION = 'reservation/PUT_RESERVATION';
export const DELETE_RESERVATION = 'reservation/DELETE_RESERVATION';

// eslint-disable-next-line
const actions = createActions({
    [GET_ASSET_CATEGORY] : () => {},
    [GET_ASSETS] : () => {},
    [GET_MY_RESERVATION] : () => {},
    [GET_RESERVATION] : () => {},
    [PUT_RESERVATION] : () => {},
    [DELETE_RESERVATION] : () => {}
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
        }},
    [GET_MY_RESERVATION] : (state, { payload }) => {
        return {
            ...state,
            reservations : payload
        }},
    [GET_RESERVATION] : (state, { payload }) => {
        return {
            ...state,
            reservation : payload
        }},
    [PUT_RESERVATION] : (state, { payload }) => {
        return {
            ...state,
            reservationMessage : payload
        }},
    [DELETE_RESERVATION] : (state, { payload }) => {
        return {
            ...state,
            reservationMessage : payload
        }}
}, initialState);

export default reservationReducer;