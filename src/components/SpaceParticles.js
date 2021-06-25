import * as THREE from 'three';
// const THREE = AFRAME.THREE;

// Some local constants, maybe make this params of the component
const PARTICLE_COUNT = 1000;
const PARTICL_CLOUD_SIZE = 500;
const SPAWN_TIME_MAX = 5;

const vert = `
  uniform float time;
  uniform vec3 camera_pos;
  attribute float offsetTime;
  varying float vAlpha;

  const float minPointScale = 0.1;
  const float maxPointScale = 0.7;
  const float maxDistance   = 100.0;

  void main() {
    gl_Position = projectionMatrix 
        * modelViewMatrix
        * vec4(position, 1.0);

    float cameraDist = distance(position.xyz, camera_pos);
    float pointScale = 1.0 - (cameraDist / maxDistance);
    pointScale = max(pointScale, minPointScale);
    pointScale = min(pointScale, maxPointScale);
    gl_PointSize = 20.0 * pointScale;

    vAlpha = (cos((time + offsetTime) / 2000.0) * 0.3) + 0.8;
  }`;

const frag = `
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
  }`;

function random(a, b) {
  const dif = b - a;
  return (a + (Math.random() * dif));
}

AFRAME.registerShader('particles', {
  schema: {
    time: { type: 'time', is: 'uniform' },
    camera_pos: { type: 'vec3', is: 'uniform' },
    offsetTime: { type: 'array', is: 'attribute' },
    position: { type: 'array', is: 'attribute' },
  },

  vertexShader: vert,
  fragmentShader: frag,
});

AFRAME.registerComponent('space-particles', {
  schema: {},

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    var data = this.data;
    var el = this.el;
    this.camPos = new THREE.Vector3(0,0,0);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Array(PARTICLE_COUNT * 3).fill(0.0), 3));
    this.geometry.setAttribute('offsetTime', new THREE.Float32BufferAttribute(new Array(PARTICLE_COUNT).fill(0), 1));

    const positionAttribute = this.geometry.getAttribute('position');
    const offsetTimeAttribute = this.geometry.getAttribute('offsetTime');
    // set up particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positionAttribute.array[i * 3] = random(-PARTICL_CLOUD_SIZE, PARTICL_CLOUD_SIZE);
      positionAttribute.array[i * 3 + 1] = random(-PARTICL_CLOUD_SIZE, PARTICL_CLOUD_SIZE);
      positionAttribute.array[i * 3 + 2] = random(-PARTICL_CLOUD_SIZE, PARTICL_CLOUD_SIZE);

      offsetTimeAttribute.array[i] = Math.random() * 10000;
    }

    positionAttribute.needsUpdate = true;
    offsetTimeAttribute.needsUpdate = true;

    // Create mesh.
    this.mesh = new AFRAME.THREE.Points(this.geometry, this.material);
    // console.log(this.mesh)
    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh);
  },

  tick: function(time, dt) {
    this.camPos.copy(this.el.sceneEl.camera.el.getAttribute('position'));
    this.el.setAttribute('material', 'camera_pos', this.camPos);
    // this.spawnTimer += dt;
    // if (this.spawnTimer >= SPAWN_TIME_MAX) {
    //   this.spawnTimer = 0;

    //   this.spawnParticle(time);

    //   this.currentParticle += 1;
      
    //   // Reset particle counter
    //   if (this.currentParticle >= PARTICLE_COUNT) {
    //     this.currentParticle = 0;
    //   }
    // }
  }
});
