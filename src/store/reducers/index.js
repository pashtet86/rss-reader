import { combineReducers } from 'redux';
import core from './coreReducer';
import rssChannels from './rssListReducer';

import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  core,
  rssChannels
});

export default rootReducer;
