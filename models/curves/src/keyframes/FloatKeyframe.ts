import { MathUtils } from 'three/src/math/MathUtils';
import Easing from '../Easing';
import Keyframe from './Keyframe';
import lerp = MathUtils.lerp;

class FloatKeyframe extends Keyframe<number> {
  interpolate(keyframe: FloatKeyframe, time: number, smoothing: number = 0.25): number {
    return lerp(
      this.value,
      keyframe.value,
      Easing.interpolate(this.inEasing, keyframe.outEasing, time, smoothing),
    );
  }
}

export default FloatKeyframe;
