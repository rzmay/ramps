import React from 'react';
import './CurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import CurveDisplay from './CurveDisplay/CurveDisplay';

interface CurveDemoProps<T> {
    title?: string;
    curve?: Curve<T>;
    steps?: number;
    display?: React.ReactElement;
    displayGenerator?: (curve: Curve<T>, keys: {x: number, y: T}[]) => Object;
}

function CurveDemo<T>(props: React.PropsWithChildren<CurveDemoProps<T>>): React.ReactElement {
  return (
    <div className="demo-container">
      <h1>{props.title ?? 'Curve Demo'}</h1>
      {props.display !== undefined ? (
        <div>
          {props.display}
          {props.children}
        </div>
      )
        : (
          <CurveDisplay<T>
            steps={props.steps ?? 50}
            curve={props.curve}
            displayGenerator={props.displayGenerator ?? ((curve: Curve<T>, keys: {x: number, y: T}[]) => ({}))}
          >
            {props.children}
          </CurveDisplay>
        )}
      <br />
      <h3>Edit your curve</h3>
      <div>shut</div>
    </div>
  );
}

export default CurveDemo;
