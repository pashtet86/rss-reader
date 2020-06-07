import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import TheLettersCounter from '../../TheLettersCounter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Message = ({ feedItem }) => {

  return (
    <div className={`message-details ${feedItem.title ? '' : 'no-data'}`}>

    <div className="message-details__header">
    <Chip icon={<Icon>face</Icon>} label={feedItem.creator} />
    </div>
    {feedItem.content && (
      <div>
        <TheLettersCounter text={feedItem.content} />
        <TransitionGroup>
          <CSSTransition key={feedItem.title} timeout={1000} classNames="slide">
            <div className="feed-item">
              <h1>{feedItem.title || ''}</h1>
              <div
                className="parsed-content"
                dangerouslySetInnerHTML={{ __html: feedItem.content }}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      )}
      {!feedItem.content && (
        <div>
          Content not found for <strong>{feedItem.title}</strong>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            href={feedItem.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open by link
          </Button>
        </div>
      )}
    </div>
  );
}

Message.propTypes = {
  feedItem: PropTypes.object,
};


export default Message;

