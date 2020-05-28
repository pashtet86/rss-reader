import * as types from './actionTypes';
import rssParser from 'rss-parser';

export function setRssChannel(channel) {
  return function (dispatch) {
    console.log(channel);

    return dispatch({
      type: types.SAVE_RSS_LIST,
      channel
    });
  };
}

export function setLoadingState(loadingState) {
  return function (dispatch) {
    return dispatch({
      type: types.TOGGLE_LOADING_STATE,
      isFetching: loadingState,
    });
  };
}

export function getRssData(url) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({
        type: types.SET_RSS_DATA,
        payload: success,
        isFetching: false,
      });
      dispatch({
        type: types.SET_NOTIFICATION,
        notification: {
          type: 'success',
          message: `successfully fetched ${success.title}`,
        },
      });
      return success;
    }
    function onError(error) {
      // throw new Error(error);
      dispatch({
        type: types.SET_NOTIFICATION,
        notification: {
          type: 'error',
          message: 'Unable to fetch RSS feed',
        },
      });
      return error;
    }
    try {
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      let parser = new rssParser();
      const responce = await parser.parseURL(`${CORS_PROXY}${url}`);
      return onSuccess(responce);
    } catch (error) {
      return onError(error);
    }
  }

}

