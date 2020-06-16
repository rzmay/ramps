import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './RGBCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Curve } from '../../../../../../curves';
import { RGBColor } from '../../../../interfaces/RGBColor';
import ColorBar from '../../ColorBar/ColorBar';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function RGBCurveDisplay(props: any): React.ReactElement {
    let [colorKeys, setColorKeys] = useState([{color: {r: 0, g: 0, b: 0}, time: 0}, {color: {r: 255, g: 0, b: 0}, time: 1}]);
    let [options, setOptions] = useState({});

    useEffect(()=>{
        let curve: Curve<RGBColor> = props.curve ?? Curve.rgbColorBuilder(
            {r: 255, g: 200, b:0},
            {r: 0, g: 180, b:220},
            10
        );

        let r_keys: {x: number, y: number}[] = [];
        let g_keys: {x: number, y: number}[] = [];
        let b_keys: {x: number, y: number}[] = [];

        let colorKeys: {color: RGBColor, time: number}[] = [];

        for (let x = 0; x <= curve.duration; x += props.interpolationStep || 0.05)
        {
            let value: RGBColor = curve.evaluate(x);
            let r_key = {x: x, y: value.r};
            let g_key = {x: x, y: value.g};
            let b_key = {x: x, y: value.b};

            r_keys.push(r_key);
            g_keys.push(g_key);
            b_keys.push(b_key);

            colorKeys.push({color: value, time: (x / curve.duration)});
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
                maximum: 255,
            },
            axisX: {
                title: "Time",
                interval: 1,
            },
            data: [
                {
                    type: "spline",
                    color: "#ff0000",
                    toolTipContent: "Red {x}: {y}",
                    dataPoints: r_keys,
                },
                {
                    type: "spline",
                    color: "#00ff00",
                    toolTipContent: "Green {x}: {y}",
                    dataPoints: g_keys,
                },
                {
                    type: "spline",
                    color: "#0000ff",
                    toolTipContent: "Blue {x}: {y}",
                    dataPoints: b_keys,
                },
            ]
        }

        setColorKeys(colorKeys);
        setOptions(options)
    }, [props.curve, props.interpolationStep]);

    return (
        <div className="chart-container">
            <div className="curve-chart">
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
            </div>
            <ColorBar colors={colorKeys} />
        </div>
    );
}

export default RGBCurveDisplay;
