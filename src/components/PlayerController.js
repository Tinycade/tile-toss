import AFRAME, { THREE } from 'aframe';

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

    // need to wait for the scene to load if I want to do anything with the body
    this.el.sceneEl.addEventListener('loaded', (e) => {
      // ugggg race conditions
      this.el.body.angularFactor.set(0,1,0); // THIS STOPS ROTATION
    });

    const onKeyDown = (e) => {
      switch( e.keyCode ) {
        case 38: // up
        case 87: // w
          this.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          this.moveLeft = true;
          break;

        case 40: // down
        case 83: // a
          this.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          this.moveRight = true;
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

    let inputVelocity = new THREE.Vector3();
    inputVelocity.set(0,0,0);

    if ( this.moveForward ){
        inputVelocity.z = -this.speed * dt;
    }
    if ( this.moveBackward ){
        inputVelocity.z = this.speed * dt;
    }

    if ( this.moveLeft ){
        inputVelocity.x = -this.speed * dt;
    }

    if ( this.moveRight ){
        inputVelocity.x = this.speed * dt;
    }

    this.el.body.velocity.x = inputVelocity.x;
    this.el.body.velocity.z = inputVelocity.z;
  }
});