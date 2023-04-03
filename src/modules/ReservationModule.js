import { createActions, handleActions } from 'redux-actions';

const initialState = {
    assetCategories : [],
    assets : [],
    reservations : [],
    reservation : [],
    reservationMessage : [],
    reservationsByDate : [],
    memberInfo : [],
    assetsForManagement : []
};

// 액션
export const GET_ASSET_CATEGORY = 'reservation/GET_ASSET_CATEGORY';
export const GET_ASSETS = 'reservation/GET_ASSETS';
export const GET_MY_RESERVATION = 'reservation/GET_MY_RESERVATION';
export const GET_RESERVATION = 'reservation/GET_RESERVATION';
export const PUT_RESERVATION = 'reservation/PUT_RESERVATION';
export const DELETE_RESERVATION = 'reservation/DELETE_RESERVATION';
export const GET_RESERVATIONS = 'reservation/GET_RESERVATIONS';
export const GET_RESERVATIONS_BY_DATE = 'reservation/GET_RESERVATIONS_BY_DATE';
export const GET_MEMBER_INFO = 'reservation/GET_MEMBER_INFO';
export const POST_RESERVATION = 'reservation/POST_RESERVATION';
export const GET_ASSETS_FOR_MANAGEMENT = 'reservation/GET_ASSETS_FOR_MANAGEMENT';

// eslint-disable-next-line
const actions = createActions({
    [GET_ASSET_CATEGORY] : () => {},
    [GET_ASSETS] : () => {},
    [GET_MY_RESERVATION] : () => {},
    [GET_RESERVATION] : () => {},
    [PUT_RESERVATION] : () => {},
    [DELETE_RESERVATION] : () => {},
    [GET_RESERVATIONS] : () => {},
    [GET_RESERVATIONS_BY_DATE] : () => {},
    [GET_MEMBER_INFO] : () => {},
    [POST_RESERVATION] : () => {},
    [GET_ASSETS_FOR_MANAGEMENT] : () => {}
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
        }},
    [GET_RESERVATIONS] : (state, { payload }) => {
        return {
            ...state,
            reservations : payload
        }},
    [GET_RESERVATIONS_BY_DATE] : (state, { payload }) => {
        return {
            ...state,
            reservationsByDate : payload
        }},
    [GET_MEMBER_INFO] : (state, { payload }) => {
        return {
            ...state,
            memberInfo : payload
        }},
    [POST_RESERVATION] : (state, { payload }) => {
        return {
            ...state,
            reservationMessage : payload
        }},
    [GET_ASSETS_FOR_MANAGEMENT] : (state, { payload }) => {
        return {
            ...state,
            assetsForManagement : payload
        }}
}, initialState);

export default reservationReducer;