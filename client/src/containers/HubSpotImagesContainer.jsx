'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';

class HubSpotImagesContainer extends Component {
  componentDidMount() {
    const { handleImages } = this.props;
    handleImages();
  }

  render() {
    const { hubspotPostswImages } = this.props;
    return <WebsiteData data={hubspotPostswImages} />;
  }
}

HubSpotImagesContainer.propTypes = {
  handleImages: PropTypes.func.isRequired,
  hubspotPostswImages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HubSpotImagesContainer;
