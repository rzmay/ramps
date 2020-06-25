import CurveModifier from '../../CurveModifier';

class Step extends CurveModifier<number[]> {
    stepLength: number;

    constructor(
      stepLength = 0.2,
      rangeStart = 0,
      rangeEnd = 1,
    ) {
      super(rangeStart, rangeEnd);

      this.stepLength = stepLength;
    }

    protected _modify(value: number[], time: number): number[] {
        return value.map((v) => this._modifySingle(v, time));
    }

    private _modifySingle(value: number, time: number): number {
      return Math.floor(value / this.stepLength) * this.stepLength;
    }
}

export default Step;
