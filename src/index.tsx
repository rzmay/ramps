import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import Home from './pages/Home/Home';
import CurveDemo from '../models/curves/src/demo/components/CurveDemo/CurveDemo';
import RGBCurveDemo from '../models/curves/src/demo/components/RGBCurveDemo/RGBCurveDemo';
import HSVCurveDemo from '../models/curves/src/demo/components/HSVCurveDemo/HSVCurveDemo';
import ListCurveDemo from "../models/curves/src/demo/components/ListCurveDemo/ListCurveDemo";
import BooleanCurveDemo from "../models/curves/src/demo/components/BooleanCurveDemo/BooleanCurveDemo";
import StringCurveDemo from "../models/curves/src/demo/components/StringCurveDemo/StringCurveDemo";

render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/curves" component={StringCurveDemo} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
