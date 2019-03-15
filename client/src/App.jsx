'use es6';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Lander from './components/Lander';
import Application from './containers/Application';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={Lander} />
      <Route exact path="/home" component={Application} />
    </div>
  </BrowserRouter>
);

export default App;
