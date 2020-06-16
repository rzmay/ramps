import CurveModifier from '../../CurveModifier';
import Perlin from '../../helpers/Perlin';
import { HSVColor } from '../../interfaces/HSVColor';

class HSVNoise extends CurveModifier<HSVColor> {
    amplitude: number;
    frequency: number;

    perlinH: Perlin;
    perlinS: Perlin;
    perlinV: Perlin;

    constructor(
        amplitude = 25,
        frequency = 1,
        seed = 0,
        rangeStart = 0,
        rangeEnd = 1,
    ) {
        super(rangeStart, rangeEnd);

        this.amplitude = amplitude;
        this.frequency = frequency;

        this.perlinH = new Perlin(seed);
        this.perlinS = new Perlin(seed + 1);
        this.perlinV = new Perlin(seed + 2);
    }

    protected _modify(value: HSVColor, time: number): HSVColor {
        // Amplitude is scaled for saturation and value; multiply hue by 36 to preserve scale
        const noiseH = this.perlinH.noise(time * this.frequency, 0, 0) * this.amplitude * 3.6;
        const noiseS = this.perlinS.noise(time * this.frequency, 0, 0) * this.amplitude;
        const noiseV = this.perlinV.noise(time * this.frequency, 0, 0) * this.amplitude;

        const result = {
            h: value.h + noiseH,
            s: value.s + noiseS,
            v: value.v + noiseV,
        };

        return result;
    }
}

export default HSVNoise;
