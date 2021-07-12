import AFRAME, { THREE } from 'aframe';
import Vec2 from '../utils/Vec2';
import { lerp } from '../utils/MathFunctions';

AFRAME.registerComponent('player-controller', {
  schema: {},
  // using keys for dev now
  init: function () {
    this.moveBackward = false;
    this.moveForward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.speed = 0.2;

    this.euler = new THREE.Euler();

    // this.moveAngle = 0;
    this.targetFwd = new Vec2(1, 0);
    this.fwd = new Vec2(1, 0);
    
    // need to wait for the scene to load if I want to do anything with the body
    this.el.sceneEl.addEventListener('loaded', (e) => {
      // ugggg race conditions
      // console.log(this.el.body.quaternion);
      this.el.body.angularFactor.set(0,0,0); // THIS STOPS ROTATION
    });

    const onKeyDown = (e) => {
      switch( e.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = true;
          this.targetFwd.setFromAngle(Math.PI / 2);
          break;

        case 37: // left
        case 65: // a
          this.moveLeft = true;
          this.targetFwd.setFromAngle(Math.PI);
          break;

        case 40: // down
        case 83: // a
          this.moveBackward = true;
          this.targetFwd.setFromAngle(-Math.PI / 2);
          break;

        case 39: // right
        case 68: // d
          this.moveRight = true;
          this.targetFwd.setFromAngle(0);
          break;
      }
    }

    const onKeyUp = (e) => {
      switch( e.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = false;
          break;

        case 37: // left
        case 65: // a
          this.moveLeft = false;
          break;

        case 40: // down
        case 83: // a
          this.moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          this.moveRight = false;
          break;
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  },

  tick: function(time, dt) {
    // use the keys to set a forward vector to seek and have it seek that
    // console.log(this.el.object3D.rotation.y);
    // let inputVelocity = new THREE.Vector3();
    // inputVelocity.set(0,0,0);
    // this.object3D.rotation.y = this.moveAngle;
    let speed = this.speed;
    if (!(this.moveForward || this.moveBackward || this.moveLeft || this.moveRight)) speed = 0;

    this.fwd.set(
      lerp(this.fwd.x, this.targetFwd.x, 0.15 * speed),
      lerp(this.fwd.y, this.targetFwd.y, 0.15 * speed)
    );
    //this.el.body.rotation.set(0, this.moveAngle, 0);

    this.el.body.quaternion.setFromEuler(0, this.fwd.getAngle(), 0);
    // const inputVelocity = Vec2.fromAngle(this.moveAngle).scale(speed * dt);
    // console.log(inputVelocity.x, inputVelocity.y);

    this.el.body.velocity.x = this.fwd.x * speed * dt;
    this.el.body.velocity.z = -this.fwd.y * speed * dt;
  }
});