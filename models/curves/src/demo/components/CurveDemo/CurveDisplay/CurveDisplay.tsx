import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './CurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Curve, Modifiers, NumberKeyframe, Easing, EndBehavior } from '../../../../..';

const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

function CurveDisplay(props: any): React.ReactElement {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const curve: Curve<number> = props.curve ?? Curve.floatBuilder(0, 1, 10);
    curve.addKeyframe(new NumberKeyframe(3, 2));

    curve.addModifier(new Modifiers.Number.Noise(0.5, 5, 0));

    const keys: {x: number, y: number}[] = [];
    for (let x = 0; x <= 50; x += props.interpolationStep || 0.05) {
      const key = { x, y: curve.evaluate(x) };
      keys.push(key);
    }

    const newOptions = {
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
        maximum: 50,
      },
      data: [
        {
          type: 'spline',
          toolTipContent: 'Time {x}: {y}',
          dataPoints: keys,
        },
      ],
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

export default CurveDisplay;
