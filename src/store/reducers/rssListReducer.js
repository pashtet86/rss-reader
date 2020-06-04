import { SAVE_CURRENT_CHANNEL, SET_RSS_DATA, TOGGLE_LOADING_STATE, ADD_CHANNEL, SAVE_CURRENT_MESSAGE } from '../actions/actionTypes';
import initialState from '../initialState';

export default function rssListReducer(state = initialState.rssChannels, action) {

  switch (action.type) {
    case ADD_CHANNEL:
      return {
        ...state,
        list: [action.channel, ...state.list],
      };

    case TOGGLE_LOADING_STATE:
      return { ...state, isFetching: action.isFetching };

    case SAVE_CURRENT_CHANNEL:
      return { ...state, selectedChannel : action.channel};

    case SAVE_CURRENT_MESSAGE:
      return { ...state, currentFeedItem: action.feedItem };

    case SET_RSS_DATA:
      return {
        ...state,
        channelData: action.payload,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
}
