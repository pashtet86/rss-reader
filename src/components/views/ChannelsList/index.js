import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as coreActions from '../../../store/actions/CoreActions';
import * as actions from '../../../store/actions/RssListActions';
import ChannelItem from './ChannelItem';
import ChannelsListAddForm from './ChannelsListAddForm';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class channelsList extends React.Component {
  constructor() {
    super();
    this.state = {
      showStatistics: false,
    };
    this.fetchSpecificFeed = this.fetchSpecificFeed.bind(this);
  }

  handleChange = () => {
    this.props.coreActions.toggleStatistics();
  };

  fetchSpecificFeed(channelId) {
    const { actions, rssChannels } = this.props;
    actions.setCurrentRssChannel(channelId);
    const channelItem = rssChannels.find(ch => ch.id === parseInt(channelId, 10));
    actions.getRssData(channelItem.url);
    // clear feedItem
    actions.setCurrentFeedItem({});
  }

  render() {
    const {
      rssChannels,
      isFetching,
      actions,
      selectedChannel,
      showStatistics,
    } = this.props;
    return (
      <>
        <div className="statistics-switcher">
          <FormControlLabel
            control={
              <Switch
                value={showStatistics}
                name="showStatistics"
                onChange={this.handleChange}
                color="primary"
              />
            }
            label="Show statistic"
          />
        </div>
        <div className={`channels-list ${showStatistics ? 'show-statistic' : ''}`}>
          <ChannelsListAddForm actions={actions} isFetching={isFetching} />
          {rssChannels.map((channel) => (
            <ChannelItem
              key={channel.name}
              channel={channel}
              selectedChannel={selectedChannel}
              fetchSpecificFeed={this.fetchSpecificFeed}
            />
          ))}
          <div className="channels-list__footer">
            Channels: {rssChannels.length}
          </div>
        </div>
      </>
    );
  }
}

channelsList.propTypes = {
  actions: PropTypes.object.isRequired,
  coreActions: PropTypes.object.isRequired,
  selectedChannel: PropTypes.object.isRequired,
  rssChannels: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showStatistics: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    rssChannels: state.rssChannels.list,
    isFetching: state.rssChannels.isFetching,
    selectedChannel: state.rssChannels.selectedChannel,
    showStatistics: state.core.showStatistics
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    coreActions: bindActionCreators(coreActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(channelsList);

