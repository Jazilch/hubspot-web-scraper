'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Results from '../components/Results';
import AppContext from '../components/AppContext';

class UploadImagesContainer extends Component {
  componentDidMount() {
    const { handleUpload } = this.props;
    handleUpload();
  }

  render() {
    const { uploadDone, confettiActive, error, loading } = this.props;
    return (
      <Results
        uploadDone={uploadDone}
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
  uploadDone: PropTypes.bool.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <UploadImagesContainer
        {...props}
        uploadDone={context.uploadDone}
        error={context.error}
        loading={context.loading}
        handleUpload={context.handleUpload}
      />
    )}
  </AppContext.Consumer>
);
