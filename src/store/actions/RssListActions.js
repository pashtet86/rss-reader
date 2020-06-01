import * as types from './actionTypes';
import rssParser from 'rss-parser';


export function setCurrentRssChannel(channel, loadingState) {
  return function (dispatch) {
    dispatch({
      type: types.SAVE_CURRENT_CHANNEL,
      channel
    });

    dispatch({
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
          message: `Successfully fetched ${success.title} feed`,
        },
      });
      return success;
    }

    function onError(error) {
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
      const parser = new rssParser();
      const responce = await parser.parseURL(`${CORS_PROXY}${url}`);
      return onSuccess(responce);
    } catch (error) {
      return onError(error);
    }
  }

}

export function setCurrentFeedItem(feedItem) {
  return function (dispatch) {
    return dispatch({
      type: types.SAVE_CURRENT_MESSAGE,
      feedItem
    });
  };
}