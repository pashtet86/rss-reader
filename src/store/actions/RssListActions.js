import * as types from './actionTypes';
import rssParser from 'rss-parser';

export function setRssChannel(channel) {
  return function (dispatch) {
    return dispatch({
      type: types.SAVE_RSS_LIST,
      channel
    });
  };
}

export function getRssData(url) {

  return async dispatch => {
    function onSuccess(success) {
      dispatch({
        type: types.SET_RSS_DATA,
        payload: success
      });
      return success;
    }
    function onError(error) {
      throw new Error(error);
      // dispatch({
      //   type: types.SET_RSS_DATA,
      //   error
      // });
      // return error;
    }
    try {
      console.log(url);

      const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

      let parser = new rssParser();
      const responce = await parser.parseURL(`${CORS_PROXY}${url}`);
      // console.log(responce);
      return onSuccess(responce);
    } catch (error) {
      return onError(error);
    }
  }

}

