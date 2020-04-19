import RandomBetweenConstants from './RandomBetweenConstants';
import RandomBetweenCurves from './RandomBetweenCurves';

export interface DynamicVector3Initializer {
    x: RandomBetweenConstants | RandomBetweenCurves;
    y: RandomBetweenConstants | RandomBetweenCurves;
    z: RandomBetweenConstants | RandomBetweenCurves;
}
