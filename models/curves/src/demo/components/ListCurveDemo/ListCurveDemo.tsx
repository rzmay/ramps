import React from 'react';
import './ListCurveDemo.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../curves';
import ListCurveDisplay from "./ListCurveDisplay/ListCurveDisplay";

function ListCurveDemo(): React.ReactElement {

    return (
        <div className="demo-container">
            <h1>List Curve Demo</h1>
            <ListCurveDisplay interpolationStep={0.05} />
            <br />
            <h3>Edit your curve</h3>
            <div>shut</div>
        </div>
    );
}

export default ListCurveDemo;