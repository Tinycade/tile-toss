import AFRAME from 'aframe';
import { Vector3 } from 'three';

AFRAME.registerComponent('tile-pickup', {
  init: function () {
    this.tileEquipped = false
    this.selectedTile = undefined
    this.projectile = undefined
  },
  play: function () {
    this.tileEquipped = false
    let equipped = this.tileEquipped
    let tileFloor = document.querySelector('#floor')
    let player = this.el
    window.addEventListener("keydown", function(e){
        if(e.keyCode === 32) { // spacebar
          // check for if the player has a tile
          if (equipped === false){
            // find the nearest tile
            let numTiles = tileFloor.childNodes.length;
            for (let x = 0; x < numTiles; x+=1){
              let currentNode = tileFloor.childNodes[x];
              if (currentNode.getAttribute("material").color == 'red') {
                this.selectedTile = currentNode
                break
              }
            }
            //if tile within radius, pick it up
            if (this.selectedTile != undefined) {
              this.selectedTile.parentNode.removeChild(this.selectedTile);
              document.querySelector('#carriedTile').setAttribute('visible', "true")
              this.tileEquipped = true
              equipped = true
            }
          }
          // if tile selected, throw it forward
          else if(equipped=== true ){
            document.querySelector('#carriedTile').setAttribute('visible', "false")
            this.tileEquipped = false
            equipped = false
            // copy code from shooter in here
            let sceneEl =document.querySelector('#ball-pool');
            let el = sceneEl.components.pool__projectile.requestEntity();
            let playerPov = player
            let playerPos = playerPov.getAttribute('position')
            let currentPos = sceneEl.getAttribute('position')
            // sets the ball position and rotation to that of the character
            el.setAttribute('position', (-currentPos.x+playerPos.x)+" "+(-currentPos.y+playerPos.y+.5) +" "+ (-currentPos.z + playerPos.z))
            // rotate the tile being thrown
            let tempRot = [playerPov.getAttribute("rotation").x, playerPov.getAttribute("rotation").y + 90, playerPov.getAttribute("rotation").z]
            el.setAttribute('rotation', ""+tempRot[0] + " "+tempRot[1] + " " + tempRot[2])
            el.setAttribute('roation', ""+ playerPov.getAttribute("rotation").x + " " + playerPov.getAttribute("rotation").y+45 + " " + playerPov.getAttribute("rotation").z + "")
            let elComp = el.components.shooting
            el.play()
            // elComp.shoot()
          }
        }
    });
  }
});