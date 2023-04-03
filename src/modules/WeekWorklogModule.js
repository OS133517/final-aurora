import { createActions, handleActions } from 'redux-actions';

const initialState = {
    weekWorklog : []
};

export const GET_WEEK_WORKLOG = 'weekWorklog/GET_WEEK_WORKLOG';
export const GET_WEEK_WORKLOGS = 'weekWorklog/GET_WEEK_WORKLOGS';
export const POST_WEEK_WORKLOG = 'weekWorklog/POST_WEEK_WORKLOG';
export const PUT_WEEK_WORKLOG = 'weekWorklog/PUT_WEEK_WORKLOG';
export const DELETE_WEEK_WORKLOG = 'weekWorklog/DELETE_WEEK_WORKLOG';

const actions = createActions({
    [GET_WEEK_WORKLOG] : () => {},
    [GET_WEEK_WORKLOGS] : () => {},
    [POST_WEEK_WORKLOG] : () => {},
    [PUT_WEEK_WORKLOG] : () => {},
    [DELETE_WEEK_WORKLOG] : () => {}
});

const weekWorklogReducer = handleActions(
    {
        [GET_WEEK_WORKLOG] : (state, { payload }) => {

            return {
               ...state,
                weekWorklog : payload 
            }
        },

        [GET_WEEK_WORKLOGS] : (state, { payload }) => {

            return {
               ...state,
                weekWorklog : payload 
            }
        },

        [POST_WEEK_WORKLOG] : (state, { payload }) => {

            return {
               ...state,
                weekWorklog : payload 
            }
        },

        [PUT_WEEK_WORKLOG] : (state, { payload }) => {

            return {
               ...state,
                weekWorklog : payload 
            }
        },

        [DELETE_WEEK_WORKLOG] : (state, { payload }) => {

            return {
               ...state,
                weekWorklog : payload 
            }
        },
    },
    initialState
);

export default weekWorklogReducer;