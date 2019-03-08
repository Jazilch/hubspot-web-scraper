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
    const { imageStatus, loading } = this.props;
    return <Results imageStatus={imageStatus} loading={loading} />;
  }
}

UploadImagesContainer.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  imageStatus: PropTypes.string.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <UploadImagesContainer
        {...props}
        imageStatus={context.imageStatus}
        loading={context.loading}
        handleUpload={context.handleUpload}
      />
    )}
  </AppContext.Consumer>
);
