'use es6';

import React from 'react';
import '../App.css';
import Header from '../components/Header';
import StepperComponent from '../components/Stepper';
import AppProvider from '../components/AppProvider';

const Application = () => (
  <div className="App">
    <AppProvider>
      <Header />
      <StepperComponent />
    </AppProvider>
  </div>
);

export default Application;
