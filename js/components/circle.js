class Circle {
  constructor(x, y, r) {
    let options = {
      label: 'pinball',
      friction: 0.0001,
      restitution: 1
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
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
    // stroke(255);
    noStroke();
    fill("#2988E5");
    ellipse(0, 0, this.r * 2);
    pop();
  }
}