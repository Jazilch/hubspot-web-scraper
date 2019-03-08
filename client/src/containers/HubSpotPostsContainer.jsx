'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';
import AppContext from '../components/AppContext';

class HubSpotPostsContainer extends Component {
  componentDidMount() {
    const { handlePosts } = this.props;
    handlePosts();
  }

  render() {
    const { hubSpotPosts, loading } = this.props;
    return <WebsiteData data={hubSpotPosts} loading={loading} />;
  }
}

HubSpotPostsContainer.propTypes = {
  handlePosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hubSpotPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <HubSpotPostsContainer
        {...props}
        hubSpotPosts={context.hubSpotPosts}
        loading={context.loading}
        handlePosts={context.handlePosts}
      />
    )}
  </AppContext.Consumer>
);
