class Lever {
  constructor(x, y, w, h, p, rotate = 0.2) {
    let options = {
      chamfer: { radius: 10 },
      label: `Lever-${p}`,
      friction: 0.3,
      restitution: 0.6,
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    
    if (p === "left"){
      Body.rotate( this.body, rotate);
      this.rotate = rotate;
    }else{
      Body.rotate( this.body, -rotate);
      this.rotate = -rotate;
    }

    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    // strokeWeight(1);
    // stroke(205);
    noStroke();
    fill("#BDBDBD");
    rect(0, 0, this.w, this.h, 20);
    pop();
  }
}
