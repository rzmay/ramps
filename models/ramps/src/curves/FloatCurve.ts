import EndBehavior from './EndBehavior';
import FloatKeyframe from './FloatKeyframe';
import Easing from './Easing';
import Curve from './Curve';

class FloatCurve extends Curve {
    endBehaviour: EndBehavior = EndBehavior.Clamp;

    keys: FloatKeyframe[] = [];

    startTime = 0;
    endTime = 0;
    duration = 0;

    constructor(keys: FloatKeyframe[] | undefined, endBehavior: EndBehavior | undefined) {
      super();

      this.keys = keys ?? this.keys;
      this.endBehaviour = endBehavior ?? this.endBehaviour;

      this._calculateBounds();
    }

    // Time is guaranteed to be in curve range
    private _rangeEvaluate(time: number): number {
      // Edge cases
      if (time === this.startTime) return this.keys[0].value;
      if (time === this.endTime) return this.keys[this.keys.length - 1].value;

      let index = 0;
      let found = false;

      for (let i = 0; i < this.keys.length && !found; i += 1) {
        if (time <= this.keys[i].time) {
          found = true;
          index = i;
        }
      }

      return this.keys[index - 1].interpolateRealtime(this.keys[index], time);
    }

    addKeyframe(keyframe: FloatKeyframe): void {
      this.keys.push(keyframe);
      this._calculateBounds();
    }

    evaluate(time: number): number {
      if (this.startTime <= time && time <= this.endTime) {
        return this._rangeEvaluate(time);
      }
      switch (this.endBehaviour) {
        case EndBehavior.Clamp:
          if (this.startTime > time) {
            return this._rangeEvaluate(0); // First keyframe
          }

          return this._rangeEvaluate(this.endTime); // Last keyframe

        case EndBehavior.Loop:
          return this._rangeEvaluate(time % this.endTime); // Use mod to loop

        case EndBehavior.PingPong:
          return this._rangeEvaluate(this._pingPongTime(time));

        default:
          return 0; // Unreachable
      }
    }
}

export default FloatCurve;
