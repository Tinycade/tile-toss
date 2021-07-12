import AFRAME from 'aframe';

AFRAME.registerComponent('tile-select', {
  schema: {
  },
  init: function () {
  },
  _update: function () {
  },
  get update() {
    return this._update;
  },
  set update(value) {
    this._update = value;
  },
  tick: function () {
    let playerPos = this.el.getAttribute('position');
    let tileFloor = document.querySelector('#floor');
    // let tileFloor = document.getElementById('floor')
    let numTiles = tileFloor.childNodes.length
    // console.log(tileFloor.childNodes.length)
    // console.log(tileList);
    let minimum = 10000000000000;
    let closestNode = tileFloor.childNodes[0]
    for (let idx = 0; idx < numTiles; idx++) { //but how to not hardcode 15????
      // console.log(document.querySelector(x.toString()+y.toString()))
      //get tile pos
      //calc distance between player and tile, update min
      let current = tileFloor.childNodes[idx]
      current.setAttribute("material", "color: white")
      let currNode = tileFloor.childNodes[idx].getAttribute('position')
      // let currX = currNode.x
      // console.log(currNode)
      // console.log(tileFloor.childNodes[x])
      let temp = Math.sqrt(Math.pow(playerPos.x-currNode.x, 2) + Math.pow(playerPos.z-currNode.z, 2))
      // console.log(temp)
      if (temp < minimum) {
        minimum = temp
        closestNode = tileFloor.childNodes[idx]
      }
      // console.log(closestNode.getAttribute('id'))
      // closestNode.setAttribute("color", "red");
      // closestNode.setAttribute("position", "0.0.0")
    }
    closestNode.setAttribute("material", "color: red")
    // console.log(closestNode)
  },
  remove: function () {},
  pause: function () {},
  play: function () {
  }
});