import colorString from 'color-string';
import Keyframe from './Keyframe';
import NumberKeyframe from './NumberKeyframe';
import BooleanKeyframe from './BooleanKeyframe';
import StringKeyframe from './StringKeyframe';
import Easing from '../Easing';
import RGBColorKeyframe from './RGBColorKeyframe';

class ObjectKeyframe extends Keyframe<object> {
  protected conversionMethods: {
    'number': (key: any) => Keyframe<number>,
    'string': (key: any) => Keyframe<string>,
    'boolean': (key: any) => Keyframe<boolean>,
    'object': (key: any) => Keyframe<object>,
  };

  constructor(
    time: number,
    value: object,
    inEasing: Easing = Easing.cubic,
    outEasing: Easing | undefined = undefined,
  ) {
    super(time, value, inEasing, outEasing);

    this.conversionMethods = {
      number: this.numberKeyframe,
      string: this.stringKeyframe,
      boolean: this.booleanKeyframe,
      object: this.objectKeyframe,
    };
  }

  interpolate(keyframe: ObjectKeyframe, time: number): object {
    const result: object = {};

    Object.keys(this.value).forEach((key) => {
      // Check if value is color string
      if (typeof this.value[key] === 'string' && colorString.get(this.value[key]) !== null) {
        const color = colorString.get(this.value[key]);
        /*
         * Solve with rgb keyframes
         * conversion back to original color model fixes discrepancies
         * really all that's necessary is a Vector3 keyframe, rgb works
         */
        const currentColor = this.colorKeyframe(key);
        const nextColor = keyframe.colorKeyframe(key);

        const colorResult = currentColor.color.interpolate(nextColor.color, time);
        const alphaResult = currentColor.alpha.interpolate(nextColor.alpha, time);

        // Convert back to color string, set value
        result[key] = colorString.to[color.model](
          [colorResult.r, colorResult.g, colorResult.b],
          alphaResult,
        );
      } else {
        // Otherwise check primitives
        Object.keys(this.conversionMethods).forEach((type) => {
          // eslint-disable-next-line valid-typeof
          if (typeof this.value[key] === type) {
            result[key] = this.conversionMethods[type](key).interpolate(
              keyframe.conversionMethods[type](key),
              time,
            );
          }
        });
      }
    });

    return result;
  }

  booleanKeyframe(key: any): BooleanKeyframe {
    if (this.value[key] === undefined
        || typeof this.value[key] !== 'boolean'
    ) {
      return new BooleanKeyframe(this.time, false, this.inEasing, this.outEasing);
    }

    return new BooleanKeyframe(
      this.time,
      this.value[key] as boolean,
      this.inEasing,
      this.outEasing,
    );
  }

  numberKeyframe(key: any): NumberKeyframe {
    if (this.value[key] === undefined
            || typeof this.value[key] !== 'number'
    ) {
      return new NumberKeyframe(this.time, 0, this.inEasing, this.outEasing);
    }

    return new NumberKeyframe(this.time, this.value[key] as number, this.inEasing, this.outEasing);
  }

  stringKeyframe(key: any): StringKeyframe {
    if (this.value[key] === undefined
        || typeof this.value[key] !== 'string'
    ) {
      return new StringKeyframe(this.time, '', this.inEasing, this.outEasing);
    }

    return new StringKeyframe(this.time, this.value[key] as string, this.inEasing, this.outEasing);
  }

  objectKeyframe(key: any): ObjectKeyframe {
    if (this.value[key] === undefined
        || typeof this.value[key] !== 'object'
    ) {
      return new ObjectKeyframe(this.time, {}, this.inEasing, this.outEasing);
    }

    return new ObjectKeyframe(this.time, this.value[key] as object, this.inEasing, this.outEasing);
  }

  colorKeyframe(key: any): { color: RGBColorKeyframe, alpha: NumberKeyframe } {
    const color = colorString.get(this.value[key] ?? 'invalid key');

    if (this.value[key] === undefined
      || typeof this.value[key] !== 'string'
      || colorString.get(this.value[key]) !== null) {
      return {
        color: new RGBColorKeyframe(
          this.time,
          { r: 255, g: 255, b: 255 },
          this.inEasing,
          this.outEasing,
        ),
        alpha: new NumberKeyframe(this.time, 1, this.inEasing, this.outEasing),
      };
    }

    return {
      color: new RGBColorKeyframe(
        this.time,
        { r: color.value[0], g: color.value[1], b: color.value[2] },
        this.inEasing,
        this.outEasing,
      ),
      alpha: new NumberKeyframe(this.time, color.value[3], this.inEasing, this.outEasing),
    };
  }
}

export default ObjectKeyframe;
