import EndBehavior from './EndBehavior';
import { Keyframe } from './Keyframe';

abstract class Curve {
    abstract endBehaviour: EndBehavior = EndBehavior.Clamp;

    abstract keys: Keyframe[] = [];

    abstract startTime = 0;
    abstract endTime = 0;
    abstract duration = 0;

    protected _calculateBounds(): void {
      this.keys.sort((k1, k2) => k1.time - k2.time);

      if (this.keys.length > 0) {
        this.startTime = this.keys[0].time;
        this.endTime = this.keys[this.keys.length - 1].time;
        this.duration = this.endTime - this.startTime;
      } else {
        this.startTime = 0;
        this.endTime = 0;
        this.duration = 0;
      }
    }

    protected _pingPongTime(time: number) {
      return Math.abs(
        -((time - this.duration) % (2 * this.duration)) + this.duration,
      );
    }
}

export default Curve;
