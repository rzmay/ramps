import React, { useState } from 'react';
import './CurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import CurveDisplay from './CurveDisplay/CurveDisplay';
import CurveEditor from './CurveEditor/CurveEditor';

interface CurveDemoProps<T> {
    title?: string;
    curve?: Curve<T>;
    steps?: number;
    display?: React.ReactElement;
    displayGenerator?: (curve: Curve<T>, keys: {x: number, y: T}[]) => Object;
    editor?: boolean;
}

function CurveDemo<T>(props: React.PropsWithChildren<CurveDemoProps<T>>): React.ReactElement {
  const [updater, setUpdater] = useState(0);

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
            updater={updater}
          >
            {props.children}
          </CurveDisplay>
        )}
      <br />
      {
        (props.editor ?? false)
          ? (
            <div>
              <h3>Edit your curve</h3>
              <CurveEditor curve={props.curve ?? new Curve<T>()} />
            </div>
          ) : undefined
        }
    </div>
  );
}

export default CurveDemo;
