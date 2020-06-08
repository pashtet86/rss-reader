import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createBrowserHistory } from "history";
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import throttle from 'lodash.throttle';
import { saveState, loadState } from './localStorage';

export const history = createBrowserHistory();
const connectRouterHistory = connectRouter(history);

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  const persistedState = loadState();

  const store =  createStore(
    createRootReducer(history), // root reducer with router state
    {...initialState, ...persistedState},
    compose(applyMiddleware(...middlewares))
  );

  store.subscribe(
    throttle(() => {
      saveState({
        // save channles object module but cut massive feed item TODO: PERFORMANCE! -> refactor this
        rssChannels: {
          ...store.getState().rssChannels,
          currentFeedItem: {},
          channelData: {
            items: [],
          },
        },
      });
    }, 1000)
  );

  return store;
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  const persistedState = loadState();
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    {...initialState, ...persistedState},
    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.subscribe(
    throttle(() => {
      saveState({
        // save channles object module but cut massive feed item TODO: PERFORMANCE! -> refactor this
        rssChannels: {
          ...store.getState().rssChannels,
          currentFeedItem: {},
          channelData: {
            items: [],
          },
        },
      });
    }, 1000)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(connectRouterHistory(nextRootReducer));
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
