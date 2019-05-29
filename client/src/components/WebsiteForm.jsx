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

const WebsiteForm = ({
  url,
  selector,
  blogName,
  pagination,
  classes,
  handleInputChange,
  handleNext
}) => (
  <div>
    <ValidatorForm onSubmit={handleNext}>
      <TextValidator
        label="Website URL"
        onChange={handleInputChange}
        name="url"
        type="website"
        validators={['isURL', 'required']}
        errorMessages={['this field is required']}
        value={url}
      />
      <TextValidator
        label="Post Selector"
        name="selector"
        type="selector"
        validators={['isEmpty', 'required']}
        errorMessages={['this field is required']}
        value={selector}
        onChange={handleInputChange}
      />
      <TextValidator
        label="Blog Name"
        name="blogName"
        type="name"
        value={blogName}
        onChange={handleInputChange}
      />
      <TextValidator
        label="Pagination"
        name="pagination"
        type="pagination"
        value={pagination}
        onChange={handleInputChange}
      />
      <Button className={classes.button} type="submit" variant="contained" color="primary">
        Get Website Data
      </Button>
    </ValidatorForm>
  </div>
);

WebsiteForm.propTypes = {
  url: PropTypes.string.isRequired,
  selector: PropTypes.string.isRequired,
  blogName: PropTypes.string.isRequired,
  pagination: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default withStyles(styles)(WebsiteForm);
