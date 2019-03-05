'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';

class HubSpotPostsContainer extends Component {
  componentDidMount() {
    const { handlePosts } = this.props;
    handlePosts();
  }

  render() {
    const { hubSpotPosts } = this.props;
    return <WebsiteData data={hubSpotPosts} />;
  }
}

HubSpotPostsContainer.propTypes = {
  handlePosts: PropTypes.func.isRequired,
  hubSpotPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HubSpotPostsContainer;
