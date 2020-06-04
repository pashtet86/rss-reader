import React from 'react';
import { object, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

const ChannelItem = ({ channel, fetchSpecificFeed, selectedChannel }) => {

  const handleChannelClick = () => {
    fetchSpecificFeed(channel.id);
  };

  const imgUrl = channel.image || 'default-channel-img.png';

  return (
    <Card
      onClick={handleChannelClick}
      classes={{
        root: channel.id === selectedChannel.id ? 'active-channel' : '',
      }}
    >
      <CardActionArea>
        {/* TODO: refactor this -> public folder is NOT good solution */}
        <CardMedia
          component="div"
          image={require(`public/images/${imgUrl}`)}
          title="Contemplative Reptile"
        />

        <CardContent>{channel.name}</CardContent>
      </CardActionArea>
    </Card>
  );
};

ChannelItem.propTypes = {
  selectedChannel: object.isRequired,
  channel: object.isRequired,
  fetchSpecificFeed: func.isRequired,
};

export default ChannelItem;
