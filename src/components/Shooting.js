AFRAME.registerComponent('shooting', {
    schema: {
      velocity: {type: 'int', default: 50}
    },
    tick: function () {
      // checks for when the ball is below y= -100, then returns it to the pool
      let sceneEl =document.querySelector('#ball-pool');
      if (this.el.getAttribute('position').y <-100) {
        sceneEl.components.pool__projectile.returnEntity(this.el);
      }
    },
    play: function() {
        this.shoot();
    },
    shoot: function () {
      // this avatar will eventually be the player character
      // this.el.setAttribute()
      let avatar = this.el.object3D
      let avatarDir = avatar.getWorldDirection()
      currentPosition = this.el.getAttribute('position')
      // console.log(currentPosition)
      el = this.el
      let position = [avatarDir.x,avatarDir.y+25, avatarDir.z ]
      let unitVecDiv = Math.sqrt(Math.pow(currentPosition.x, 2)+ Math.pow(currentPosition.y, 2) + Math.pow(currentPosition.z, 2))
      // finds the correct length of each velocity component so that each throw has the same total velocity
      for (let x = 0; x < 3; x++) {
        position[x] = position[x]/unitVecDiv * this.data.velocity
      }
      // applies the impulse the body (waiting for load isn't necessary since we are calling on pool components which are already loaded)
      el.body.applyImpulse(
        /* impulse */        new CANNON.Vec3(position[0], position[1], position[2] ),
                            //  new CANNON.Vec3(1, 1, 1 ),
        /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
        );
    }
  });