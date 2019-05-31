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
    blogName: '',
    pagination: '',
    backgroundImage: 'false',
    hubSpotPosts: [],
    hubspotPostswImages: [],
    uploadDone: false
  };

  handleInputChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  handleFetch = () => {
    const { url, selector, pagination, backgroundImage } = this.state;
    this.setState({
      loading: true,
      error: null
    });
    axios.post('/api/v1/website', { url, selector, pagination, backgroundImage }).then(
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
    const { data, blogName } = this.state;
    this.setState({ loading: true, error: null });
    axios.post('/api/v1/posts', { postData: data, blogName }).then(
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
      blogName,
      pagination,
      backgroundImage,
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
          blogName,
          pagination,
          backgroundImage,
          hubSpotPosts,
          hubspotPostswImages,
          uploadDone,
          confettiActive,
          handleInputChange: this.handleInputChange,
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
