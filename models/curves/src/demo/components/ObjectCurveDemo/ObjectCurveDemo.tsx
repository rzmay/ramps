import React from 'react';
import './ObjectCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import ObjectCurveDisplay from './ObjectCurveDisplay/ObjectCurveDisplay';

function ObjectCurveDemo(): React.ReactElement {
  return (
    <div className="demo-container">
      <h1>Object Curve Demo</h1>
      <ObjectCurveDisplay steps={50} />
      <br />
      <h3>Edit your curve</h3>
      <div>shut</div>
    </div>
  );
}

export default ObjectCurveDemo;
