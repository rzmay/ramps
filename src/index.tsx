import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import Home from './pages/Home/Home';
import ObjectCurveDemo from '../models/curves/src/demo/components/ObjectCurveDemo/ObjectCurveDemo';
import NumberCurveDemo from '../models/curves/src/demo/components/NumberCurveDemo/NumberCurveDemo';

render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/curves" component={NumberCurveDemo} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
