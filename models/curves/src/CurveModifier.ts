import Curve from './Curve';

abstract class CurveModifier<T> {
    curve: Curve<T> | CurveModifier<T>;

    startTime = 0;
    endTime = 0;
    duration = 0;

    rangeStart: number;
    rangeEnd: number;

    constructor(curve: Curve<T> | CurveModifier<T>, rangeStart = 0, rangeEnd = 1) {
      this.curve = curve;

      this.startTime = this.curve.startTime;
      this.endTime = this.curve.endTime;
      this.duration = this.curve.duration;

      this.rangeStart = rangeStart * this.curve.duration + this.curve.startTime;
      this.rangeEnd = rangeEnd * this.curve.duration + this.curve.startTime;
    }

    evaluate(time: number): T {
      if (this.rangeStart < time && time < this.rangeEnd) {
        return this._modify(this.curve.evaluate(time), time);
      }
      return this.curve.evaluate(time);
    }

    protected abstract _modify(value: T, time: number): T;
}

export default CurveModifier;
