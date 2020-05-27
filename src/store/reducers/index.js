import { combineReducers } from 'redux';
import rssChannels from './rssListReducer';

import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  rssChannels
});

export default rootReducer;
