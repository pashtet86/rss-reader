import ChannelsList from "./views/ChannelsList/";
import RssFeed from "./views/RssFeed";
import Notifications from "./Notifications";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import {connect} from 'react-redux';

class App extends React.Component {

  render() {
    const { channelData, isFetching } = this.props;
    return (
      <div className="app-wrapper">

        <aside className="app-sidebar">
          <ChannelsList />
        </aside>

        <div className="app-body">
          <RssFeed
            channelData={channelData}
            isFetching={isFetching}
          />
        </div>

        <Notifications />

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  channelData: PropTypes.object,
  isFetching: PropTypes.bool
};


function mapStateToProps(state) {
  return {
    channelData: state.rssChannels.channelData,
    isFetching: state.rssChannels.isFetching,
  };
}

export default connect(mapStateToProps)(hot(module)((App)));
