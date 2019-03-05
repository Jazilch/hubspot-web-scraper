import React, { Component } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import '../App.css';
import StepperComponent from '../components/Stepper';

class Application extends Component {
  state = {
    data: [],
    url: ''
  };
  handleChange = evt => {
    this.setState({
      url: evt.target.value
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { url } = this.state;
    axios.post('/api/website', { url }).then(res => {
      const data = res.data;
      this.setState({
        data
      });
    });
  };
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Lets get started! Submit your URL below and click submit</p>
        </header>
        <StepperComponent
          data={data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Application;
