import React, { useState } from 'react';
import './ObjectCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSONPretty from 'react-json-pretty';
import { Curve, Easing, Modifiers } from '../../../..';
import CurveDemo from '../CurveDemo/CurveDemo';
import ObjectThreeJSDemo from './ObjectThreeJSDemo/ObjectThreeJSDemo';

function ObjectCurveDemo(): React.ReactElement {
  const [time, setTime] = useState(0);
  const backgroundColor = '#f0f0f0';
  const demoCurve: Curve<object> = Curve.objectBuilder(
    { list: [0, 5, 10], object: { a: 'yo fat mama', b: true, c: 21 } },
    { list: [5, 'peeny weeny buttwhole', 0] },
    10,
  );

  function formatJSON(json: object, numDigits = 2, stringLength = 30): object {
    const result = {};
    Object.keys(json).forEach((key) => {
      switch (typeof json[key]) {
        case 'number':
          result[key] = parseFloat(json[key].toFixed(numDigits));
          break;
        case 'string':
          result[key] = json[key].length > stringLength ? `${json[key].substring(0, stringLength - 3)}...` : json[key];
          break;
        case 'object':
          // eslint-disable-next-line no-case-declarations
          const formatted = formatJSON(json[key], numDigits, stringLength);
          result[key] = Array.isArray(json[key]) ? Object.values(formatted) : formatted;
          break;
        default:
          result[key] = json[key];
      }
    });

    return result;
  }

  return (
    <CurveDemo <object>
      title="Object Curve Demo"
      curve={demoCurve}
      display={(
        <div className="object-logger-container" style={{ background: backgroundColor }}>
          <JSONPretty
            className="json-logger"
            theme={{
              main: `line-height:1.3;color:#748096;background:${backgroundColor};overflow:auto;`,
              error: 'line-height:1.3;color:#748096;background:#1e1e1e;overflow:auto;',
              key: 'color:#b553bf;',
              string: 'color:#fba856;',
              value: 'color:#93a3bf;',
              boolean: 'color:#448aa9;',
            }}
            data={formatJSON(demoCurve.evaluate(time))}
          />
        </div>
      )}
    >
      <ObjectThreeJSDemo curve={demoCurve} onTimeChange={setTime} />
    </CurveDemo>
  );
}

export default ObjectCurveDemo;
