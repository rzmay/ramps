import Keyframe from './Keyframe';
import FloatKeyframe from './FloatKeyframe';

class ObjectKeyframe extends Keyframe<object> {
  interpolate(keyframe: ObjectKeyframe, time: number): object {
    const result: object = {};

    Object.keys(this.value).forEach((key) => {
      if (typeof this.value[key] === 'number') {
        result[key] = this.floatKeyframe(key).interpolate(keyframe.floatKeyframe(key), time);
      }
    });

    return result;
  }

  floatKeyframe(key: any): FloatKeyframe {
    if (this.value[key] === undefined
            || typeof this.value[key] !== 'number'
    ) {
      return new FloatKeyframe(this.time, 0, this.inEasing, this.outEasing);
    }

    return new FloatKeyframe(this.time, this.value[key] as number, this.inEasing, this.outEasing);
  }
}

export default ObjectKeyframe;
