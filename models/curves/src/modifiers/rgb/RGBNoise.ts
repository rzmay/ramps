import CurveModifier from '../../CurveModifier';
import Perlin from '../../helpers/Perlin';
import {RGBColor} from '../../interfaces/RGBColor';

class RGBNoise extends CurveModifier<RGBColor> {
    amplitude: number;
    frequency: number;

    perlinR: Perlin;
    perlinG: Perlin;
    perlinB: Perlin;

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

      this.perlinR = new Perlin(seed);
      this.perlinG = new Perlin(seed + 1);
      this.perlinB = new Perlin(seed + 2);
    }

    protected _modify(value: RGBColor, time: number): RGBColor {
      const noiseR = this.perlinR.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseG = this.perlinG.noise(time * this.frequency, 0, 0) * this.amplitude;
      const noiseB = this.perlinB.noise(time * this.frequency, 0, 0) * this.amplitude;

      return {
          r: value.r + noiseR - (this.amplitude / 2),
          g: value.g + noiseG - (this.amplitude / 2),
          b: value.b + noiseB - (this.amplitude / 2),
      };
    }
}

export default RGBNoise;
