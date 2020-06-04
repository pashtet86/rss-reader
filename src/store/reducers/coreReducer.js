import { SET_NOTIFICATION } from '../actions/actionTypes';
import initialState from '../initialState';

export default function coreReducer(state = initialState.core, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
       return { ...state, notification: action.notification };

    default:
      return state;
  }
}
