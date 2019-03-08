'use es6';

import React from 'react';
import AppContext from '../components/AppContext';
import WebsiteForm from '../components/WebsiteForm';

const WebsiteFormContainer = () => (
  <AppContext.Consumer>
    {context => <WebsiteForm handleChange={context.handleChange} />}
  </AppContext.Consumer>
);

export default WebsiteFormContainer;
