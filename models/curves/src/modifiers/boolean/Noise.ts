import CurveModifier from '../../CurveModifier';
import SimplexNoise from 'simplex-noise';

class Noise extends CurveModifier<boolean> {
    amplitude: number;
    frequency: number;

    private simplex: SimplexNoise;

    constructor(
        amplitude = 2,
        frequency = 1,
        seed = 0,
        rangeStart = 0,
        rangeEnd = 1,
    ) {
        super(rangeStart, rangeEnd);

        this.amplitude = amplitude;
        this.frequency = frequency;

        this.simplex = new SimplexNoise(seed.toString());
    }

    protected _modify(value: boolean, time: number): boolean {
        let numberValue = value ? 1 : 0;
        let noiseValue = numberValue - (this.amplitude / 2) + this.simplex.noise2D(time * this.frequency, 0) * this.amplitude;
        return noiseValue > (0.5 / this.amplitude);
    }
}

export default Noise;
