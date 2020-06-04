import { SET_NOTIFICATION, TOGGLE_STATISTICS } from '../actions/actionTypes';
import initialState from '../initialState';

export default function coreReducer(state = initialState.core, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
       return { ...state, notification: action.notification };

    case TOGGLE_STATISTICS:
       return { ...state, showStatistics: !state.showStatistics };

    default:
      return state;
  }
}
