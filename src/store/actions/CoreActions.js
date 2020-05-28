import * as types from './actionTypes';

export function setRssChannel(notification) {
  return function (dispatch) {
    return dispatch({
      type: types.SET_NOTIFICATION,
      notification
    });
  };
}


