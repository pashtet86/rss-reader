import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Chip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const rssFeed = ({ isFetching, channelData }) => {

  return (
    <div>
      {isFetching &&
        <div className="loading-progress">
          <CircularProgress
            size={80}
            variant="indeterminate"
          />
        </div>
      }
      <List>
        {channelData.items.map(({link, title, pubDate, author}, index) => (
          <div key={ index }>
            <ListItem component="a" button divider target="_blank" href={link} alignItems="flex-start" >

              <ListItemText
                primary={title}
                secondary={pubDate}
              />
              <Chip label={author} />

            </ListItem>

          </div>
        ))}
      </List>

    </div>
  );
}

rssFeed.propTypes = {
  channelData: PropTypes.object,
  isFetching: PropTypes.bool
};

export default rssFeed;

