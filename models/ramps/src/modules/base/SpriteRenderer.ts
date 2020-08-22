import * as THREE from 'three';
import RampsModule from '../../RampsModule';
import RampsClock from '../../RampsClock';
import Particle from '../../Particle';
import ParticleSystem from '../../ParticleSystem';

class SpriteRenderer extends RampsModule {
    sprite: THREE.Texture;
    scene: THREE.Scene;

    private _geometry: THREE.Geometry;
    private _mesh: THREE.Mesh;

    constructor(scene: THREE.Scene, sprite: THREE.Texture | string, clock: RampsClock | undefined) {
      super(clock);

      this.scene = scene;
      this.sprite = sprite instanceof THREE.Texture
        ? sprite : new THREE.TextureLoader().load(sprite);
      this._geometry = new THREE.Geometry();
      this._mesh = new THREE.Mesh(this._geometry, new THREE.PointsMaterial());
    }

    setupSystem(particleSystem: ParticleSystem) {
      // Add geometry to scene
      this.scene.add(this._mesh);
    }

    influenceSystem(particleSystem: ParticleSystem) {
      // Update all vertices to match particle data (???)
      this._geometry.vertices = particleSystem.particles.map((particle) => particle.position);
    }
}

export default SpriteRenderer;
