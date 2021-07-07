AFRAME.registerComponent('shooting-function', {
    schema: {
      velocity: {type: 'int', default: 15}
    },
    init: function () {
      // this.pause()
      console.log("in init")
      // this.numThrown = 0;
    },
    update: function () {
      console.log("in the update")
      console.log(this.el.object3D.position)
      // the camera variable holds the position of the object
      let camera = document.getElementById("boxThing");
      // changing avatar to the player character will shoot it from them. For now we are shooting from the camera
      let avatar = document.querySelector('#boxThing').object3D
      let avatarDir = avatar.getWorldDirection()
      // console.log(avatarDir)
      cameraPos = camera.getAttribute('position')
      // let sceneEl =document.querySelector('a-scene');
      // let el = sceneEl.querySelector('#yellowBall');
      console.log(this.el)
      el = this.el
      this.el.setAttribute('position', cameraPos)
      console.log("In update")
      el.addEventListener('body-loaded', function (event) {
        console.log("ready freddy")
        console.log(el.body)
        if (el.body !== undefined) {
          console.log(this.object3D.position)
          console.log("hello thereeeee")
          el.body.applyImpulse(
            /* impulse */        new CANNON.Vec3(avatarDir.x, avatarDir.y, -10* avatarDir.z ),
            /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
            );
        }
      });
    },
    tick: function () {
      // console.log("tick time")
      // if (this.numThrown === 0) {
      //   let camera = document.getElementById("boxThing");
      //   // changing avatar to the player character will shoot it from them. For now we are shooting from the camera
      //   let avatar = document.querySelector('#boxThing').object3D
      //   let avatarDir = avatar.getWorldDirection()
      //   // console.log(avatarDir)
      //   cameraPos = camera.getAttribute('position')
      //   // let sceneEl =document.querySelector('a-scene');
      //   // let el = sceneEl.querySelector('#yellowBall');
      //   console.log(this.el)
      //   el = this.el
      //   this.el.setAttribute('position', cameraPos)
      //   console.log("tick function")
      //   el.addEventListener('body-loaded', function (event) {
      //     console.log("ready freddy")
      //     if (el.body !== undefined) {
      //       console.log(this.object3D.position)
      //       console.log("hello thereeeee")
      //       el.body.applyImpulse(
      //         /* impulse */        new CANNON.Vec3(avatarDir.x, avatarDir.y, -10* avatarDir.z ),
      //         /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
      //         );
      //     }
      //   });
      // }
      // this.numThrown +=1
      // let avatar = document.querySelector('[camera]').object3D
      // let avatarDirection = avatar.getWorldDirection()
      // // console.log(avatarDirection)
      // // console.log("hello play time")
      // // console.log(this.data.velocity)
      // let camera = document.getElementById("boxThing");
      // // changing avatar to the player character will shoot it from them. For now we are shooting from the camera
      // // console.log(avatarDir)
      // cameraPos = camera.getAttribute('position')
      // let sceneEl =document.querySelector('a-scene');
      // el = this.el
      // this.el.setAttribute('position', cameraPos)
      // // console.log("In update")
      // el.addEventListener('body-loaded', function (event) {
      //   // console.log("ready freddy")
      //   el.body.applyImpulse(
      //   /* impulse */        new CANNON.Vec3(avatarDir.x, avatarDir.y, -10 * avatarDir.z),
      //   /* world position */ new CANNON.Vec3().copy(el.getAttribute('position'))
      //   );
      // });
    },
    remove: function () {},
    pause: function () {
      console.log("pause")
    },
    play: function () {
    }
  });


window.addEventListener("keydown", function(e){
  let sceneEl =document.querySelector('#ball-pool');
  // let el = document.querySelector('#yellowBall')
  console.log("Let's try this again")
    if(e.keyCode === 32) { // spacebar
      let el = sceneEl.components.pool__projectile.requestEntity();
      console.log(el)
      el.setAttribute('shooting-function', 20)
      el.play()
      // sceneEl.components.pool__projectile.returnEntity(el);
    }
});