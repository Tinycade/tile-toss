import AFRAME from 'aframe';
import { Vector3 } from 'three';

AFRAME.registerComponent('tile-select', {
  init: function () {
    this.tileFloor = document.querySelector('#floor');

    this.closestNode = undefined;
  },

  tick: function () {
    // assuming this is a sub object, we want the relative world coordinates
    let playerPos = new Vector3();
    this.el.object3D.getWorldPosition(playerPos);
    let numTiles = this.tileFloor.childNodes.length;

    // 1 because we want to cap distance
    let minimum = 100;
    this.closestNode = undefined;
    let currentPos = new Vector3();

    for (let idx = 0; idx < numTiles; idx++) {
      //get tile pos
      //calc distance between player and tile, update min
      let currentNode = this.tileFloor.childNodes[idx];

      // MAYBE IN THE FUTURE WE CALL A FUNCTION ON THE TILE COMPONENT
      // this is fine for now tho
      currentNode.setAttribute("material", "color: white");

      currentNode.object3D.getWorldPosition(currentPos);
      let temp = playerPos.distanceToSquared(currentPos);

      if (temp < minimum) {
        minimum = temp;
        this.closestNode = currentNode;
      }
    }
    
    if (this.closestNode) this.closestNode.setAttribute("material", "color: red");
  },
});