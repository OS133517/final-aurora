import { createActions, handleActions } from 'redux-actions';

const initialState = {
    calendar : [],
    schedule : [],
    scheduleDetail : []
    
};

export const GET_MY_SCHEDULE = 'scheule/GET_MY_SCHEDULE';
export const GET_SCHEDULE = 'schedule/GET_SCHEDULE';
export const POST_SCHEDULE = 'scheduleInsert/POST_SCHEDULE';
export const PUT_SCHEDULE = 'scheuleUpdate/PUT_SCHEDULE';
export const DELETE_SCHEDULE = 'scheduleDelete/DELETE_SCHEDULE';

const actions = createActions({
    [GET_MY_SCHEDULE] : () => {},
    [GET_SCHEDULE] : () => {},
    [POST_SCHEDULE] : () => {},
    [PUT_SCHEDULE] : () => {},
    [DELETE_SCHEDULE] : () => {}

});

const scheduleReducer = handleActions(
    {
        [GET_MY_SCHEDULE] : (state, { payload }) => {

            return {
               ...state,
               calendar : payload 
            }
        },

        [GET_SCHEDULE] : (state, { payload }) => {

            return {
               ...state,
               scheduleDetail : payload 
            }
        },

        [POST_SCHEDULE] : (state, { payload }) => {

            return {
               ...state,
               calendar : payload 
            }
        },

        [PUT_SCHEDULE] : (state, { payload }) => {

            return {
               ...state,
               calendar : payload 
            }
        },

        [DELETE_SCHEDULE] : (state, { payload }) => {

            return {
                ...state,
                calendar : payload
            }
        }
    },
    initialState
);

export default scheduleReducer;