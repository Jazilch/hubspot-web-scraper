'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebsiteData from '../components/WebsiteData';

class WebsiteDataContainer extends Component {
  componentDidMount() {
    const { handleFetch } = this.props;
    handleFetch();
  }

  render() {
    const { data } = this.props;
    return <WebsiteData data={data} />;
  }
}

WebsiteDataContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFetch: PropTypes.func.isRequired
};

export default WebsiteDataContainer;
