import React from 'react';
import './HSVCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../curves';
import HSVCurveDisplay from "./HSVCurveDisplay/HSVCurveDisplay";

function HSVCurveDemo(): React.ReactElement {

    return (
        <div className="demo-container">
            <h1>HSV Curve Demo</h1>
            <HSVCurveDisplay interpolationStep={0.05} />
            <br />
            <h3>Edit your curve</h3>
            <div>shut</div>
        </div>
    );
}

export default HSVCurveDemo;