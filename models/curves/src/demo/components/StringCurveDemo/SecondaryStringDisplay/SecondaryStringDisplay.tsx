import React, { useEffect, useState } from 'react';
import './SecondaryStringDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slider, RangeSlider } from 'rsuite';
import { Curve, Modifiers } from '../../../../..';
import 'rsuite/dist/styles/rsuite-default.css';

interface SecondaryStringDisplay {
    curve: Curve<string>;
    steps?: number;
}

function SecondaryStringDisplay(props: SecondaryStringDisplay): React.ReactElement {
  const [time, setTime] = useState(0);
  const duration = (props.curve.duration + props.curve.startTime);
  const stepTime = duration / (props.steps ?? 50);

  return (
    <div className="string-container">
      <div className="curve-string">
        {props.curve.evaluate(time)}
      </div>
      <div className="time-slider-container">
        <h5>Adjust Time</h5>
        <br />
        <Slider
          defaultValue={time}
          onChange={setTime}
          step={stepTime}
          progress
          min={props.curve.startTime}
          max={props.curve.endTime}
          graduated
          renderMark={(t) => {
            const epsilon = 1e-8;
            const keyframesInRange = props.curve.keys.filter(
              (k) => Math.abs(k.time - t) < stepTime - epsilon,
            );
            if (keyframesInRange.length > 0) {
              return <span>{keyframesInRange[0].value}</span>;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
}

export default SecondaryStringDisplay;
