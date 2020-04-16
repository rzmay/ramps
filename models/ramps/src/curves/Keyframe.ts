import Easing from './Easing';

export interface Keyframe {
    time: number;
    value: any;

    inEasing: Easing;
    outEasing: Easing;

    interpolate(keyframe: Keyframe, time: number): any;
    interpolateRealtime(keyframe: Keyframe, time: number): any;
}
