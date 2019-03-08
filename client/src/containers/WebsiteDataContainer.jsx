'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';
import AppContext from '../components/AppContext';

class WebsiteDataContainer extends Component {
  componentDidMount() {
    const { handleFetch } = this.props;
    handleFetch();
  }

  render() {
    const { data, loading } = this.props;
    return <WebsiteData data={data} loading={loading} />;
  }
}

WebsiteDataContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  handleFetch: PropTypes.func.isRequired
};

export default props => (
  <AppContext.Consumer>
    {context => (
      <WebsiteDataContainer
        {...props}
        data={context.data}
        loading={context.loading}
        handleFetch={context.handleFetch}
      />
    )}
  </AppContext.Consumer>
);
