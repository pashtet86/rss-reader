import * as types from './actionTypes';

export function setNotification(notification) {
  return function (dispatch) {
    return dispatch({
      type: types.SET_NOTIFICATION,
      notification
    });
  };
}

export function toggleStatistics() {
  return function (dispatch) {
    return dispatch({
      type: types.TOGGLE_STATISTICS,
    });
  };
}


