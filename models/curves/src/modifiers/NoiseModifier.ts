import CurveModifier from '../CurveModifier';
import Curve from '../Curve';
import Perlin from '../helpers/Perlin';

class NoiseModifier extends CurveModifier<number> {
    amplitude: number;
    frequency: number;

    private perlin: Perlin;

    constructor(
      curve: Curve<number> | CurveModifier<number>,
      amplitude = 0.1,
      frequency = 1,
      seed = 0,
      rangeStart = 0,
      rangeEnd = 1,
    ) {
      super(curve, rangeStart, rangeEnd);

      this.amplitude = amplitude;
      this.frequency = frequency;

      this.perlin = new Perlin(seed);
    }

    protected _modify(value: number, time: number): number {
      return this.perlin.noise(time * this.frequency, 0, 0) * this.amplitude;
    }
}

export default NoiseModifier;
