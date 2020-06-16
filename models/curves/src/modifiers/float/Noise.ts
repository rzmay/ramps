import CurveModifier from '../../CurveModifier';
import Perlin from '../../helpers/Perlin';

class Noise extends CurveModifier<number> {
    amplitude: number;
    frequency: number;

    private perlin: Perlin;

    constructor(
      amplitude = 0.1,
      frequency = 1,
      seed = 0,
      rangeStart = 0,
      rangeEnd = 1,
    ) {
      super(rangeStart, rangeEnd);

      this.amplitude = amplitude;
      this.frequency = frequency;

      this.perlin = new Perlin(seed);
    }

    protected _modify(value: number, time: number): number {
      return value - (this.amplitude / 2) + this.perlin.noise(time * this.frequency, 0, 0) * this.amplitude;
    }
}

export default Noise;
