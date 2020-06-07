import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
class Notifications extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification.message !== this.props.notification.message) {
      this.setState({ opened: true })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ opened: false });
  };

  render() {
    const { notification } = this.props;
    return (
      <Snackbar open={ this.state.opened } autoHideDuration={3000} onClose={this.handleClose}>
        <Alert severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
    );
  }
}

Notifications.propTypes = {
  notification: object
};

function mapStateToProps(state) {
  return {
    notification: state.core.notification
  };
}

export default connect(
  mapStateToProps,
)(Notifications);

