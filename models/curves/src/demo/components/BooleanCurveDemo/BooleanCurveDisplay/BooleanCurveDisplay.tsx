import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './BooleanCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Curve, Modifiers} from '../../../../../../curves';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function BooleanCurveDisplay(props: any): React.ReactElement {
    let [options, setOptions] = useState({});

    useEffect(()=>{
        let curve: Curve<boolean> = props.curve ?? Curve.booleanBuilder(false, true, 10);

        curve.addModifier(new Modifiers.Boolean.Sine())

        let keys: {x: number, y: number}[] = [];
        for (let x = 0; x <= curve.duration; x += props.interpolationStep || 0.05)
        {
            let key = {x: x, y: curve.evaluate(x) ? 1 : 0 }
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
                    type: "line",
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

export default BooleanCurveDisplay;
