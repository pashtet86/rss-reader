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
    // this.state = { channel: '' };

    this.fetchSpecificFeed = this.fetchSpecificFeed.bind(this);
  }

  fetchSpecificFeed(channelId) {
    const { actions, rssChannels } = this.props;
    const channelItem = rssChannels.find(ch => ch.id === parseInt(channelId, 10));
    actions.setCurrentRssChannel(channelItem, true);
    actions.getRssData(channelItem.url);
    // clear feedItem
    actions.setCurrentFeedItem({});

  }

  render() {
    return (
      <div className="channels-list">
        <ChannelsListAddForm actions={this.props.actions} />
        {this.props.rssChannels.map((channel) => (
          <ChannelItem
            key={channel.name}
            channel={channel}
            fetchSpecificFeed={this.fetchSpecificFeed}
          />
        ))}
      </div>
    );
  }
}

ChannelsList.propTypes = {
  actions: PropTypes.object.isRequired,
  rssChannels: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    rssChannels: state.rssChannels.list
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

