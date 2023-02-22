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
    idleReverse: {
      imageSrc: "./assets/player/idle_Reverse.png",
      framesMax: 10,
      framesHold: 4,
    },
    run: {
      imageSrc: "./assets/player/Run.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    runReverse: {
      imageSrc: "./assets/player/Run_Reverse.png",
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
    jumpReverse: {
      imageSrc: "./assets/player/Jump_Reverse.png",
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
    fallReverse: {
      imageSrc: "./assets/player/fall_Reverse.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    attack: {
      imageSrc: "./assets/player/attack.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    attackReverse: {
      imageSrc: "./assets/player/attack_Reverse.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    attackAux: {
      imageSrc: "./assets/player/attack.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    takeHit: {
      imageSrc: "./assets/player/takeHit.png",
      framesMax: 3,
    },
    takeHitReverse: {
      imageSrc: "./assets/player/takeHit_Reverse.png",
      framesMax: 3,
    },
    takeHitAux: {
      imageSrc: "./assets/player/takeHit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./assets/player/death.png",
      framesMax: 7,
      scale: 3.5,
    },
    deathReverse: {
      imageSrc: "./assets/player/death_Reverse.png",
      framesMax: 7,
      scale: 3.5,
    },
    deathAux: {
      imageSrc: "./assets/player/death.png",
      framesMax: 7,
      scale: 3.5,
    },
  },
  attackBox: {
    offset: {
      x: -20,
      y: 50,
    },
    width: 260,
    height: 50,
  },
  attackBoxReverse: {
    offset: {
      x: -150,
      y: -50,
    },
    width: 100,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 800,
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
  imageSrc: "./assets/enemy/idle.png",
  framesMax: 11,
  scale: 3.1,
  offset: {
    x: 160,
    y: 162,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/enemy/idle.png",
      framesMax: 11,
      framesHold: 4,
    },
    idleReverse: {
      imageSrc: "./assets/enemy/idle_Reverse.png",
      framesMax: 11,
      framesHold: 4,
    },
    run: {
      imageSrc: "./assets/enemy/Run.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    runReverse: {
      imageSrc: "./assets/enemy/Run_Reverse.png",
      framesMax: 8,
      image: new Image(),
      framesHold: 4,
    },
    jump: {
      imageSrc: "./assets/enemy/Jump.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    jumpReverse: {
      imageSrc: "./assets/enemy/Jump_Reverse.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    fall: {
      imageSrc: "./assets/enemy/fall.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    fallReverse: {
      imageSrc: "./assets/enemy/fall_Reverse.png",
      framesMax: 3,
      framesHold: 4,
      image: new Image(),
    },
    attack: {
      imageSrc: "./assets/enemy/attack.png",
      framesMax: 7,
      image: new Image(),
      framesHold: 4,
    },
    attackReverse: {
      imageSrc: "./assets/enemy/attack_Reverse.png",
      framesMax: 7,
      image: new Image(),
      framesHold: 4,
    },
    attackAux: {
      imageSrc: "./assets/enemy/attack.png",
      framesMax: 7,
      image: new Image(),
      framesHold: 4,
    },
    takeHit: {
      imageSrc: "./assets/enemy/takeHit.png",
      framesMax: 4,
    },
    takeHitReverse: {
      imageSrc: "./assets/enemy/takeHit_Reverse.png",
      framesMax: 4,
    },
    takeHitAux: {
      imageSrc: "./assets/enemy/takeHit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./assets/enemy/Death.png",
      framesMax: 11,
      scale: 3.85,
    },
    deathReverse: {
      imageSrc: "./assets/enemy/death_Reverse.png",
      framesMax: 11,
      scale: 3,
    },
    deathAux: {
      imageSrc: "./assets/enemy/death.png",
      framesMax: 11,
      scale: 3.85,
    },
  },
  attackBox: {
    offset: {
      x: -20,
      y: 50,
    },
    width: 260,
    height: 50,
  },
  attackBoxReverse: {
    offset: {
      x: -185,
      y: 50,
    },
    width: 100,
    height: 50,
  },
});

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
  c.fillStyle = "rgba(255,255,255, 0.1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (player.position.x >= enemy.position.x) {
    if (keys.a.pressed & (player.lastKey === "a")) {
      player.velocity.x = -5;
      player.switchSprite("runReverse");
    } else if (keys.d.pressed & (player.lastKey === "d")) {
      player.velocity.x = +5;
      player.switchSprite("runReverse");
    } else {
      player.switchSprite("idleReverse");
    }

    if (player.velocity.y < 0) {
      player.switchSprite("jumpReverse");
    } else if (player.velocity.y > 0) {
      player.switchSprite("fallReverse");
    }
  } else {
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
  }

  if (player.position.x >= enemy.position.x) {
    if (keys.ArrowLeft.pressed & (enemy.lastKey === "ArrowLeft")) {
      enemy.velocity.x = -5;
      enemy.switchSprite("runReverse");
    } else if (keys.ArrowRight.pressed & (enemy.lastKey === "ArrowRight")) {
      enemy.velocity.x = 5;
      enemy.switchSprite("runReverse");
    } else {
      enemy.switchSprite("idleReverse");
    }

    if (enemy.velocity.y < 0) {
      enemy.switchSprite("jumpReverse");
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite("fallReverse");
    }
  } else {
    if (keys.ArrowLeft.pressed & (enemy.lastKey === "ArrowLeft")) {
      enemy.velocity.x = -5;
      enemy.switchSprite("run");
    } else if (keys.ArrowRight.pressed & (enemy.lastKey === "ArrowRight")) {
      enemy.velocity.x = 5;
      enemy.switchSprite("run");
    } else {
      enemy.switchSprite("idle");
    }

    if (enemy.velocity.y < 0) {
      enemy.switchSprite("jump");
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite("fall");
    }
  }

  if (player.position.x >= enemy.position.x) {
    qualquernomeaqui = rectangularCollision({
      rectangule1: enemy,
      rectangule2: player,
    });
  } else {
    qualquernomeaqui = rectangularCollision({
      rectangule1: player,
      rectangule2: enemy,
    });
  }

  if (qualquernomeaqui && player.isAttacking && player.framesCurrent === 3) {
    enemy.takeHit();
    player.isAttacking = false;
    gsap.to("#enemy-health", {
      width: enemy.health + "%",
    });
  }

  if (player.isAttacking & (player.framesCurrent === 4)) {
    player.isAttacking = false;
  }

  if (qualquernomeaqui && enemy.isAttacking && enemy.framesCurrent === 3) {
    player.takeHit();
    enemy.isAttacking = false;
    gsap.to("#player-health", {
      width: player.health + "%",
    });
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
  if (enemy.isAttacking & (enemy.framesCurrent === 4)) {
    enemy.isAttacking = false;
  }
  console.log(player.velocity.y);
}

animate();

window.addEventListener("keydown", (event) => {
  if (player.dead || enemy.dead) {
    return;
  }

  if (!player.dead) {
    switch (event.key) {
      case "w":
        if (player.velocity.y === 0) {
          player.velocity.y = -20;
        }
        break;
      case "a":
        if (clicked === false) {
          audio.battle.play();
          clicked = true;
        }
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "d":
        if (clicked === false) {
          audio.battle.play();
          clicked = true;
        }
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "s":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowUp":
        if (enemy.velocity.y === 0) {
          enemy.velocity.y = -20;
        }
        break;
      case "ArrowLeft":
        if (clicked === false) {
          audio.battle.play();
          clicked = true;
        }
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowRight":
        if (clicked === false) {
          audio.battle.play();
          clicked = true;
        }
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
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
  }
});

let clicked = false;
