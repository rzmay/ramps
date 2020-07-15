import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './CurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve, Modifiers, NumberKeyframe, Easing, EndBehavior } from '../../../../..';

const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

interface CurveDisplayProps<T> {
  curve?: Curve<T>;
  steps?: number;
  secondaryDisplay?: React.ReactElement;
  displayGenerator: (curve: Curve<T>, keys: {x: number, y: T}[]) => Object;
}

function CurveDisplay<T>(props: React.PropsWithChildren<CurveDisplayProps<T>>): React.ReactElement {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const curve: Curve<T> = props.curve ?? new Curve<T>();
    const duration = (curve.duration + curve.startTime);
    const steps = props.steps ?? 50;

    const keys: {x: number, y: T}[] = [];
    for (let x = 0; x <= duration; x += duration / steps) {
      const key = { x, y: curve.evaluate(x) };
      keys.push(key);
    }

    const newOptions = props.displayGenerator(curve, keys);

    setOptions(newOptions);
  }, []);

  return (
    <div className="chart-container">
      <div className="curve-chart">
        <CanvasJSChart options={options} />
      </div>
      {props.children}
    </div>
  );
}

export default CurveDisplay;
