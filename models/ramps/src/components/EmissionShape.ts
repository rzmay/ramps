/* eslint-disable no-case-declarations */
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

enum EmissionSource {
    Volume,
    Surface,
    Vertices,
}

class EmissionShape {
    static Box = new EmissionShape();
    static Sphere = new EmissionShape(new THREE.SphereGeometry());
    static Cone = new EmissionShape(new THREE.ConeGeometry());
    static Torus = new EmissionShape(new THREE.TorusGeometry());

    source: EmissionSource;

    private _geometry: THREE.Geometry;
    private _surfaceSampler: MeshSurfaceSampler;
    private _vertexNormals: THREE.Vector3[] = [];
    private _raycaster: THREE.Raycaster = new THREE.Raycaster();
    private _mesh: THREE.Mesh;

    constructor(
      geometry: THREE.Geometry | THREE.BufferGeometry = new THREE.BoxGeometry(),
      source: EmissionSource = EmissionSource.Volume,
    ) {
      this.geometry = geometry instanceof THREE.BufferGeometry
        ? new THREE.Geometry().fromBufferGeometry(geometry)
        : geometry;
      this.source = source;

      this._geometry = this.geometry;
      this._mesh = new THREE.Mesh(this.geometry);
      this._surfaceSampler = new MeshSurfaceSampler(new THREE.Mesh(this._geometry));

      this.calculateVertexNormals();
    }

    get geometry(): THREE.Geometry | THREE.BufferGeometry { return this._geometry; }

    set geometry(value: THREE.Geometry | THREE.BufferGeometry) {
      this._geometry = value instanceof THREE.BufferGeometry
        ? new THREE.Geometry().fromBufferGeometry(value)
        : value;

      this._mesh = new THREE.Mesh(this._geometry);
      this._surfaceSampler = new MeshSurfaceSampler(this._mesh);
    }

    get mesh(): THREE.Mesh {
      return this._mesh;
    }

    // Calculate the normal of a point in the geometry volume
    private _calculatePointNormal(point: THREE.Vector3, maxVertices = 5): THREE.Vector3 {
      // Get the closest vertices
      const closest = this._geometry.vertices
        .map((_, index) => index)
        .sort((a, b) => point.distanceTo(this._geometry.vertices[a]) - point.distanceTo(this._geometry.vertices[b]))
        .splice(maxVertices);

      // Get weighted average
      const sumVectors = (vectors: THREE.Vector3[]) => vectors.reduce((a, b) => a.addScaledVector(b, 1));
      const sumArray = (values: number[]) => values.reduce((a, b) => a + b);
      const weightedMean = (factorsArray: THREE.Vector3[], weightsArray: number[]) => sumVectors(
        factorsArray.map((factor, index) => factor.multiplyScalar(weightsArray[index])),
      ).divideScalar(sumArray(weightsArray));

      return weightedMean(
        this._vertexNormals.filter((n, i) => closest.includes(i)),
        closest.map((i) => point.distanceTo(this._geometry.vertices[i])),
      );
    }

    calculateVertexNormals(): void {
      const geometry = (this.geometry as THREE.Geometry);
      const vertexNormals: THREE.Vector3[][] = [];
      for (let i = 0; i < geometry.vertices.length; i += 1) {
        const emptyArray: THREE.Vector3[] = [];
        vertexNormals.push(emptyArray);
      }

      geometry.faces.forEach((face, i) => {
        vertexNormals[face.a].push(face.normal);
        vertexNormals[face.b].push(face.normal);
        vertexNormals[face.c].push(face.normal);
      });

      this._vertexNormals = vertexNormals.map((normals) => {
        const sum = new THREE.Vector3(0, 0, 0);
        normals.forEach((normal) => sum.addScaledVector(normal, 1));
        return sum.divideScalar(normals.length);
      });
    }

    getPoint(): { position: THREE.Vector3, normal: THREE.Vector3 } {
      const geometry = (this.geometry as THREE.Geometry);

      switch (this.source) {
        case EmissionSource.Vertices: // Select random vertex
          const vertexIndex = Math.random() * geometry.vertices.length;
          return {
            position: geometry.vertices[vertexIndex],
            normal: this._vertexNormals[vertexIndex],
          };
        case EmissionSource.Surface: // Use surface sampler to find random point on surface
          let position;
          let normal;
          this._surfaceSampler.sample(position, normal);
          return { position, normal };
        default: // Choose random points in bounding box until one is contained by geometry (volume)
          const { min, max } = this.geometry.boundingBox;
          const randomPoint = new THREE.Vector3(
            THREE.MathUtils.lerp(min.x, max.x, Math.random()),
            THREE.MathUtils.lerp(min.y, max.y, Math.random()),
            THREE.MathUtils.lerp(min.z, max.z, Math.random()),
          );

          this._raycaster.set(randomPoint, new THREE.Vector3(1, 1, 1));
          const intersects = this._raycaster.intersectObject(this.mesh);
          const insideVolume = (intersects.length % 2 === 1);

          // If inside, return; if not, try again
          return insideVolume
            ? { position: randomPoint, normal: this._calculatePointNormal(randomPoint) }
            : this.getPoint();
      }
    }
}

export default EmissionShape;
export { EmissionSource };
