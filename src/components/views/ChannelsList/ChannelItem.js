import React from 'react';
import { object, array } from 'prop-types';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import * as actions from '../../../store/actions/RssListActions';
import {bindActionCreators} from 'redux';

class ChannelItem extends React.Component {

  handleRssItemClick = () => {
    this.fetchSpecificFeed()
  }

  fetchSpecificFeed() {
    const { id } = this.props.channel;
    const channel = this.props.rssChannels.find(ch => ch.id === parseInt(id, 10));
    this.props.actions.setRssChannel(channel);
    this.props.actions.setLoadingState(true);
    this.props.actions.getRssData(channel.url);
  }

  render() {
    const { handleRssItemClick } = this;
    const { channel } = this.props;

    return (
      <Card onClick={handleRssItemClick} classes={{ root: 'active' }}>
        <CardActionArea>
          <CardMedia
            component="div"
            image={`/${channel.image}`}
            title="Contemplative Reptile"
          />

          <CardContent>
            {channel.name}
          </CardContent>

        </CardActionArea>
      </Card>
  );}
}

ChannelItem.propTypes = {
  actions: object.isRequired,
  channel: object.isRequired,
  rssChannels: array.isRequired,
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
)(ChannelItem);
