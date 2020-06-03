import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/RssListActions';

export class ChannelsListAddForm extends React.Component {
  constructor() {
    super();
    this.state = { channelUrl: '' };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeInput(event) {
    this.setState({ channelUrl: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const attemptToFetchChannel = await this.props.actions.getRssData(this.state.channelUrl);
    console.log(attemptToFetchChannel);
    if (attemptToFetchChannel) {  // TODO: refactor this
      const newChannel = {
        id: Math.floor(Math.random() * 100),
        url: attemptToFetchChannel.feedUrl,
        image: '',
        name: attemptToFetchChannel.title,
        // description:
      }
      this.props.actions.addChannel(newChannel);
    }

  }

  render() {
    return (
      <div className="channels-list">
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Input placeholder="Channel url" onChange={this.handleChangeInput} />
          <button type="submit">Add </button>
        </form>
      </div>
    );
  }
}

ChannelsListAddForm.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ChannelsListAddForm);

