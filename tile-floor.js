const AFRAME = window.AFRAME;
AFRAME.registerComponent('tile-floor', {
  schema: {
    tileColumnCount: {type: 'int', default: 15},
    tileRowCount: {type: 'int', default: 15},
    tileRadius: {type: 'int', default: 1.5}
  },
  init: function () {
    console.log("In tile-floor component")
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
        x = startingX - offset/2
      }
      for(let r=0; r<this.data.tileRowCount; r++) {
        let tag = document.createElement("a-entity");
        console.log(x,y,z)
        tag.setAttribute("position", x+ " "+ y + " "+ z);
        tag.setAttribute("geometry", "primitive: cylinder; segmentsRadial: 6; radius:"+ this.data.tileRadius + "; height:0.125")  
        tag.setAttribute("id", r.toString()+ c.toString())
        console.log(tag.getAttribute("position"))
        let element = document.getElementById("floor");
        element.appendChild(tag);   
        x = x + offset + 0.2
      }
      z = z - pointLen - this.data.tileRadius - 0.2
    }
    console.log(element)
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {}
});