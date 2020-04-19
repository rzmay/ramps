import Keyframe from './Keyframe';
import { RGBColor } from '../interfaces/RGBColor';
import FloatKeyframe from './FloatKeyframe';

class RGBColorKeyframe extends Keyframe<RGBColor> {
  interpolate(keyframe: RGBColorKeyframe, time: number): RGBColor {
    const floatKeyframes = this.toFloatKeyframe();
    const nextFloatKeyframes = keyframe.toFloatKeyframe();

    return {
      r: floatKeyframes[0].interpolate(nextFloatKeyframes[0], time),
      g: floatKeyframes[1].interpolate(nextFloatKeyframes[1], time),
      b: floatKeyframes[2].interpolate(nextFloatKeyframes[2], time),
    };
  }

  toFloatKeyframe(): FloatKeyframe[] {
    return [
      new FloatKeyframe(this.time, this.value.r, this.inEasing, this.outEasing),
      new FloatKeyframe(this.time, this.value.g, this.inEasing, this.outEasing),
      new FloatKeyframe(this.time, this.value.b, this.inEasing, this.outEasing),
    ];
  }
}

export default RGBColorKeyframe;
