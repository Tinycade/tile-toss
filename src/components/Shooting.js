AFRAME.registerComponent('shooting-function', {
    schema: {
      velocity: {type: 'int', default: 15}
    },
    init: function () {
      console.log("in init")
    },
    udpate: function () {
      console.log("in the update")
      console.log(this.el.object3D.position)
    },
    tick: function () {
      // checks for when the ball is below y= -100, then returns it to the pool
      let sceneEl =document.querySelector('#ball-pool');
      // console.log(this.el.getAttribute('position').y )
      if (this.el.getAttribute('position').y <-100) {
        sceneEl.components.pool__projectile.returnEntity(this.el);
        console.log("retured!")
      }
    },
    remove: function () {},
    pause: function () {
      console.log("pause")
    },
    play: function () {
      // this avatar will eventually be the player character
      let avatar = document.querySelector('#boxThing').object3D
      let avatarDir = avatar.getWorldDirection()
      console.log(avatarDir)
      currentPosition = this.el.getAttribute('position')
      console.log(this)
      el = this.el
      // this.el.setAttribute('position', cameraPos)
      let position = [currentPosition.x,currentPosition.y, currentPosition.z ]
      let unitVecDiv = Math.sqrt(Math.pow(currentPosition.x, 2)+ Math.pow(currentPosition.y, 2) + Math.pow(currentPosition.z, 2))
      // finds the correct length of each velocity component so that each throw has the same total velocity
      for (let x = 0; x < 3; x++) {
        position[x] = position[x]/unitVecDiv * this.data.velocity
      }
      console.log(position)
      // applies the impulse the body (waiting for load isn't necessary since we are calling on pool components which are already loaded)
      el.body.applyImpulse(
        /* impulse */        new CANNON.Vec3(avatarDir.x, avatarDir.y, avatarDir.z ),
                            //  new CANNON.Vec3(1, 1, 1 ),
        /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
        );
    }
  });


  // listens for spacebar to be pressed
window.addEventListener("keydown", function(e){
  let sceneEl =document.querySelector('#ball-pool');
    if(e.keyCode === 32) { // spacebar
      // takes the entity from the pool
      let el = sceneEl.components.pool__projectile.requestEntity();
      let camera = document.getElementById("boxThing");
      let cameraPos = camera.getAttribute('position')
      let currentPos = sceneEl.getAttribute('position')
      // sets the ball position and rotation to that of the character
      el.setAttribute('position', (-currentPos.x+cameraPos.x)+" "+(-currentPos.y+cameraPos.y) +" "+ (-currentPos.z + cameraPos.z))
      el.setAttribute('rotation', camera.getAttribute("rotation"))
      el.play()
    }
});