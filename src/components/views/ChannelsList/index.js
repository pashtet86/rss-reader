import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/RssListActions';
import ChannelItem from './ChannelItem';
import ChannelsListAddForm from './ChannelsListAddForm';

export class ChannelsList extends React.Component {
  constructor() {
    super();
    this.fetchSpecificFeed = this.fetchSpecificFeed.bind(this);
  }

  fetchSpecificFeed(channelId) {
    const { actions, rssChannels } = this.props;
    actions.setCurrentRssChannel(channelId);
    const channelItem = rssChannels.find(ch => ch.id === parseInt(channelId, 10));
    actions.getRssData(channelItem.url);
    // clear feedItem
    actions.setCurrentFeedItem({});
  }

  render() {
    const { rssChannels, isFetching, actions, selectedChannel } = this.props;
    return (
      <div className="channels-list">
        <ChannelsListAddForm
          actions={actions}
          isFetching={isFetching}
        />
        {rssChannels.map((channel) => (
          <ChannelItem
            key={channel.name}
            channel={channel}
            selectedChannel={selectedChannel}
            fetchSpecificFeed={this.fetchSpecificFeed}
          />
        ))}
      </div>
    );
  }
}

ChannelsList.propTypes = {
  actions: PropTypes.object.isRequired,
  selectedChannel: PropTypes.object.isRequired,
  rssChannels: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    rssChannels: state.rssChannels.list,
    isFetching: state.rssChannels.isFetching,
    selectedChannel: state.rssChannels.selectedChannel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsList);

