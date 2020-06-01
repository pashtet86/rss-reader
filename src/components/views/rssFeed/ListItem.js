import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Chip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

const rssFeed = ({ item, openMessage }) => {

  const handleChannelClick = () => {
    openMessage(item);
  }

  return (
    <ListItem component="div" button divider alignItems="flex-start" onClick={handleChannelClick}>
      <ListItemText
        primary={item.title}
        secondary={moment(item.pubDate).format('YYYY-MM-DD HH:mm')}
      />
      {item.author &&
        <Chip label={item.author} />
      }
    </ListItem>

  );
}

rssFeed.propTypes = {
  item: PropTypes.object,
  openMessage: PropTypes.func,
};


export default rssFeed;

