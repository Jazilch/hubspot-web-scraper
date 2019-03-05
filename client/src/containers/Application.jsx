'use es6';

import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import StepperComponent from '../components/Stepper';

class Application extends Component {
  state = {
    data: [],
    url: '',
    hubSpotPosts: []
  };

  handleChange = evt => {
    this.setState({
      url: evt.target.value
    });
  };

  handleFetch = () => {
    const { url } = this.state;
    axios.post('/api/website', { url }).then(res => {
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

  render() {
    const { data, hubSpotPosts } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Lets get started! Submit your URL below and click submit</p>
        </header>
        <StepperComponent
          data={data}
          hubSpotPosts={hubSpotPosts}
          handleChange={this.handleChange}
          handleFetch={this.handleFetch}
          handlePosts={this.handlePosts}
        />
      </div>
    );
  }
}

export default Application;
