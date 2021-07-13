import AFRAME from 'aframe';

AFRAME.registerComponent('tile-floor', {
  schema: {
    tileColumnCount: {type: 'int', default: 15},
    tileRowCount: {type: 'int', default: 15},
    tileRadius: {type: 'int', default: 1.5}
  },
  init: function () {
    let offset = this.data.tileRadius * Math.sqrt(3)
    let pointLen = this.data.tileRadius /2
    let x = -5;
    let y = 0;
    let startingX = -this.data.tileColumnCount* offset/2;
    let z = -this.data.tileRowCount * (pointLen-this.data.tileRadius);
    
    for(let c=0; c<this.data.tileColumnCount; c++) {
      if (c % 2 ==0) {
        x = startingX
      }
      else {
        x = startingX - offset/2- 0.1
      }
      for(let r=0; r<this.data.tileRowCount; r++) {
        let tag = document.createElement("a-entity");

        tag.setAttribute("position", x+ " "+ y + " "+ z);
        tag.setAttribute("geometry", "primitive: cylinder; segmentsRadial: 6; radius:"+ this.data.tileRadius + "; height:0.125")  
        tag.setAttribute("static-body", "")  
        tag.setAttribute("id", r.toString()+ c.toString())

        let element = document.getElementById("floor");
        element.appendChild(tag);   
        x = x + offset + 0.2
      }
      z = z - pointLen - this.data.tileRadius - 0.2
    }
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {}
});