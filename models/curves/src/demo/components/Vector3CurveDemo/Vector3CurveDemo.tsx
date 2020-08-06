import React from 'react';
import './Vector3CurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../..';
import { Vector3 } from '../../../interfaces/Vector3';
import CurveDemo from '../CurveDemo/CurveDemo';
import Vector3ThreeJSDemo from './Vector3ThreeJSDemo/Vector3ThreeJSDemo';

function Vector3CurveDemo(): React.ReactElement {
  const demoCurve: Curve<Vector3> = Curve.vector3Builder(
    { x: -5, y: 1, z: -10 },
    { x: 5, y: 1, z: 10 },
    10,
  );

  return (
    <CurveDemo <Vector3>
      title="Vector3 Curve Demo"
      curve={demoCurve}
      displayGenerator={
          (curve: Curve<Vector3>, keys: { x: number, y: Vector3 }[]) => ({
            animationEnabled: true,
            theme: 'light2',
            title: {
              text: 'Curve Test',
            },
            axisY: {
              title: 'Value',
              includeZero: false,
            },
            axisX: {
              title: 'Time',
              interval: 1,
            },
            data: [
              {
                type: 'spline',
                color: '#ff0000',
                toolTipContent: 'X at {x}: {y}',
                dataPoints: keys.map((key) => ({
                  x: key.x,
                  y: key.y.x,
                  markerType: 'none',
                })),
              },
              {
                type: 'scatter',
                color: '#ff0000',
                showInLegend: true,
                legendText: 'X value',
                toolTipContent: 'X at {x}: {y}',
                dataPoints: curve.keys.map((key) => ({
                  x: key.time,
                  y: key.value.x,
                  markerType: 'square',
                })),
              },
              {
                type: 'spline',
                color: '#00ff00',
                toolTipContent: 'Y at {x}: {y}',
                dataPoints: keys.map((key) => ({
                  x: key.x,
                  y: key.y.y,
                  markerType: 'none',
                })),
              },
              {
                type: 'scatter',
                color: '#00ff00',
                showInLegend: true,
                legendText: 'Y value',
                toolTipContent: 'Y at {x}: {y}',
                dataPoints: curve.keys.map((key) => ({
                  x: key.time,
                  y: key.value.y,
                  markerType: 'square',
                })),
              },
              {
                type: 'spline',
                color: '#0000ff',
                toolTipContent: 'Z {x}: {y}',
                dataPoints: keys.map((key) => ({
                  x: key.x,
                  y: key.y.z,
                  markerType: 'none',
                })),
              },
              {
                type: 'scatter',
                color: '#0000ff',
                showInLegend: true,
                legendText: 'Z value',
                toolTipContent: 'Z at {x}: {y}',
                dataPoints: curve.keys.map((key) => ({
                  x: key.time,
                  y: key.value.z,
                  markerType: 'square',
                })),
              },
            ],
          })
      }
    >
      <Vector3ThreeJSDemo curve={demoCurve} />
    </CurveDemo>
  );
}

export default Vector3CurveDemo;
