import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelsListAddForm = ({actions, isFetching}) => {

  const DEFAULT_URL = 'https://css-tricks.com/feed/';
  const [channelUrl, setChannelUrl] = React.useState(DEFAULT_URL);
  const [open, setOpen] = React.useState(false);

  const handleChangeInput = (event) => {
    setChannelUrl(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChannelUrl('');
  };

  const createChannelObject = (feedUrl, title) => {
    return {
      id: Math.floor(Math.random() * 1000),
      url: feedUrl,
      image: '',
      name: title,
      // description:
    };
  }

  const handleSubmit = async (event) => {
    // TODO: need add validation, check for already added channel
    event.preventDefault();
    const channelInfo = await actions.getRssData(channelUrl);

    if (channelInfo) {  // TODO: refactor this
      const { feedUrl, title } = channelInfo;
      const newChannel = createChannelObject(feedUrl, title);

      actions.addChannel(newChannel); // TODO: use parent's method
      actions.setCurrentRssChannel(newChannel.id);
      setOpen(false);
      setChannelUrl('');
    }
  }

  return (
    <div className="add-new-channel-form">
      <Button
        variant="outlined"
        className="add-new-channel-form__btn"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<Icon>add</Icon>}
      >Add new channel</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {isFetching &&
          <div className="loading-overlay">
            <CircularProgress
              size={80}
              variant="indeterminate"
            />
          </div>
        }
        <DialogTitle id="alert-dialog-title">{"Enter new RSS channel url"}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Channel url"
              placeholder="ex: https://css-tricks.com/feed/"
              onChange={handleChangeInput}
              value={channelUrl}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!channelUrl.length}
          >Add </Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

ChannelsListAddForm.propTypes = {
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ChannelsListAddForm;

