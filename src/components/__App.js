/* eslint-disable import/no-named-as-default */
// import { Route } from "react-router-dom";
// import { CSSTransition } from 'react-transition-group';
import ChannelsList from "./views/ChannelsList/";
import DetailsPage from "./views/RssBody";
// import HomePage from "./HomePage";
import PropTypes from "prop-types";
import React from "react";
// import {
//   List,
//   ListItem,
//   Icon,
// } from '@material-ui/core';
import { hot } from "react-hot-loader";


// const routes = [
//   {
//     path: '/',
//     name: 'RSS list',
//     icon: 'list',
//     Component: ChannelsList
//   },
//   {
//     path: '/about',
//     name: 'RSS list',
//     icon: 'rss_feed',
//     Component: HomePage
//   },
//   {
//     path: '/channels/:channelId',
//     name: 'details',
//     icon: 'card',
//     Component: DetailsPage
//   },
// ]

class App extends React.Component {

  render() {
    return (
      <div className="app-wrapper">

        <aside className="app-sidebar">
          <ChannelsList>

          </ChannelsList>
          {/* <List>
            {routes.map((route) => (
              <ListItem button component={NavLink} to={route.path} exact key={route.path}>
                <Icon>{route.icon}</Icon>
                {route.name}
              </ListItem>
            ))}
          </List> */}

        </aside>

        <div className="app-sidebar__container">
            <DetailsPage></DetailsPage>
        </div>
        {/* <div className="app-sidebar__container">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <div className="page-view">
                    <Component match={match} />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div> */}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
