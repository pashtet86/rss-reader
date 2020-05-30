import * as types from './actionTypes';

export function setNotification(notification) {
  return function (dispatch) {
    return dispatch({
      type: types.SET_NOTIFICATION,
      notification
    });
  };
}


