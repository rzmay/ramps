import convert from 'color-convert';
import { HSVColor } from '../interfaces/HSVColor';
import { RGBColor } from '../interfaces/RGBColor';

function normalizeHSV(color: HSVColor): HSVColor {
    return {
        h: color.h%360,
        s: Math.min(Math.max(color.s, 0), 100),
        v: Math.min(Math.max(color.v, 0), 100),
    }
}

function HSVtoRGB(color: HSVColor): RGBColor {
    const hsv = normalizeHSV(color);
    let rgbList = convert.hsv.rgb(hsv.h, hsv.s, hsv.v);
    return {r: rgbList[0], g: rgbList[1], b: rgbList[2]};
}

function HSLtoRGB(color: HSVColor): RGBColor {
    const hsl = normalizeHSV(color);
    let rgbList = convert.hsl.rgb(hsl.h, hsl.s, hsl.v);
    return {r: rgbList[0], g: rgbList[1], b: rgbList[2]};
}

function HSVtoHSL(color: HSVColor): HSVColor {
    const hsv = normalizeHSV(color);
    let hslList = convert.hsv.hls(hsv.h, hsv.s, hsv.v);
    return {h: hslList[0], s: hslList[1], v: hslList[2]};
}

function HSLtoHSV(color: HSVColor): HSVColor {
    const hsl = normalizeHSV(color);
    let hsvList = convert.hsl.hsv(hsl.h, hsl.s, hsl.v);
    return {h: hsvList[0], s: hsvList[1], v: hsvList[2]};
}

function RGBtoHSV(color: RGBColor): HSVColor {
    let hsvList = convert.rgb.hsv(color.r, color.g, color.b);
    return {h: hsvList[0], s: hsvList[1], v: hsvList[2]};
}

function RGBtoHSL(color: RGBColor): HSVColor {
    let hsvList = convert.rgb.hsl(color.r, color.g, color.b);
    return {h: hsvList[0], s: hsvList[1], v: hsvList[2]};
}

const HSVHelper = {
    normalizeHSV,
    HSVtoRGB,
    HSLtoRGB,
    HSVtoHSL,
    HSLtoHSV,
    RGBtoHSV,
    RGBtoHSL,
}

export default HSVHelper;