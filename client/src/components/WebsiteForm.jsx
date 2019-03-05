'use es6';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class WebsiteForm extends PureComponent {
  render() {
    const { handleChange, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Enter Website</FormLabel>
          <Input onChange={handleChange} />
          <Button type="submit" color="primary">
            Get Website Data!
          </Button>
        </form>
      </div>
    );
  }
}

WebsiteForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default WebsiteForm;
