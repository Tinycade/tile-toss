import AFRAME from 'aframe';

AFRAME.registerComponent('collision', {
  init: function () {
    this.hitTarget  = false
    this.hitSelf = false
    this.enemy = undefined
  },
  tock: function () {
    //check to see if any collision has occured
    if (this.hitTarget == true){
      if (this.enemyEntity != null) {
          this.enemyEntity.parentNode.removeChild(this.enemyEntity);
          this.enemyEntity = null
      }
      this.hitTarget = false
    }
    if (this.hitSelf == true) {
      let sceneEl =document.querySelector('#ball-pool');
      sceneEl.components.pool__projectile.returnEntity(this.el);
    }
  },
  play: function () {
    let self = this.el
    //set event listener for collision
    this.el.addEventListener('collide', function (e) {
          if (e.detail.body.el.classList.contains('enemy')) {
            self.components.collision.hitEnemy(e.detail.body.el)
            self.components.collision.hitFloor()
          }
          if (e.detail.body.el.classList.contains('floor')) {
            self.components.collision.hitFloor()
          }
    });
  },
  hitEnemy: function (enemyEntity) {
    this.hitTarget = true
    this.enemyEntity = enemyEntity
  },
  hitFloor: function () {
    this.hitSelf = true
  }
});