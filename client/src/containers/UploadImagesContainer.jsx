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
    const { imageStatus, error, loading } = this.props;
    return <Results imageStatus={imageStatus} error={error} loading={loading} />;
  }
}

UploadImagesContainer.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  imageStatus: PropTypes.string.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <UploadImagesContainer
        {...props}
        imageStatus={context.imageStatus}
        error={context.error}
        loading={context.loading}
        handleUpload={context.handleUpload}
      />
    )}
  </AppContext.Consumer>
);
