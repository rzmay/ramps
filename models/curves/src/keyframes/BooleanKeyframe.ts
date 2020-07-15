import Keyframe from './Keyframe';
import NumberKeyframe from './NumberKeyframe';
import Easing from '../Easing';

class BooleanKeyframe extends Keyframe<boolean> {
    truthThreshold: number;

    protected numberKeyframe: NumberKeyframe;

    constructor(
      time: number,
      value: boolean,
      inEasing: Easing = Easing.cubic,
      outEasing: Easing | undefined = undefined,
      truthThreshold = 0.5,
    ) {
      super(time, value, inEasing, outEasing);

      this.truthThreshold = truthThreshold;

      this.numberKeyframe = new NumberKeyframe(time, (value ? 1 : 0), inEasing, outEasing);
    }

    interpolate(keyframe: BooleanKeyframe, time: number): boolean {
      const value = this.numberKeyframe.interpolate(keyframe.numberKeyframe, time);
      return value > this.truthThreshold;
    }
}

export default BooleanKeyframe;
