'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WebsiteForm from './WebsiteForm';
import WebsiteData from './WebsiteData';

class StepperComponent extends Component {
  state = {
    activeStep: 0
  };

  getStepContent = step => {
    const { data, handleChange, handleSubmit } = this.props;
    switch (step) {
      case 0:
        return <WebsiteForm handleChange={handleChange} handleSubmit={handleSubmit} />;
      case 1:
        return <WebsiteData data={data} />;
      case 2:
        return 'Lets find out which posts are in HubSpot';
      case 3:
        return 'Cool, good to go! Lets upload those images';
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
  handleSubmit: PropTypes.func.isRequired
};

export default StepperComponent;
