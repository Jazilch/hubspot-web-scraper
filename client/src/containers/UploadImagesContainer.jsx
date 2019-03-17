'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Results from '../components/Results';
import AppContext from '../components/AppContext';

class UploadImagesContainer extends Component {
  componentDidMount() {
    const { handleUpload, handleConfetti } = this.props;
    handleUpload();
    handleConfetti();
  }

  render() {
    const { imageStatus, confettiActive, error, loading } = this.props;
    return (
      <Results
        imageStatus={imageStatus}
        confettiActive={confettiActive}
        error={error}
        loading={loading}
      />
    );
  }
}

UploadImagesContainer.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  confettiActive: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  imageStatus: PropTypes.string.isRequired,
  handleConfetti: PropTypes.func.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <UploadImagesContainer
        {...props}
        imageStatus={context.imageStatus}
        confettiActive={context.confettiActive}
        error={context.error}
        loading={context.loading}
        handleUpload={context.handleUpload}
        handleConfetti={context.handleConfetti}
      />
    )}
  </AppContext.Consumer>
);
