'use es6';

import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../components/AppContext';
import StepperButtons from '../components/StepperButtons';

const StepperButtonsContainer = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <StepperButtons
          data={context.data || context.hubSpotPosts || context.hubspotPostswImages}
          {...props}
        />
      )}
    </AppContext.Consumer>
  );
};

StepperButtonsContainer.propTypes = {
  props: PropTypes.objectOf(PropTypes.string).isRequired
};

export default StepperButtonsContainer;
