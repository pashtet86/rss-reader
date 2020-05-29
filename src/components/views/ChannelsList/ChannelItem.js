import React from 'react';
import { object, func, array } from 'prop-types';
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
    return (
      <Card onClick={this.handleRssItemClick} classes={{ root: 'my-class-name' }}>
        <CardActionArea>
          <CardMedia
            component="div"
            image={
              require(`public/images/${this.props.channel.image}`)
            }
            title="Contemplative Reptile"
          />

          <CardContent>
            {this.props.channel.name}
          </CardContent>

        </CardActionArea>
      </Card>
  );}
}

ChannelItem.propTypes = {
  actions: object.isRequired,
  channel: object.isRequired,
  // onChoose: func.isRequired,
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
