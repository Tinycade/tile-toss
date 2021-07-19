import AFRAME from 'aframe';

AFRAME.registerComponent('enemy-collision', {
  play: function () {
    let hit = false
    // check for collision
    this.el.addEventListener('collide', function (e) {
        setTimeout(function() {
            //if we wanted just enemies to be hit we could make that a component and then only hit enemies
            //make sure this is the first collision with something besides the player character
            if (e.detail.body.el != document.querySelector('#playerChar') && e.detail.body.el!= null && hit == false) {
              //remove both items in the collision and return projectile to pool
              e.detail.body.el.parentNode.removeChild(e.detail.body.el);
              let sceneEl =document.querySelector('#ball-pool');
              sceneEl.components.pool__projectile.returnEntity(this.el);
              hit = true
          }
        }, 0);
    });


  }
});


// AFRAME.registerComponent('enemy', {
//     schema: {
//         isEnemy: {type: 'bool', default: false}
//     },
//     init: function () {
//     },
//     update: function () {
//     },
//     tick: function () {},
//     remove: function () {},
//     pause: function () {},
//     play: function () {
//     }
//   });
  