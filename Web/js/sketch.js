var Engine = Matter.Engine,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  Body = Matter.Body,
  Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let ball;
let grounds = [];
let leverLeft;
let leverRight;
let mConstraint;

let points = 0;
let lives = 3;
let framesWait;
let button;

let canvas;

var Width = window.innerWidth;
var Height = window.innerHeight;

var disparo = 0;
var rightPressed;
var leftPressed;

function setup() {
  canvas = createCanvas(Width, Height);
  engine = Engine.create();
  world = engine.world;

  grounds.push(new Boundary(Width / 2, Height - 5, Width, 15, "bottom"));
  grounds.push(new Boundary(Width / 2, 0, Width, 15));
  grounds.push(new Boundary(Width, 0, 20, Height * 2));
  grounds.push(new Boundary(0, 0, 20, Height * 2));

  ball = new Circle((Width / 10) * 9, Height / 2, 15);

  leverLeft = new Lever(
    (Width / 30) * 6 + 5,
    (Height / 10) * 9 - 20,
    (Width / 10) * 4,
    50,
    "left"
  );

  leverRight = new Lever(
    (Width / 30) * 24 - 5,
    (Height / 10) * 9 - 20,
    (Width / 10) * 4,
    50,
    "right"
  );

  World.add(world, grounds);

  Matter.Events.on(engine, "collisionStart", function (event) {
    let pairs = event.pairs;

    pairs.forEach(function (pair) {
      if (pair.bodyA.label === "bottom" && pair.bodyB.label === "pinball") {
        lives -= 1;
        resetUser();
      }
      if (
        (pair.bodyA.label === "pinball" && pair.bodyB.label === "Lever-left") ||
        (pair.bodyA.label === "Lever-left" && pair.bodyB.label === "pinball")
      ) {
        disparo = 1;
      }
      if (
        (pair.bodyA.label === "pinball" &&
          pair.bodyB.label === "Lever-right") ||
        (pair.bodyA.label === "Lever-right" && pair.bodyB.label === "pinball")
      ) {
        disparo = 2;
      }

      if (
        (pair.bodyA.label === "pinball" && pair.bodyB.label === "points") ||
        (pair.bodyA.label === "points" && pair.bodyB.label === "pinball")
      ) {
        boxes.forEach((element) => {
          if (element.body.id === pair.bodyB.id) {
            element.removeFromWorld();

            boxes.splice(boxes.indexOf(element), boxes.indexOf(element) + 1);
            points += 10;
            addPowerCollision(pair.bodyA.angle);
          }
        });
      }
    });
  });

  button = createButton("PLAY");
  button.mousePressed(gameOn);
  button.position(-500, 0);
}

function draw() {
  if (pauseGame > -1) {
    background("#FFFFFF");

    // lives
    for (let i = 0; i < lives; i++) {
      fill("#2988E5");
      noStroke();
      circle((Width / 10) * 1 + i * 50, (Height / 10) * 1, 40);
    }

    if (lives <= 0) {
      resetGame();
      pauseGame = 2;
    }

    if (pauseGame === 2) {
      button.position(Width / 2 - 50, Height / 2 + 50);

      fill("#F8C145");
      rect(
        Width / 2 - ((Width / 10) * 5) / 2,
        (Height / 10) * 3 - ((Height / 10) * 3) / 2 + 20,
        (Width / 10) * 5,
        (Height / 10) * 3,
        50
      );

      textSize(100);
      fill(255, 255, 255);
      textAlign(CENTER);
      text(points, Width / 2, (Height / 10) * 4);
    }

    if (pauseGame < 2) {
      // Datos Sensores
      // 1 - left , 2 - right
      if (varSense[0] === "2") {
        rightPressed = true;
        leftPressed = false;
      } else if (varSense[0] === "1") {
        rightPressed = false;
        leftPressed = true;
      }

      // points
      textSize(32);
      fill("#BDBDBD");
      text(points, (Width / 10) * 9, (Height / 10) * 1);

      if (frameCount % 150 === 0) {
        let size = random(80, 100);

        if (boxes.length < 1) {
          for (let index = 0; index < 2; index++) {
            boxes.push(
              new Box(
                random((Width / 10) * 2, (Width / 10) * 6),
                random((Height / 10) * 2, (Height / 10) * 6),
                size,
                size
              )
            );
          }
        }
      }

      Engine.update(engine);

      for (let ground of grounds) {
        ground.show();
      }

      for (let i = 0; i < boxes.length; i++) {
        var element = boxes[i];
        element.show();
      }

      leverLeft.show();
      leverRight.show();
      ball.show();

      addPower();
    }
  }
}

function resetGame() {
  resetUser();
}
function resetUser() {
  Matter.Body.setPosition(ball.body, { x: (Width / 10) * 9, y: Height / 2 });
  Matter.Body.setVelocity(ball.body, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(ball.body, 0);
}

function addPowerCollision(angle) {
  Body.applyForce(
    ball.body,
    { x: ball.body.position.x, y: ball.body.position.y },
    { x: angle / 2, y: -(angle / 2) }
  );
}

function gameOn() {
  pauseGame = 1;
  points = 0;
  lives = 3;

  button.position(-500, 0);
}

function addPower() {
  if (rightPressed === true && disparo === 2) {
    Body.setVelocity(ball.body, { x: 15, y: -15 });
    disparo = 0;
  }
  if (leftPressed === true && disparo === 1) {
    Body.setVelocity(ball.body, { x: -15, y: -15 });
    disparo = 0;
  }
}
