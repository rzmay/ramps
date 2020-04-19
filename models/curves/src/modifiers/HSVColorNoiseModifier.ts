import CurveModifier from '../CurveModifier';
import Curve from '../Curve';
import Perlin from '../helpers/Perlin';
import { HSVColor } from '../interfaces/HSVColor';

class HSVColorNoiseModifier extends CurveModifier<HSVColor> {
    amplitude: number;
    frequency: number;

    perlinH: Perlin;
    perlinS: Perlin;
    perlinV: Perlin;

    constructor(
      curve: Curve<HSVColor> | CurveModifier<HSVColor>,
      amplitude = 0.1,
      frequency = 1,
      seed = 0,
      rangeStart = 0,
      rangeEnd = 0,
    ) {
      super(curve, rangeStart, rangeEnd);

      this.amplitude = amplitude;
      this.frequency = frequency;

      this.perlinH = new Perlin(seed);
      this.perlinS = new Perlin(seed + 1);
      this.perlinV = new Perlin(seed + 2);
    }

    protected _modify(value: HSVColor, time: number): HSVColor {
      const noiseH = this.perlinH.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseS = this.perlinS.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseV = this.perlinV.noise(time * this.frequency, 0, 0) * this.amplitude;

      const result = {
        h: value.h + noiseH,
        s: value.s + noiseS,
        v: value.v += noiseV,
      };

      return result;
    }
}

export default HSVColorNoiseModifier;
