'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import WebsiteForm from './WebsiteForm';
import StepperHelpCard from './StepperHelpCard';
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
    const {
      data,
      hubSpotPosts,
      hubspotPostswImages,
      imageStatus,
      handleChange,
      handleFetch,
      handlePosts,
      handleImages,
      handleUpload
    } = this.props;
    switch (step) {
      case 0:
        return <WebsiteForm handleChange={handleChange} />;
      case 1:
        return <WebsiteDataContainer data={data} handleFetch={handleFetch} />;
      case 2:
        return <HubSpotPostsContainer hubSpotPosts={hubSpotPosts} handlePosts={handlePosts} />;
      case 3:
        return (
          <HubSpotImagesContainer
            hubspotPostswImages={hubspotPostswImages}
            handleImages={handleImages}
          />
        );
      case 4:
        return <UploadImagesContainer imageStatus={imageStatus} handleUpload={handleUpload} />;
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  imageStatus: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFetch: PropTypes.func.isRequired,
  handlePosts: PropTypes.func.isRequired,
  hubSpotPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  hubspotPostswImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleImages: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired
};

export default withStyles(styles)(StepperComponent);
