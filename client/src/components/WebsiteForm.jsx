'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
  button: {
    margin: '20px 0'
  }
};

const WebsiteForm = ({ url, classes, handleChange, handleNext }) => (
  <div>
    <ValidatorForm onSubmit={handleNext}>
      <TextValidator
        label="Website URL"
        onChange={handleChange}
        name="website"
        type="website"
        validators={['isURL', 'required']}
        errorMessages={['this field is required']}
        value={url}
      />
      <Button className={classes.button} type="submit" variant="contained" color="primary">
        Get Website Data
      </Button>
    </ValidatorForm>
  </div>
);

WebsiteForm.propTypes = {
  url: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default withStyles(styles)(WebsiteForm);
