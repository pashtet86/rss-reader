import { SAVE_RSS_LIST, SET_RSS_DATA } from '../actions/actionTypes';
import objectAssign from 'object-assign';
import initialState from '../initialState';

export default function fuelSavingsReducer(state = initialState.rssChannels, action) {
  let newState;

  switch (action.type) {
    case SAVE_RSS_LIST:
       newState = objectAssign({}, state);
       newState.selectedChannel = action.channel;
       return newState;

    case SET_RSS_DATA:
       newState = objectAssign({}, state);
       newState.channelData = action.payload;
       return newState;

    default:
      return state;
  }
}
