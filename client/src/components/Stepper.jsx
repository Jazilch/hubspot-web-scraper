'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WebsiteDataContainer from '../containers/WebsiteDataContainer';
import WebsiteForm from './WebsiteForm';
import HubSpotPostsContainer from '../containers/HubSpotPostsContainer';

class StepperComponent extends Component {
  state = {
    activeStep: 0
  };

  getStepContent = step => {
    const { data, hubSpotPosts, handleChange, handleFetch, handlePosts } = this.props;
    switch (step) {
      case 0:
        return <WebsiteForm handleChange={handleChange} />;
      case 1:
        return <WebsiteDataContainer data={data} handleFetch={handleFetch} />;
      case 2:
        return <HubSpotPostsContainer hubSpotPosts={hubSpotPosts} handlePosts={handlePosts} />;
      case 3:
        return 'Cool, good to go! Lets upload those images';
      case 4:
        return 'Sweet upload all the images! Lets update';
      default:
        return '🚀🚀';
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  handlePrevious = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  render() {
    const { activeStep } = this.state;
    return (
      <React.Fragment>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 4</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 5</StepLabel>
          </Step>
        </Stepper>
        {this.getStepContent(activeStep)}
        <Button
          disabled={activeStep === 0}
          variant="contained"
          color="primary"
          onClick={this.handlePrevious}
        >
          {'Back'}
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleNext}>
          {'Next'}
        </Button>
      </React.Fragment>
    );
  }
}

StepperComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  handlePosts: PropTypes.func.isRequired,
  hubSpotPosts: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default StepperComponent;
