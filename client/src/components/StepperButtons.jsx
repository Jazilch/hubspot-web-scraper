'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const StepperButtons = ({ activeStep, handlePrevious, handleNext }) => (
  <React.Fragment>
    {activeStep >= 1 && (
      <React.Fragment>
        <Button
          disabled={activeStep === 0}
          variant="contained"
          color="primary"
          onClick={handlePrevious}
        >
          {'Back'}
        </Button>
        {activeStep <= 4 && (
          <Button variant="contained" color="primary" onClick={handleNext}>
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
  handleNext: PropTypes.func.isRequired
};

export default StepperButtons;
