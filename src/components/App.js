import ChannelsList from "./views/ChannelsList/";
import DetailsPage from "./views/RssBody";
import Notifications from "./Notifications";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component {

  render() {
    return (
      <div className="app-wrapper">

        <aside className="app-sidebar">
          <ChannelsList />
        </aside>

        <div className="app-body">
          <DetailsPage />
        </div>

        <Notifications />


      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
