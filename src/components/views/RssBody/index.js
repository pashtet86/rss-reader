import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { List, ListItem, Chip } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

export class rssBody extends React.Component {

  render() {
    return (
      <div>
        {this.props.isFetching &&
          <div className="loading-progress">
            <CircularProgress size={80} variant="indeterminate" />
          </div>
        }
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
  channelData: PropTypes.object,
  isFetching: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    channelData: state.rssChannels.channelData,
    isFetching: state.rssChannels.isFetching
  };
}


export default connect(
  mapStateToProps,
)(rssBody);

