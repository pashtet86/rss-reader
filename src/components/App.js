import ChannelsList from "./views/ChannelsList/";
import RssFeed from "./views/rssFeed";
import Message from "./views/Message";
import Notifications from "./Notifications";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import {connect} from 'react-redux';

class App extends React.Component {

  render() {
    const { channelData, isFetching, selectedChannel, feedItem } = this.props;
    return (
      <div className="app-wrapper">

        <aside className="app-sidebar">
          <ChannelsList />
        </aside>

        <div className={`app-body ${feedItem.title ? 'collapsed' : ''}`}>
          <RssFeed
            channelData={channelData}
            isFetching={isFetching}
            selectedChannel={selectedChannel}
          />

          <Message feedItem={feedItem} />

        </div>

        <Notifications />

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  channelData: PropTypes.object,
  selectedChannel: PropTypes.object,
  feedItem: PropTypes.object,
  isFetching: PropTypes.bool
};


function mapStateToProps(state) {
  return {
    channelData: state.rssChannels.channelData,
    isFetching: state.rssChannels.isFetching,
    selectedChannel: state.rssChannels.selectedChannel,
    feedItem: state.rssChannels.currentFeedItem,
  };
}

export default connect(mapStateToProps)(hot(module)((App)));
