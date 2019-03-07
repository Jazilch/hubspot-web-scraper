'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Results from '../components/Results';

class UploadImagesContainer extends Component {
  componentDidMount() {
    const { handleUpload } = this.props;
    handleUpload();
  }

  render() {
    const { imageStatus } = this.props;
    return <Results imageStatus={imageStatus} />;
  }
}

UploadImagesContainer.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  imageStatus: PropTypes.string.isRequired
};

export default UploadImagesContainer;
