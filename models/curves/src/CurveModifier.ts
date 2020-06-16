import Curve from './Curve';

abstract class CurveModifier<T> {
    rangeStart: number;
    rangeEnd: number;

    constructor(rangeStart = 0, rangeEnd = 1) {
        this.rangeStart = rangeStart;
        this.rangeEnd = rangeEnd;
    }

    evaluate(curve: Curve<T>, value: T, time: number): T {
        let rangeStart = this.rangeStart * curve.duration + curve.startTime;
        let rangeEnd = this.rangeEnd * curve.duration + curve.startTime;

        if (rangeStart <= time && time <= rangeEnd) {
            return this._modify(value, time);
        }
        return value;
    }

    protected abstract _modify(value: T, time: number): T;
}

export default CurveModifier;
