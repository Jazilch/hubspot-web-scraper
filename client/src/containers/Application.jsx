'use es6';

import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Header from '../components/Header';
import StepperComponent from '../components/Stepper';

class Application extends Component {
  state = {
    data: [],
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
    axios.post('/api/v1/website', { url }).then(res => {
      const { data } = res;
      this.setState({
        data
      });
    });
  };

  handlePosts = () => {
    const { data } = this.state;
    axios.post('/api/v1/posts', { postData: data }).then(res => {
      this.setState({
        hubSpotPosts: res.data
      });
    });
  };

  handleImages = () => {
    const { hubSpotPosts } = this.state;
    axios.post('/api/v1/images', { postData: hubSpotPosts }).then(res => {
      this.setState({
        hubspotPostswImages: res.data
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
    const { data, hubSpotPosts, hubspotPostswImages, imageStatus } = this.state;
    return (
      <div className="App">
        <Header />
        <StepperComponent
          data={data}
          hubSpotPosts={hubSpotPosts}
          imageStatus={imageStatus}
          hubspotPostswImages={hubspotPostswImages}
          handleChange={this.handleChange}
          handleFetch={this.handleFetch}
          handlePosts={this.handlePosts}
          handleImages={this.handleImages}
          handleUpload={this.handleUpload}
        />
      </div>
    );
  }
}

export default Application;
