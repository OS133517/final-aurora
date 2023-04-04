import { createActions, handleActions } from 'redux-actions';

const initialState = {
    calendar : []
};

export const GET_SCHEDULE_MONTH = 'calendar/GET_SCHEDULE_MONTH';

const actions = createActions({
    [GET_SCHEDULE_MONTH] : () => {}

});

const scheduleReducer = handleActions(
    {
        [GET_SCHEDULE_MONTH] : (state, { payload }) => {

            return {
               ...state,
               calendar : payload 
            }
        },

    },
    initialState
);

export default scheduleReducer;