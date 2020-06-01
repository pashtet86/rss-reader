import { SAVE_CURRENT_CHANNEL, SET_RSS_DATA, TOGGLE_LOADING_STATE, SAVE_CURRENT_MESSAGE } from '../actions/actionTypes';
import objectAssign from 'object-assign';
import initialState from '../initialState';

export default function rssListReducer(state = initialState.rssChannels, action) {
  let newState;

  switch (action.type) {
    case TOGGLE_LOADING_STATE:
      newState = objectAssign({}, state);
      newState.isFetching = action.isFetching;
      return newState;

    case SAVE_CURRENT_CHANNEL:
      newState = objectAssign({}, state);
      newState.selectedChannel = action.channel;
      return newState;

    case SAVE_CURRENT_MESSAGE:
      newState = objectAssign({}, state);
      newState.currentFeedItem = action.feedItem;
      return newState;

    case SET_RSS_DATA:
      newState = objectAssign({}, state);
      newState.channelData = action.payload;
      newState.isFetching = action.isFetching;
      return newState;

    default:
      return state;
  }
}
