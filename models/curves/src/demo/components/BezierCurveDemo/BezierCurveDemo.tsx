import React from 'react';
import './BezierCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import BezierCurveDisplay from './BezierCurveDisplay/BezierCurveDisplay';

function BezierCurveDemo(): React.ReactElement {
  return (
    <div className="demo-container">
      <h1>Bezier Curve Demo</h1>
      <BezierCurveDisplay />
      <br />
      <h3>Edit your curve</h3>
      <div>shut</div>
    </div>
  );
}

export default BezierCurveDemo;
