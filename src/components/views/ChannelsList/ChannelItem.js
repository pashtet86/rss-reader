import React from 'react';
import { object, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

 const ChannelItem = ({channel, fetchSpecificFeed}) => {

  const handleChannelClick = () => {
    fetchSpecificFeed(channel.id);
  }

  return (
    <Card onClick={handleChannelClick} classes={{ root: 'my-class-name' }}>
      <CardActionArea>
        <CardMedia
          component="div"
          image={
            require(`public/images/${channel.image}`)
          }
          title="Contemplative Reptile"
        />

        <CardContent>
          {channel.name}
        </CardContent>

      </CardActionArea>
    </Card>
  );
}

ChannelItem.propTypes = {
  channel: object.isRequired,
  fetchSpecificFeed: func.isRequired,
};

export default ChannelItem;
