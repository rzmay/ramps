import Keyframe from './Keyframe';
import FloatKeyframe from './FloatKeyframe';

class ListKeyframe extends Keyframe<number[]> {
  interpolate(keyframe: ListKeyframe, time: number): number[] {
    const floatKeyframes = this.toFloatKeyframes();
    const nextFloatKeyframes = keyframe.toFloatKeyframes();

    if (floatKeyframes.length <= nextFloatKeyframes.length) {
      return floatKeyframes.map((v, i) => v.interpolate(nextFloatKeyframes[i], time));
    }
    return nextFloatKeyframes.map((v, i) => v.interpolate(floatKeyframes[i], 1 - time));
  }

  toFloatKeyframes(): FloatKeyframe[] {
    return this.value.map((v) => new FloatKeyframe(this.time, v, this.inEasing, this.outEasing));
  }
}

export default ListKeyframe;
