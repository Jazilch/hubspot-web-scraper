'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import StepperHelpCard from './StepperHelpCard';
import Steps from '../Constants';
import WebsiteFormContainer from '../containers/WebsiteFormContainer';
import WebsiteDataContainer from '../containers/WebsiteDataContainer';
import HubSpotPostsContainer from '../containers/HubSpotPostsContainer';
import HubSpotImagesContainer from '../containers/HubSpotImagesContainer';
import UploadImagesContainer from '../containers/UploadImagesContainer';

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

  getStepContent = step => {
    switch (step) {
      case 0:
        return <WebsiteFormContainer />;
      case 1:
        return <WebsiteDataContainer />;
      case 2:
        return <HubSpotPostsContainer />;
      case 3:
        return <HubSpotImagesContainer />;
      case 4:
        return <UploadImagesContainer />;
      default:
        return 'Congrats! You have successfully uploaded your images into HubSpot. Head back to your blog and see your new images';
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
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {Steps.map(step => (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <StepperHelpCard activeStep={activeStep} />
        {this.getStepContent(activeStep)}
        <Button
          disabled={activeStep === 0}
          variant="contained"
          color="primary"
          onClick={this.handlePrevious}
        >
          {'Back'}
        </Button>
        {activeStep <= 4 && (
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            {activeStep === 4 ? 'Finish' : 'Next'}
          </Button>
        )}
      </React.Fragment>
    );
  }
}

StepperComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(StepperComponent);
