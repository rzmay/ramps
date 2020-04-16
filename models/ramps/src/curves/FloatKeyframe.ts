import { MathUtils } from 'three';
import Easing from './Easing';
import { Keyframe } from './Keyframe';
import lerp = MathUtils.lerp;

class FloatKeyframe implements Keyframe {
    time: number;
    value: number;

    inEasing: Easing;
    outEasing: Easing;

    constructor(
      time: number,
      value: number,
      inEasing: Easing = Easing.cubic,
      outEasing: Easing = Easing.cubic,
    ) {
      this.time = time;
      this.value = value;
      this.inEasing = inEasing;
      this.outEasing = outEasing;
    }

    interpolate(keyframe: FloatKeyframe, time: number): number {
      return lerp(
        this.value,
        keyframe.value,
        Easing.inOut(this.inEasing, keyframe.outEasing, time),
      );
    }

    interpolateRealtime(keyframe: FloatKeyframe, time: number): number {
      const alpha = (time - this.time) / (keyframe.time - this.time);
      return this.interpolate(keyframe, alpha);
    }
}

export default FloatKeyframe;
