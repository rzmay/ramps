import * as THREE from 'three';
import { Curve } from '../../../curves';

class Vector3Curve {
    x: Curve<number>;
    y: Curve<number>;
    z: Curve<number>;

    constructor(x: Curve<number>, y: Curve<number>, z: Curve<number>) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    evaluate(time: number): THREE.Vector3 {
      return new THREE.Vector3(
        this.x.evaluate(time),
        this.y.evaluate(time),
        this.z.evaluate(time),
      );
    }
}

export default Vector3Curve;
