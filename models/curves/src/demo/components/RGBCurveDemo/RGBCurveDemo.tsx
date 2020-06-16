import React from 'react';
import './RGBCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../curves';
import RGBCurveDisplay from "./RGBCurveDisplay/RGBCurveDisplay";

function RGBCurveDemo(): React.ReactElement {

    return (
        <div className="demo-container">
            <h1>RGB Curve Demo</h1>
            <RGBCurveDisplay interpolationStep={0.05} />
            <br />
            <h3>Edit your curve</h3>
            <div>shut</div>
        </div>
    );
}

export default RGBCurveDemo;