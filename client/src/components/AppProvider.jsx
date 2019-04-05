'use es6';

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

class AppProvider extends Component {
  state = {
    data: [],
    loading: false,
    error: null,
    url: '',
    selector: '',
    pagination: '',
    hubSpotPosts: [],
    hubspotPostswImages: [],
    uploadDone: false
  };

  handleURLChange = evt => {
    this.setState({
      url: evt.target.value
    });
  };

  handleSelectorChange = evt => {
    this.setState({
      selector: evt.target.value
    });
  };

  handlePaginationChange = evt => {
    this.setState({
      pagination: evt.target.value
    });
  };

  handleFetch = () => {
    const { url, selector, pagination } = this.state;
    this.setState({
      loading: true,
      error: null
    });
    axios.post('/api/v1/website', { url, selector, pagination }).then(
      res =>
        this.setState({
          data: res.data,
          loading: false
        }),
      error =>
        this.setState({
          loading: false,
          error
        })
    );
  };

  handlePosts = () => {
    const { data } = this.state;
    this.setState({ loading: true, error: null });
    axios.post('/api/v1/posts', { postData: data }).then(
      res =>
        this.setState({
          hubSpotPosts: res.data,
          loading: false
        }),
      error =>
        this.setState({
          loading: false,
          error
        })
    );
  };

  handleImages = () => {
    const { hubSpotPosts } = this.state;
    this.setState({ loading: true, error: null });
    axios.post('/api/v1/images', { postData: hubSpotPosts }).then(
      res =>
        this.setState({
          hubspotPostswImages: res.data,
          loading: false
        }),
      error =>
        this.setState({
          loading: false,
          error
        })
    );
  };

  handleUpload = () => {
    const { hubspotPostswImages } = this.state;
    this.setState({ loading: true, error: null });
    axios.post('/api/v1/updateData', { postData: hubspotPostswImages }).then(
      res =>
        this.setState({
          uploadDone: res.data
        }),
      error =>
        this.setState({
          loading: false,
          error
        })
    );
  };

  render() {
    const {
      data,
      loading,
      error,
      url,
      selector,
      pagination,
      hubSpotPosts,
      hubspotPostswImages,
      uploadDone,
      confettiActive
    } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          data,
          loading,
          error,
          url,
          selector,
          pagination,
          hubSpotPosts,
          hubspotPostswImages,
          uploadDone,
          confettiActive,
          handleURLChange: this.handleURLChange,
          handleSelectorChange: this.handleSelectorChange,
          handlePaginationChange: this.handlePaginationChange,
          handleFetch: this.handleFetch,
          handlePosts: this.handlePosts,
          handleImages: this.handleImages,
          handleUpload: this.handleUpload,
          handleConfetti: this.handleConfetti
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
