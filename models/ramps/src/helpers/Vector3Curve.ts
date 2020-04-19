import * as THREE from 'three';
import { FloatCurve } from '../../../curves';

class Vector3Curve {
    x: FloatCurve;
    y: FloatCurve;
    z: FloatCurve;

    constructor(x: FloatCurve, y: FloatCurve, z: FloatCurve) {
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
