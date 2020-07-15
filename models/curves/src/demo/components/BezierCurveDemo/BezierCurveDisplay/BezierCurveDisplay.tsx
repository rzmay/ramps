import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './BezierCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve, Modifiers, Keyframe, BezierKeyframe, BezierHandle, Easing, EndBehavior } from '../../../../..';

const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

function BezierCurveDisplay(props: any): React.ReactElement {
  const [options, setOptions] = useState({});

  function generateHandlePoint(handle: BezierHandle, origin: {x: number, y: number}, direction: 'in' | 'out') {
    return Object.assign(
      handle.toCartesian(origin),
      {
        theta: (handle.angle * (180 / Math.PI)).toFixed(0),
        magnitude: handle.magnitude.toFixed(2),
        inout: direction,
      },
    );
  }

  useEffect(() => {
    const curve: Curve<number> = props.curve ?? Curve.bezierBuilder(0, 1, 10);
    for (let i = 1; i < 10; i += 1) {
      curve.addKeyframe(BezierKeyframe.automatic(i, Math.random() * 5));
    }

    const keys: {x: number, y: number}[] = [];
    for (let x = 0; x <= curve.duration + curve.startTime; x += props.interpolationStep || curve.duration / 100) {
      const key = { x, y: curve.evaluate(x) };
      keys.push(key);
    }

    const curvesData: [object] = [{
      type: 'spline',
      color: 'blue',
      toolTipContent: 'Time {x}: {y}',
      dataPoints: keys,
    }];

    // Add lines to curves for each handle
    curve.keys.forEach((key: BezierKeyframe | Keyframe<number>) => {
      if (key instanceof BezierKeyframe) {
        const keyCartesian = { x: key.time, y: key.value };
        curvesData.push({
          type: 'line',
          color: 'orange',
          toolTipContent: '{inout} (Θ: {theta}°, r: {magnitude})',
          dataPoints: [
            generateHandlePoint(key.outHandle, keyCartesian, 'out'),
            generateHandlePoint(key.inHandle, keyCartesian, 'in'),
          ],
        });
        curvesData.push({
          type: 'line',
          color: 'lightblue',
          toolTipContent: 'x: {x}, y: {y}',
          dataPoints: [keyCartesian],
        });
      }
    });

    const newOptions = {
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

    setOptions(newOptions);
  }, [props.curve, props.interpolationStep]);

  return (
    <div className="chart-container">
      <div className="curve-chart">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}

export default BezierCurveDisplay;
