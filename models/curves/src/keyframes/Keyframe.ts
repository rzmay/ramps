import Easing from '../Easing';

abstract class Keyframe<T> {
    time: number;
    value: T;

    inEasing: Easing;
    outEasing: Easing;

    constructor(
      time: number,
      value: T,
      inEasing: Easing = Easing.cubic,
      outEasing: Easing | undefined = undefined,
    ) {
      this.time = time;
      this.value = value;
      this.inEasing = inEasing;
      this.outEasing = outEasing ?? inEasing;
    }

    abstract interpolate(keyframe: Keyframe<T>, time: number, smoothing: number): T;

    interpolateRealtime(keyframe: Keyframe<T>, time: number, smoothing: number = 0.25): T {
      const alpha = (time - this.time) / (keyframe.time - this.time);
      return this.interpolate(keyframe, alpha, smoothing);
    }
}

export default Keyframe;
