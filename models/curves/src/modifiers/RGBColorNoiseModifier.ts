import CurveModifier from '../CurveModifier';
import Curve from '../Curve';
import Perlin from '../helpers/Perlin';
import { RGBColor } from '../interfaces/RGBColor';

class RGBColorNoiseModifier extends CurveModifier<RGBColor> {
    amplitude: number;
    frequency: number;

    perlinR: Perlin;
    perlinG: Perlin;
    perlinB: Perlin;

    constructor(
      curve: Curve<RGBColor> | CurveModifier<RGBColor>,
      amplitude = 0.1,
      frequency = 1,
      seed = 0,
      rangeStart = 0,
      rangeEnd = 0,
    ) {
      super(curve, rangeStart, rangeEnd);

      this.amplitude = amplitude;
      this.frequency = frequency;

      this.perlinR = new Perlin(seed);
      this.perlinG = new Perlin(seed + 1);
      this.perlinB = new Perlin(seed + 2);
    }

    protected _modify(value: RGBColor, time: number): RGBColor {
      const noiseR = this.perlinR.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseG = this.perlinG.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseB = this.perlinB.noise(time * this.frequency, 0, 0) * this.amplitude;

      const result = {
        r: value.r + noiseR,
        g: value.g + noiseG,
        b: value.b += noiseB,
      };

      return result;
    }
}

export default RGBColorNoiseModifier;
