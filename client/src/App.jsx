'use es6';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Lander from './components/Lander';
import Application from './containers/Application';

const App = () => (
  <BrowserRouter>
    <>
      <Header />
      <Route exact path="/" component={Lander} />
      <Route exact path="/home" component={Application} />
    </>
  </BrowserRouter>
);

export default App;
