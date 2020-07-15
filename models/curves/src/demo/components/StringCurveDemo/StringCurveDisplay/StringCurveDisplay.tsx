import React, { useEffect, useState } from 'react';
import './StringCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slider, RangeSlider } from 'rsuite';
import { Curve, Modifiers } from '../../../../..';
import 'rsuite/dist/styles/rsuite-default.css';
import StringKeyframe from '../../../../keyframes/StringKeyframe';

function StringCurveDisplay(props: any): React.ReactElement {
  const [curve, setCurve] = useState(Curve.stringBuilder('Hello World!', 'World Hello!', 10));
  const [time, setTime] = useState(0);

  curve.addKeyframe(new StringKeyframe(2.5, 'Bro....'));

  return (
    <div className="string-container">
      <div className="curve-string">
        {curve.evaluate(time)}
      </div>
      <div className="time-slider-container">
        <h5>Adjust Time</h5>
        <br />
        <Slider
          defaultValue={time}
          onChange={setTime}
          step={0.05}
          progress
          min={curve.startTime}
          max={curve.endTime}
          graduated
          renderMark={(t) => {
            if (curve.keys.map((k) => k.time).includes(t)) {
              return <span>{curve.evaluate(t)}</span>;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
}

export default StringCurveDisplay;
