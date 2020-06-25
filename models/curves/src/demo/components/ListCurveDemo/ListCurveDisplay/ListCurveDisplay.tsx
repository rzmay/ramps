import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../lib/canvasjs/canvasjs.react';
import './ListCurveDisplay.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Curve, ColorHelper, ListKeyframe, Modifiers} from '../../../../../../curves';
import {HSVColor} from "../../../../interfaces/HSVColor";
import {RGBColor} from "../../../../interfaces/RGBColor";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ListCurveDisplay(props: any): React.ReactElement {
    let [options, setOptions] = useState({});

    function keysToCurveData(keys: {x: number, y: number}[], title: string, color: string) {
        return {
            type: "spline",
            color: color,
            toolTipContent: `${title} {x}: {y}`,
            dataPoints: keys,
        }
    }

    function randomKey(length: number): number[] {
        let floatArray: Float32Array = new Float32Array(length).map((_)=>{return Math.random()});

        return Array.prototype.slice.call(floatArray);
    }

    useEffect(()=>{
        let curve: Curve<number[]> = props.curve;
        if (curve == undefined) {
            curve = new Curve<number[]>();
            let clamp = false;
            curve.addKeyframe(new ListKeyframe(0, randomKey(5)));
            curve.addKeyframe(new ListKeyframe(5, randomKey(7)));
            curve.addKeyframe(new ListKeyframe(10, randomKey(3)));
        }

        let curves: {x: number, y: number}[][] = [];
        for (let x = 0; x <= curve.duration; x += props.interpolationStep || 0.05) {
            let values: number[] = curve.evaluate(x);
            values.forEach((value, index) => {
                if (index >= curves.length) {
                    curves.push([])
                }

                curves[index].push({x: x, y: value});
            });
        }

        let data: any[] = [];
        curves.forEach((value, index) => {
            let color: HSVColor = {h: index * 360 / curves.length, s: 100, v: 100};
            let rgbColor: RGBColor = ColorHelper.HSVtoRGB(color);
            data.push(
                keysToCurveData(
                    value,
                    `Index ${index}`, `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`
                )
            );
        });

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
            data: data,
        }

        setOptions(options)
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

export default ListCurveDisplay;
