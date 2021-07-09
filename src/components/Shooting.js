AFRAME.registerComponent('shooting', {
    schema: {
      velocity: {type: 'int', default: 15}
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
      let avatar = document.querySelector('#boxThing').object3D
      let avatarDir = avatar.getWorldDirection()
      currentPosition = this.el.getAttribute('position')
      el = this.el
      let position = [currentPosition.x,currentPosition.y, currentPosition.z ]
      let unitVecDiv = Math.sqrt(Math.pow(currentPosition.x, 2)+ Math.pow(currentPosition.y, 2) + Math.pow(currentPosition.z, 2))
      // finds the correct length of each velocity component so that each throw has the same total velocity
      for (let x = 0; x < 3; x++) {
        position[x] = position[x]/unitVecDiv * this.data.velocity
      }
      // applies the impulse the body (waiting for load isn't necessary since we are calling on pool components which are already loaded)
      el.body.applyImpulse(
        /* impulse */        new CANNON.Vec3(avatarDir.x, avatarDir.y, avatarDir.z ),
                            //  new CANNON.Vec3(1, 1, 1 ),
        /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
        );
    }
  });
AFRAME.registerComponent('shooter', {
  play: function() {
  // listens for spacebar to be pressed
  let player = this.el
  window.addEventListener("keydown", function(e){
    let sceneEl =document.querySelector('#ball-pool');
      if(e.keyCode === 32) { // spacebar
        // takes the entity from the pool
        let el = sceneEl.components.pool__projectile.requestEntity();
        let playerPov = player
        let playerPos = playerPov.getAttribute('position')
        let currentPos = sceneEl.getAttribute('position')
        // sets the ball position and rotation to that of the character
        el.setAttribute('position', (-currentPos.x+playerPos.x)+" "+(-currentPos.y+playerPos.y) +" "+ (-currentPos.z + playerPos.z))
        el.setAttribute('rotation', playerPov.getAttribute("rotation"))
        let elComp = el.components.shooting
        el.play()
        // elComp.shoot()
      }
  });
  }
});