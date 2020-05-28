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


  // const [open, setOpen] = React.useState(!!notification.message);

  // React.useEffect(() => {
  //   setOpen(!!notification.message);
  //   console.log('useEffect');

  // });

  componentDidUpdate(prevProps) {
    // console.log(prevProps.notification.message);
    // console.log(this.props.notification.message);
    console.log(this.state.opened);


    if (prevProps.notification.message !== this.props.notification.message) {
      // this.fetchData(this.props.userID);
      this.setState({ opened: true })
    }

    console.log(this.state.opened);

  }

  handleClose = (event, reason) => {
    console.log('closed');

    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
    this.setState({ opened: false });
    console.log(this.state.opened);

  };

  render() {
    return (
      <Snackbar open={this.state.opened } autoHideDuration={2000} onClose={this.handleClose}>
        <Alert severity={this.props.notification.type}>
          {this.props.notification.message}
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

