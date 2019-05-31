'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
  button: {
    margin: '20px 0'
  },
  select: {
    textAlign: 'left',
    marginTop: '20px!important'
  }
};

const WebsiteForm = ({
  url,
  selector,
  blogName,
  pagination,
  backgroundImage,
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
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="background-image">Background Image</InputLabel>
        <Select
          className={classes.select}
          value={backgroundImage}
          onChange={handleInputChange}
          inputProps={{
            name: 'backgroundImage',
            id: 'background-image'
          }}
        >
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>
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
  backgroundImage: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default withStyles(styles)(WebsiteForm);
