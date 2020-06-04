import * as types from './actionTypes';
import rssParser from 'rss-parser';

export function setCurrentFeedItem(feedItem) {
  return function (dispatch) {
    return dispatch({
      type: types.SAVE_CURRENT_MESSAGE,
      feedItem,
    });
  };
}

export function addChannel(channel) {
  return function (dispatch) {
    dispatch({
      type: types.ADD_CHANNEL,
      channel
    });
  };
}

export function setCurrentRssChannel(channel) {
  return function (dispatch) {
    dispatch({
      type: types.SAVE_CURRENT_CHANNEL,
      channel
    });
  };
}

export function getRssData(url) {
  return async dispatch => {

    dispatch({
      type: types.TOGGLE_LOADING_STATE,
      isFetching: true,
    });

    function onSuccess(success) {
      dispatch({
        type: types.SET_RSS_DATA,
        payload: success,
        isFetching: false,
      });

      dispatch({
        type: types.TOGGLE_LOADING_STATE,
        isFetching: false,
      });

      dispatch({
        type: types.SET_NOTIFICATION,
        notification: {
          type: 'success',
          message: `Successfully fetched ${success.title} feed`,
        },
      });
      return success;
    }

    function onError(error) {
      console.log(error);
      dispatch({
        type: types.SET_NOTIFICATION,
        notification: {
          type: 'error',
          message: 'Unable to fetch RSS feed',
        },
      });
      dispatch({
        type: types.TOGGLE_LOADING_STATE,
        isFetching: false,
      });
      return false;
    }

    try {
      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      const parser = new rssParser();
      const responce = await parser.parseURL(`${CORS_PROXY}${url}`);
      return onSuccess(responce);
    } catch (error) {
      return onError(error);
    }
  }

}
