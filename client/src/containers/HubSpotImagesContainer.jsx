'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';
import AppContext from '../components/AppContext';

class HubSpotImagesContainer extends Component {
  componentDidMount() {
    const { handleImages } = this.props;
    handleImages();
  }

  render() {
    const { hubspotPostswImages, error, loading } = this.props;
    return <WebsiteData data={hubspotPostswImages} error={error} loading={loading} />;
  }
}

HubSpotImagesContainer.propTypes = {
  handleImages: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  hubspotPostswImages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <HubSpotImagesContainer
        {...props}
        hubspotPostswImages={context.hubspotPostswImages}
        error={context.error}
        loading={context.loading}
        handleImages={context.handleImages}
      />
    )}
  </AppContext.Consumer>
);
