import CurveModifier from '../CurveModifier';
import Curve from '../Curve';

enum SineModifierBlendMode {
    Replace,
    Add,
    Subtract,
    Multiply,
}

class SineModifier extends CurveModifier<number> {
    amplitude: number;
    wavelength: number;
    phaseOffset: number;

    blend: SineModifierBlendMode;

    constructor(
      curve: Curve<number> | CurveModifier<number>,
      blendMode = SineModifierBlendMode.Replace,
      amplitude = 0.1,
      wavelength = 1,
      phaseOffset = 0,
      rangeStart = 0,
      rangeEnd = 0,
    ) {
      super(curve, rangeStart, rangeEnd);

      this.amplitude = amplitude;
      this.wavelength = wavelength;
      this.phaseOffset = phaseOffset;

      this.blend = blendMode;
    }

    protected _modify(value: number, time: number): number {
      const waveValue = Math.sin(
        (time - this.phaseOffset)
                * 2 * Math.PI * (1 / this.wavelength),
      ) * this.amplitude;

      const curveValue = this.curve.evaluate(time);

      switch (this.blend) {
        case SineModifierBlendMode.Replace:
          return curveValue + waveValue;
        case SineModifierBlendMode.Add:
          return curveValue + waveValue + (0.5 * this.amplitude);
        case SineModifierBlendMode.Subtract:
          return curveValue + waveValue - (0.5 * this.amplitude);
        case SineModifierBlendMode.Multiply:
          return curveValue * waveValue;
        default:
          return curveValue; // Unreachable
      }
    }
}

export { SineModifierBlendMode };
export default SineModifier;
