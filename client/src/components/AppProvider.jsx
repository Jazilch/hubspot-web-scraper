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
    hubSpotPosts: [],
    hubspotPostswImages: [],
    imageStatus: ''
  };

  handleChange = evt => {
    this.setState({
      url: evt.target.value
    });
  };

  handleFetch = () => {
    const { url } = this.state;
    this.setState({
      loading: true,
      error: null
    });
    axios.post('/api/v1/website', { url }).then(
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
    this.setState({ loading: true });
    axios.post('/api/v1/images', { postData: hubSpotPosts }).then(res => {
      this.setState({
        hubspotPostswImages: res.data,
        loading: false
      });
    });
  };

  handleUpload = () => {
    const { hubspotPostswImages } = this.state;
    axios.post('/api/v1/updateData', { postData: hubspotPostswImages }).then(res => {
      this.setState({
        imageStatus: res.data
      });
    });
  };

  render() {
    const {
      data,
      loading,
      error,
      url,
      hubSpotPosts,
      hubspotPostswImages,
      imageStatus
    } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          data,
          loading,
          error,
          url,
          hubSpotPosts,
          hubspotPostswImages,
          imageStatus,
          handleChange: this.handleChange,
          handleFetch: this.handleFetch,
          handlePosts: this.handlePosts,
          handleImages: this.handleImages,
          handleUpload: this.handleUpload
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AppProvider;
