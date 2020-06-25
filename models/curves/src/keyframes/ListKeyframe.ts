import Keyframe from './Keyframe';
import NumberKeyframe from './NumberKeyframe';
import Easing from "../Easing";

class ListKeyframe extends Keyframe<number[]> {
    clamp: boolean;

    constructor(
        time: number,
        value: number[],
        inEasing: Easing = Easing.cubic,
        outEasing: Easing | undefined = undefined,
        clamp: boolean = false,
    ) {
        super(time, value, inEasing, outEasing);

        this.clamp = clamp;
    }

    interpolate(keyframe: ListKeyframe, time: number): number[] {
        const numberKeyframes = this.toNumberKeyframes();
        const nextNumberKeyframes = keyframe.toNumberKeyframes();
        const defaultKeyframe = new NumberKeyframe(keyframe.time, 0, this.inEasing);
        const defaultNextKeyframe = new NumberKeyframe(this.time, 0, keyframe.inEasing);

        const shorter = numberKeyframes.length <= nextNumberKeyframes.length;
        if (this.clamp ? shorter : !shorter) {
            return numberKeyframes.map((v, i) => v.interpolate(nextNumberKeyframes[i] ?? defaultKeyframe, time));
        }

        return nextNumberKeyframes.map((v, i) => v.interpolate(numberKeyframes[i] ?? defaultNextKeyframe, 1 - time));
    }

    toNumberKeyframes(): NumberKeyframe[] {
        return this.value.map((v) => new NumberKeyframe(this.time, v, this.inEasing, this.outEasing));
    }
}

export default ListKeyframe;