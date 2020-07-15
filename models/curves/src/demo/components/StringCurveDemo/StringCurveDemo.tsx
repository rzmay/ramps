import React from 'react';
import './StringCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import SecondaryStringDisplay from './SecondaryStringDisplay/SecondaryStringDisplay';
import CurveDemo from '../CurveDemo/CurveDemo';

function StringCurveDemo(): React.ReactElement {
  const demoCurve = Curve.stringBuilder('Hello World!', 'Robert May', 10);

  return (
    <CurveDemo <string>
      title="String Curve Display"
      curve={demoCurve}
      displayGenerator={
          (curve: Curve<string>, keys: { x: number, y: string }[]) => ({
            animationEnabled: true,
            theme: 'light2',
            zoomEnabled: true,
            title: {
              text: 'Curve Test',
            },
            axisY: {
              title: 'Value',
              includeZero: false,
              maximum: 1,
              minimum: -1,
            },
            axisX: {
              title: 'Time',
            },
            data: [
              {
                type: 'spline',
                toolTipContent: 'Time {x}: {text}',
                dataPoints: keys.map((key) => ({
                  x: key.x,
                  y: 0,
                  text: key.y,
                  markerType: 'none',
                })),
              },
              {
                type: 'scatter',
                color: 'lightblue',
                toolTipContent: 'Time {x}: {text}',
                dataPoints: curve.keys.map((key) => ({
                  x: key.time,
                  y: 0,
                  text: key.value,
                  indexLabel: key.value,
                  indexLabelBackgroundColor: 'lightblue',
                  markerType: 'square',
                  markerSize: 20,
                })),
              },
            ],
          })
      }
    >
      <SecondaryStringDisplay curve={demoCurve} />
    </CurveDemo>
  );
}

export default StringCurveDemo;
