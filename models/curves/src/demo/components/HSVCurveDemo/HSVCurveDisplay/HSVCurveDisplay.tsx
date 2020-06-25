import React, {useEffect, useState} from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './HSVCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Curve, ColorHelper, Modifiers } from '../../../../../../curves';
import { HSVColor } from '../../../../interfaces/HSVColor';
import { RGBColor } from "../../../../interfaces/RGBColor";
import TitledColorBar from "../../ColorBar/TitledColorBar/TitledColorBar";


const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function HSVCurveDisplay(props: any): React.ReactElement {
    let [colorKeys, setColorKeys] = useState([{color: {r: 0, g: 0, b: 0}, time: 0}, {color: {r: 255, g: 0, b: 0}, time: 1}]);
    let [hslColorKeys, setHSLColorKeys] = useState([{color: {r: 0, g: 0, b: 0}, time: 0}, {color: {r: 0, g: 255, b: 0}, time: 1}]);
    let [options, setOptions] = useState({});

    useEffect(()=>{
        let curve: Curve<HSVColor> = props.curve ?? Curve.hsvColorBuilder(
            {h: 0, s: 100, v: 50},
            {h: 360, s: 40, v: 100},
            10
        );

        let h_keys: {x: number, y: number, lineColor: string}[] = [];
        let s_keys: {x: number, y: number, lineColor: string}[] = [];
        let v_keys: {x: number, y: number, lineColor: string}[] = [];

        let newColorKeys: {color: RGBColor, time: number}[] = [];
        let newHSLColorKeys: {color: RGBColor, time: number}[] = [];

        for (let x = 0; x <= curve.duration; x += props.interpolationStep || 0.05)
        {
            let value: HSVColor = curve.evaluate(x);
            let rgbValue: RGBColor = ColorHelper.HSVtoRGB(value);

            let h_key = {x: x, y: value.h, lineColor: `hsl(${value.h}, 100%, 50%)`};
            let s_key = {x: x, y: value.s, lineColor: `hsl(0, ${value.s}%, 50%)`};
            let v_key = {x: x, y: value.v, lineColor: `hsl(0, 0%, ${value.v}%)`};

            h_keys.push(h_key);
            s_keys.push(s_key);
            v_keys.push(v_key);

            newColorKeys.push({color: rgbValue, time: (x / curve.duration)});
            newHSLColorKeys.push({color: ColorHelper.HSLtoRGB(value), time: (x / curve.duration)});
        }

        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Curve Test"
            },
            axisY: {
                title: "Saturation & Value",
                suffix: "%",
                includeZero: false,
            },
            axisY2: {
                title: "Hue",
                suffix: "º",
                includeZero: false,
            },
            axisX: {
                title: "Time",
                interval: 1,
            },
            data: [
                {
                    type: "spline",
                    toolTipContent: "Saturation {x}: {y}",
                    dataPoints: s_keys,
                },
                {
                    type: "spline",
                    toolTipContent: "Value {x}: {y}",
                    dataPoints: v_keys,
                },
                {
                    type: "spline",
                    toolTipContent: "Hue {x}: {y}",
                    axisYType: "secondary",
                    dataPoints: h_keys,
                },
            ]
        }

        setColorKeys(newColorKeys);
        setHSLColorKeys(newHSLColorKeys)
        setOptions(options)
    }, [props.curve, props.interpolationStep]);

    return (
        <div className="chart-container">
            <div className="curve-chart">
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
            </div>

            <TitledColorBar colors={colorKeys} title="HSV" />
            <TitledColorBar colors={hslColorKeys} title="HSL" />
        </div>
    );
}

export default HSVCurveDisplay;
