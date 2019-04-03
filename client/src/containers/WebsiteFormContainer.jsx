'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator';
import validator from 'validator';
import AppContext from '../components/AppContext';
import WebsiteForm from '../components/WebsiteForm';

class WebsiteFormContainer extends Component {
  componentDidMount() {
    ValidatorForm.addValidationRule('isURL', value => {
      if (validator.isURL(value.toString())) {
        return true;
      }
      return false;
    });
    ValidatorForm.addValidationRule('isEmpty', value => {
      if (!validator.isEmpty(value)) {
        return true;
      }
      return false;
    });
  }

  render() {
    const { handleNext } = this.props;
    return (
      <AppContext.Consumer>
        {context => (
          <WebsiteForm
            url={context.url}
            selector={context.selector}
            pagination={context.pagination}
            handleURLChange={context.handleURLChange}
            handleSelectorChange={context.handleSelectorChange}
            handlePaginationChange={context.handlePaginationChange}
            handleNext={handleNext}
          />
        )}
      </AppContext.Consumer>
    );
  }
}

WebsiteFormContainer.propTypes = {
  handleNext: PropTypes.func.isRequired
};

export default WebsiteFormContainer;
