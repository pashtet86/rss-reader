import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Message = ({ feedItem }) => {

  // if (feedItem.content) {
  //   return <div dangerouslySetInnerHTML={{ __html: feedItem.content }} />
  // } else {
  //   return <Button variant="contained" color="primary" href={feedItem.link} rel="noopener noreferrer">Open in new tab</Button>
  // }

  return (
    <div className={`message-details ${feedItem.title ? '' : 'no-data'}`}>
      {feedItem.content &&
        <div className="parsed-content" dangerouslySetInnerHTML={{ __html: feedItem.content }} />
      }
      {!feedItem.content &&
        <div>
        Content not found for <strong>{feedItem.title}</strong>
        <br/>
        <br/>
          <Button
            variant="contained"
            color="primary"
            href={feedItem.link}
            target="_blank"
            rel="noopener noreferrer"
          >Open by link</Button>

        </div>
      }

    </div>
  );
}

Message.propTypes = {
  feedItem: PropTypes.object,
};


export default Message;

