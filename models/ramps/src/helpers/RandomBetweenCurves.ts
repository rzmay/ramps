import * as THREE from 'three';
import * as Curves from '../../../curves';

class RandomBetweenCurves {
    curve1: Curves.Curve<number>;
    curve2: Curves.Curve<number>;

    constructor(first: Curves.Curve<number>, second: Curves.Curve<number>) {
      this.curve1 = first;
      this.curve2 = second;
    }

    evaluate(time: number): number {
      const bounds = [this.curve1.evaluate(time), this.curve2.evaluate(time)].sort();
      const min = bounds[0];
      const max = bounds[1];

      return (Math.random() * (max - min) + min);
    }
}

export default RandomBetweenCurves;
