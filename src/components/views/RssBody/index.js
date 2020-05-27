import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/RssListActions';
import { List, ListItem, Chip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';

export class rssBody extends React.Component {
  changeRssChannel = (channel) => {
    this.props.actions.setRssChannel(channel);
  }

  componentDidMount() {
    const { channelId } = this.props.match.params;
    const channel = this.props.rssChannels.find(ch => ch.id === parseInt(channelId, 10));
    this.props.actions.getRssData(channel.url);
  }

  render() {
    return (
      <div>
        <h1>DetailsPage</h1>
        <List>
          {this.props.channelData.items.map((item) => (
            <div key={ item.id }>
              <ListItem component="a" button divider target="_blank" href={item.link} alignItems="flex-start" >
                <ListItemText
                  primary={item.title}
                  secondary={item.pubDate}
                />
                <Chip
                  // icon={<Icon>face</Icon>}
                  label={item.author}
                />

              </ListItem>

            </div>
          ))}
        </List>

      </div>
    );
  }
}

rssBody.propTypes = {
  actions: PropTypes.object.isRequired,
  rssChannels: PropTypes.array.isRequired,
  channelData: PropTypes.object,
  match: PropTypes.object
};

function mapStateToProps(state) {
  return {
    rssChannels: state.rssChannels.list,
    channelData: state.rssChannels.channelData
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
)(rssBody);

