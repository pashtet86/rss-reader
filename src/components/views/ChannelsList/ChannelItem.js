import React from 'react';
import { object, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';

const ChannelItem = ({ channel, fetchSpecificFeed, selectedChannel, removeItem }) => {

  const handleChannelClick = () => {
    fetchSpecificFeed(channel.id);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeItem(channel.id);
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
      <IconButton variant="contained" className="remove-btn" onClick={handleRemove}>
        <Icon fontSize="small" >delete</Icon>
      </IconButton>
    </Card>
  );
};

ChannelItem.propTypes = {
  selectedChannel: object.isRequired,
  channel: object.isRequired,
  fetchSpecificFeed: func.isRequired,
  removeItem: func.isRequired,
};

export default ChannelItem;
