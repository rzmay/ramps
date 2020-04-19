import * as THREE from 'three';

class RandomBetweenColors {
    color1: THREE.Color;
    color2: THREE.Color;

    constructor(first: THREE.Color, second: THREE.Color) {
      this.color1 = first;
      this.color2 = second;
    }

    evaluate(): THREE.Color {
      return this.color1.lerp(this.color2, Math.random());
    }
}

export default RandomBetweenColors;
