import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = [];

// 액션
export const GET_ALL_MEMBER_ADDRESSES = 'addBook/GET_ALL_MEMBER_ADDRESSES';
export const GET_PERSONAL_GROUP = 'addBook/GET_PERSONAL_GROUP';

const actions = createActions({
    [GET_ALL_MEMBER_ADDRESSES] : () => {},
    [GET_PERSONAL_GROUP] : () => {}
});

// 리듀서
const addBookReducer = handleActions({
    [GET_ALL_MEMBER_ADDRESSES] : (state, { payload }) => payload,
    [GET_PERSONAL_GROUP] : (state, { payload }) => payload
}, initialState);

export default addBookReducer;