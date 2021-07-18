class Box {
  constructor(x, y, w, h) {
    let options = {
      label: "points",
      friction: 0.3,
      restitution: 0.6,
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    if (random(0, 1) < 0.5) {
      this.color = "#48A046";
    } else {
      this.color = "#F8CDD0";
    }
  }

  removeFromWorld() {
    World.remove(world, this.body);
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

    fill(this.color);

    rect(0, 0, this.w, this.h);
    pop();
  }
}
