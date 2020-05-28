import { SET_NOTIFICATION } from '../actions/actionTypes';
import objectAssign from 'object-assign';
import initialState from '../initialState';

export default function coreReducer(state = initialState.core, action) {
  let newState;

  switch (action.type) {
    case SET_NOTIFICATION:
      // console.log(action);

       newState = objectAssign({}, state);
       newState.notification = action.notification;
       return newState;

    default:
      return state;
  }
}
