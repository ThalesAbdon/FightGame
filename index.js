const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.6;
class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.attacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 700,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0,
  },
  color: "purple",
});

enemy.draw();

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function rectangularCollision({ rectangule1, rectangule2 }) {
  return (
    (rectangule1.attackBox.position.x + rectangule1.attackBox.width >=
      rectangule2.position.x) &
    (rectangule1.attackBox.position.x <=
      rectangule2.position.x + rectangule2.width) &
    (rectangule1.attackBox.position.y + rectangule1.attackBox.height >=
      rectangule2.position.y) &
    (rectangule1.attackBox.position.y <=
      rectangule2.position.y + rectangule2.height)
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed & (player.lastKey === "a")) {
    player.velocity.x = -5;
  } else if (keys.d.pressed & (player.lastKey === "d")) {
    player.velocity.x = 5;
  }

  if (keys.ArrowLeft.pressed & (enemy.lastKey === "ArrowLeft")) {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed & (enemy.lastKey === "ArrowRight")) {
    enemy.velocity.x = 5;
  }
  if (
    rectangularCollision({ rectangule1: player, rectangule2: enemy }) &
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("player hit!");
  }

  if (
    rectangularCollision({ rectangule1: enemy, rectangule2: player }) &
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("enemy hit!");
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      player.velocity.y = -20;
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case " ":
      player.attack();
      break;

    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;

    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "0":
      enemy.isAttacking = true;
      break;
  }
});
