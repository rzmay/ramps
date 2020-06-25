import React from 'react';
import './StringCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../curves';
import StringCurveDisplay from "./StringCurveDisplay/StringCurveDisplay";

function StringCurveDemo(): React.ReactElement {

    return (
        <div className="demo-container">
            <h1>Curve Demo</h1>
            <StringCurveDisplay interpolationStep={0.05} />
            <br />
            <h3>Edit your curve</h3>
            <div>shut</div>
        </div>
    );
}

export default StringCurveDemo;