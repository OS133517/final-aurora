import { createActions, handleActions } from 'redux-actions';

const initialState = {
    calendar : []
};

export const GET_MY_SCHEDULE = 'calendar/GET_MY_SCHEDULE';
export const GET_SCHEDULE = 'calendar/GET_SCHEDULE';
export const POST_SCHEDULE = 'calendar/POST_SCHEDULE';

const actions = createActions({
    [GET_MY_SCHEDULE] : () => {},
    [GET_SCHEDULE] : () => {},
    [POST_SCHEDULE] : () => {}

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
               calendar : payload 
            }
        },

        [POST_SCHEDULE] : (state, { payload }) => {

            return {
               ...state,
               calendar : payload 
            }
        } 

    },
    initialState
);

export default scheduleReducer;