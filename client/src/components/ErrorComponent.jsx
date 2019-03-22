'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorComponent extends Component {
  errorSwitch = status => {
    switch (status) {
      case 400:
        return "Check your slug. Doesn't seem to match HubSpot";
      case 401:
        return "You're not authorized for this portal";
      case 500:
        return 'Woah server error';
      default:
        return 'Idk, it broke ❎';
    }
  };

  render() {
    const { error } = this.props;
    const status = error && error.response.status;
    return <React.Fragment>{this.errorSwitch(status)}</React.Fragment>;
  }
}

ErrorComponent.propTypes = {
  error: PropTypes.objectOf(PropTypes.object || PropTypes.string)
};

export default ErrorComponent;
