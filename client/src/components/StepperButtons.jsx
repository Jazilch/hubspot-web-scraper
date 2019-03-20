'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    margin: '5px'
  }
};

const StepperButtons = ({ activeStep, handlePrevious, handleNext, classes }) => (
  <React.Fragment>
    {activeStep >= 1 && (
      <React.Fragment>
        <Button
          className={classes.button}
          disabled={activeStep === 0}
          variant="contained"
          color="primary"
          onClick={handlePrevious}
        >
          {'Back'}
        </Button>
        {activeStep <= 4 && (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === 4 ? 'Finish' : 'Next'}
          </Button>
        )}
      </React.Fragment>
    )}
  </React.Fragment>
);

StepperButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(StepperButtons);
