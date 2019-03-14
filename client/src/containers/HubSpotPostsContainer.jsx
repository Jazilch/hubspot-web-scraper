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
    const { hubSpotPosts, error, loading } = this.props;
    return <WebsiteData data={hubSpotPosts} error={error} loading={loading} />;
  }
}

HubSpotPostsContainer.propTypes = {
  handlePosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  hubSpotPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <HubSpotPostsContainer
        {...props}
        hubSpotPosts={context.hubSpotPosts}
        error={context.error}
        loading={context.loading}
        handlePosts={context.handlePosts}
      />
    )}
  </AppContext.Consumer>
);
