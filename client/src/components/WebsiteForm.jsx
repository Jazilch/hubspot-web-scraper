'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const WebsiteForm = ({ handleChange }) => (
  <div>
    <form>
      <FormControl required>
        <FormLabel>Enter Website</FormLabel>
        <Input onChange={handleChange} />
      </FormControl>
    </form>
  </div>
);

WebsiteForm.propTypes = {
  handleChange: PropTypes.func.isRequired
};

export default WebsiteForm;
