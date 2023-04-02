import { createActions, handleActions } from 'redux-actions';

const initialState = {
    dayWorklog : [],
    dayWorklogInsert : []
};

export const GET_DAY_WORKLOG = 'dayWorklog/GET_DAY_WORKLOG';
export const GET_DAY_WORKLOGS = 'dayWorklog/GET_DAY_WORKLOGS';
export const POST_DAY_WORKLOG = 'dayWorklogInsert/POST_DAY_WORKLOG';

const actions = createActions({
    [GET_DAY_WORKLOG] : () => {},
    [GET_DAY_WORKLOGS] : () => {},
    [POST_DAY_WORKLOG] : () => {}
});

const dayWorklogReducer = handleActions(
    {
        [GET_DAY_WORKLOG] : (state, { payload }) => {

            return {
               ...state,
                dayWorklog : payload 
            }
        },

        [GET_DAY_WORKLOGS] : (state, { payload }) => {
            
            return {
                ...state,
                dayWorklog : payload
            }
        },

        [POST_DAY_WORKLOG] : (state, {payload }) => {

            return {
                ...state,
                dayWorklogInsert : payload
            }
        }
    },
    initialState
);

export default dayWorklogReducer;