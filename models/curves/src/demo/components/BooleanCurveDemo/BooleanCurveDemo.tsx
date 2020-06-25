import React from 'react';
import './BooleanCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../curves';
import BooleanCurveDisplay from "./BooleanCurveDisplay/BooleanCurveDisplay";

function BooleanCurveDemo(): React.ReactElement {

    return (
        <div className="demo-container">
            <h1>Boolean Curve Demo</h1>
            <BooleanCurveDisplay interpolationStep={0.05} />
            <br />
            <h3>Edit your curve</h3>
            <div>shut</div>
        </div>
    );
}

export default BooleanCurveDemo;