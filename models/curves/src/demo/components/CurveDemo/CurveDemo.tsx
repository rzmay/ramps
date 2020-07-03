import React from 'react';
import './CurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import CurveDisplay from './CurveDisplay/CurveDisplay';

function CurveDemo(): React.ReactElement {
  return (
    <div className="demo-container">
      <h1>Curve Demo</h1>
      <CurveDisplay interpolationStep={0.05} />
      <br />
      <h3>Edit your curve</h3>
      <div>shut</div>
    </div>
  );
}

export default CurveDemo;
