import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './CurveDisplay.scss';
import { Curve } from '../../../../..';

const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

interface CurveDisplayProps<T> {
  curve?: Curve<T>;
  steps?: number;
  secondaryDisplay?: React.ReactElement;
  displayGenerator: (curve: Curve<T>, keys: {x: number, y: T}[]) => Object;
  updater?: number;
}

function CurveDisplay<T>(props: React.PropsWithChildren<CurveDisplayProps<T>>): React.ReactElement {
  const [options, setOptions] = useState({});
  const generateDisplay = () => {
    const curve: Curve<T> = props.curve ?? new Curve<T>();
    const duration = (curve.duration + curve.startTime);
    const steps = props.steps ?? 50;

    const keys: { x: number, y: T }[] = [];
    for (let x = 0; x <= duration; x += duration / steps) {
      const key = { x, y: curve.evaluate(x) };
      keys.push(key);
    }

    const newOptions = props.displayGenerator(curve, keys);

    setOptions(newOptions);
  };

  useEffect(generateDisplay, []);

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
