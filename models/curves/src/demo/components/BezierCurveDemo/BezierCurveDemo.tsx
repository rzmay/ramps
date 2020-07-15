import React from 'react';
import './BezierCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BezierHandle, BezierKeyframe, Curve, Keyframe } from '../../../..';
import CurveDemo from '../CurveDemo/CurveDemo';

function BezierCurveDemo(): React.ReactElement {
  function generateHandlePoint(handle: BezierHandle, origin: {x: number, y: number}, direction: 'in' | 'out') {
    return Object.assign(
      handle.toCartesian(origin),
      {
        theta: (handle.angle * (180 / Math.PI)).toFixed(0),
        magnitude: handle.magnitude.toFixed(2),
        markerType: 'square',
        inout: direction,
      },
    );
  }

  return (
    <CurveDemo<number>
      title="Bezier Curve Demo"
      curve={(() => {
        const curve = Curve.bezierBuilder(0, 1, 10);
        for (let i = 1; i < 10; i += 1) {
          curve.addKeyframe(BezierKeyframe.automatic(i, Math.random() * 5));
        }
        return curve;
      })()}
      displayGenerator={
          (curve: Curve<number>, keys: { x: number, y: number }[]) => {
            const curvesData: [object] = [{
              type: 'spline',
              color: 'blue',
              toolTipContent: 'Time {x}: {y}',
              dataPoints: keys,
              markerType: 'none',
            }];

            // Add lines to curves for each handle
            curve.keys.forEach((key: BezierKeyframe | Keyframe<number>) => {
              if (key instanceof BezierKeyframe) {
                const keyCartesian = { x: key.time, y: key.value };

                // Handle
                curvesData.push({
                  type: 'line',
                  color: 'orange',
                  toolTipContent: '{inout} (Θ: {theta}°, r: {magnitude})',
                  dataPoints: [
                    generateHandlePoint(key.outHandle, keyCartesian, 'out'),
                    generateHandlePoint(key.inHandle, keyCartesian, 'in'),
                  ],
                });

                // Point
                curvesData.push({
                  type: 'scatter',
                  color: 'lightblue',
                  toolTipContent: 'x: {x}, y: {y}',
                  dataPoints: [keyCartesian],
                });
              }
            });

            return {
              animationEnabled: true,
              theme: 'light2',
              title: {
                text: 'Curve Test',
              },
              axisY: {
                title: 'Value',
                includeZero: false,
                minimum: 0,
              },
              axisX: {
                title: 'Time',
                interval: 1,
              },
              data: curvesData,
            };
          }
      }
    />
  );
}

export default BezierCurveDemo;
