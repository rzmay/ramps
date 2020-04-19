import * as THREE from 'three';
import * as Curves from '../../../curves';

class RandomBetweenColorCurves {
    curve1: Curves.ColorCurve;
    curve2: Curves.ColorCurve;

    constructor(first: Curves.ColorCurve, second: Curves.ColorCurve) {
      this.curve1 = first;
      this.curve2 = second;
    }

    evaluate(time: number): THREE.Color {
      const bounds = [this.curve1.evaluate(time), this.curve2.evaluate(time)].sort();
      const min = new THREE.Color(bounds[0].r, bounds[0].g, bounds[0].b);
      const max = new THREE.Color(bounds[1].r, bounds[1].g, bounds[1].b);

      return min.lerp(max, Math.random());
    }
}

export default RandomBetweenColorCurves;
