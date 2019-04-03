'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepperHelpCard from './StepperHelpCard';
import Steps from '../Constants';
import WebsiteFormContainer from '../containers/WebsiteFormContainer';
import WebsiteDataContainer from '../containers/WebsiteDataContainer';
import HubSpotPostsContainer from '../containers/HubSpotPostsContainer';
import HubSpotImagesContainer from '../containers/HubSpotImagesContainer';
import UploadImagesContainer from '../containers/UploadImagesContainer';
import StepperButtonsContainer from '../containers/StepperButtonsContainer';

const styles = {
  root: {
    width: '90%',
    margin: '0 auto'
  },
  stepper: {
    backgroundColor: '#eee'
  }
};

class StepperComponent extends Component {
  state = {
    activeStep: 0
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

  handleReset = () => {
    window.location.reload();
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <WebsiteFormContainer handleNext={this.handleNext} />;
      case 1:
        return <WebsiteDataContainer />;
      case 2:
        return <HubSpotPostsContainer />;
      case 3:
        return <HubSpotImagesContainer />;
      case 4:
        return <UploadImagesContainer />;
      default:
        return null;
    }
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {Steps.map(step => (
              <Step key={step.id}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <StepperHelpCard activeStep={activeStep} />
        {this.getStepContent(activeStep)}
        <StepperButtonsContainer
          activeStep={activeStep}
          handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
          handleReset={this.handleReset}
        />
      </React.Fragment>
    );
  }
}

StepperComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(StepperComponent);
