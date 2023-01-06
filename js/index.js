const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.6;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
});

const poster = new Sprite({
  position: {
    x: 625,
    y: 232.5,
  },
  imageSrc: "./assets/poster.png",
  scale: 0.15,
  framesMax: 15,
});

const player = new Fighter({
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
  imageSrc: "./assets/player/idle.png",
  framesMax: 10,
  scale: 3.5,
  offset: {
    x: 160,
    y: 160,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/player/idle.png",
      framesMax: 10,
      framesHold: 4,
    },
    run: {
      imageSrc: "./assets/player/Run.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    jump: {
      imageSrc: "./assets/player/Jump.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    fall: {
      imageSrc: "./assets/player/fall.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    attack: {
      imageSrc: "./assets/player/Attack3.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 2,
    },
  },
});

const enemy = new Fighter({
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

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  poster.update();
  player.update();
  //enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed & (player.lastKey === "a")) {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed & (player.lastKey === "d")) {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
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
    enemy.health -= 20;
    document.querySelector("#enemy-health").style.width = enemy.health + "%";
  }

  if (
    rectangularCollision({ rectangule1: enemy, rectangule2: player }) &
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#player-health").style.width = player.health + "%";
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
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
