import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './CurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Curve} from '../../../../../../curves';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CurveDisplay(props: any): React.ReactElement {
    let [options, setOptions] = useState({});

    useEffect(()=>{
        let curve: Curve<number> = props.curve ?? Curve.floatBuilder(0, 1, 10);

        let keys: {x: number, y: number}[] = [];
        for (let x = 0; x <= curve.duration; x += props.interpolationStep || 0.05)
        {
            let key = {x: x, y: curve.evaluate(x)}
            keys.push(key);
        }

        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Curve Test"
            },
            axisY: {
                title: "Value",
                includeZero: false,
            },
            axisX: {
                title: "Time",
                interval: 1,
            },
            data: [
                {
                    type: "spline",
                    toolTipContent: "Time {x}: {y}",
                    dataPoints: keys,
                }
            ]
        }

        setOptions(options);
    }, [props.curve, props.interpolationStep]);

    return (
        <div className="chart-container">
            <div className="curve-chart">
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
            </div>
        </div>
    );
}

export default CurveDisplay;
