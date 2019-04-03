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

const StepperButtons = ({ data, activeStep, handlePrevious, handleNext, handleReset, classes }) => {
  const disableButton = !data.length;
  return (
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
              disabled={disableButton}
              color="primary"
              onClick={activeStep === 4 ? handleReset : handleNext}
            >
              {activeStep === 4 ? 'Finish' : 'Next'}
            </Button>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

StepperButtons.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStep: PropTypes.number.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(StepperButtons);
