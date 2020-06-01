import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../store/actions/RssListActions';
import CircularProgress from '@material-ui/core/CircularProgress';

export class rssFeed extends React.Component  {

  constructor() {
    super();
    this.openMessage = this.openMessage.bind(this);
  }

  openMessage(content) {
    const { actions } = this.props;
    actions.setCurrentFeedItem(content);
  }

  render() {
    const { isFetching, selectedChannel, channelData } = this.props;
    const feedTitleText = channelData.items.length ? channelData.title : 'Please select a RSS channel to load feed';

    return (
      <div className="feed-section">
        {isFetching && selectedChannel &&
          <div className="loading-progress">
            <CircularProgress
              size={80}
              variant="indeterminate"
            />
          </div>
        }

        <div className="feed-section__info">
          {feedTitleText}
        </div>

        <List>
          {channelData.items.map((item, index) => (
            <div key={ index }>
              <ListItem
                item={item}
                openMessage={this.openMessage}
              />
            </div>
          ))}
        </List>

      </div>
    );
  }
}

rssFeed.propTypes = {
  actions: PropTypes.object.isRequired,
  channelData: PropTypes.object,
  selectedChannel: PropTypes.object,
  isFetching: PropTypes.bool,
  opennFeedItem: PropTypes.func
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
)(rssFeed);

