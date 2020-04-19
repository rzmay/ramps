import { MathUtils } from 'three';
import Easing from '../Easing';
import Keyframe from './Keyframe';
import lerp = MathUtils.lerp;

class FloatKeyframe extends Keyframe<number> {
  interpolate(keyframe: FloatKeyframe, time: number): number {
    return lerp(
      this.value,
      keyframe.value,
      Easing.inOut(this.inEasing, keyframe.outEasing, time),
    );
  }
}

export default FloatKeyframe;
