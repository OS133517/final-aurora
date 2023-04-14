import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {

    alertList : [],
    isAlertUpdated : false,
};

// 액션
export const GET_ALERT_LIST = 'alert/GET_ALERT_LIST';

// export const POST_MAIL = 'alert/POST_MAIL';

// export const DELETE_MAIL = 'alert/DELETE_MAIL';

// eslint-disable-next-line
const actions = createActions({

    [GET_ALERT_LIST] : () => {},

    // [POST_MAIL] : () => {},

    // [DELETE_MAIL] : () => {},
});

// 리듀서
const alertReducer = handleActions({

    [GET_ALERT_LIST] : (state, { payload }) => {
        return {
            ...state,
            alertList : payload
        }},

    // [POST_BLACKLIST] : (state, { payload }) => {
    //     return {
    //         ...state,
    //         isBlackListUpdated : payload
    //     }},
        
    // [DELETE_BLACKLIST] : (state, { payload }) => {
    //     return {
    //         ...state,
    //         isBlackListUpdated : payload
    //     }},
}, initialState);

export default alertReducer;