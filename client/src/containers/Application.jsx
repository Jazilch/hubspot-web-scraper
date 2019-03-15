'use es6';

import React from 'react';
import '../App.css';
import StepperComponent from '../components/StepperComponent';
import AppProvider from '../components/AppProvider';

const Application = () => (
  <div className="App">
    <AppProvider>
      <StepperComponent />
    </AppProvider>
  </div>
);

export default Application;
