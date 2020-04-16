import { Keyframe } from './Keyframe';
import Easing from './Easing';
import FloatKeyframe from './FloatKeyframe';

interface Color {
    r: number;
    g: number;
    b: number;
}

class ColorKeyframe implements Keyframe {
    time: number;
    value: Color;

    inEasing: Easing;
    outEasing: Easing;

    constructor(
      time: number,
      value: Color,
      inEasing: Easing = Easing.cubic,
      outEasing: Easing = Easing.cubic,
    ) {
      this.time = time;
      this.value = value;
      this.inEasing = inEasing;
      this.outEasing = outEasing;
    }

    interpolate(keyframe: ColorKeyframe, time: number): Color {
      const floatKeyframes = this.toFloatKeyframe();
      const nextFloatKeyframes = keyframe.toFloatKeyframe();

      return {
        r: floatKeyframes[0].interpolate(nextFloatKeyframes[0], time),
        g: floatKeyframes[1].interpolate(nextFloatKeyframes[1], time),
        b: floatKeyframes[2].interpolate(nextFloatKeyframes[2], time),
      };
    }

    interpolateRealtime(keyframe: ColorKeyframe, time: number): Color {
      const alpha = (time - this.time) / (keyframe.time - this.time);
      return this.interpolate(keyframe, alpha);
    }

    toFloatKeyframe(): FloatKeyframe[] {
      return [
        new FloatKeyframe(this.time, this.value.r, this.inEasing, this.outEasing),
        new FloatKeyframe(this.time, this.value.g, this.inEasing, this.outEasing),
        new FloatKeyframe(this.time, this.value.b, this.inEasing, this.outEasing),
      ];
    }
}

export default ColorKeyframe;
