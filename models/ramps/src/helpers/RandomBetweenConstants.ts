import * as THREE from 'three';

class RandomBetweenConstants {
    constant1: number;
    constant2: number;

    constructor(first: number, second: number) {
      this.constant1 = first < second ? first : second;
      this.constant2 = first < second ? second : first;
    }

    evaluate(): number {
      return (Math.random() * (this.constant2 - this.constant1) + this.constant1);
    }
}

export default RandomBetweenConstants;
