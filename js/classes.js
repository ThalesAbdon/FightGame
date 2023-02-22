class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 4;
    this.offset = offset;
  }
  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.framesElapsed++;
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
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
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 4;
    this.sprites = sprites;
    this.dead = false;
    for (const sprite in sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

    console.log(this.sprites);
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // ATTACK BOX
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (player.position.x <= -75) {
      player.position.x = -75;
    }

    if (enemy.position.x <= -75) {
      enemy.position.x = -75;
    }

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 80) {
      this.velocity.y = 0;
      this.position.y = 346.19999999999993;
    } else {
      this.velocity.y += gravity;
    }

    this.sprites.attack.image.src = this.sprites.attack.image.src;
  }

  attack() {
    this.switchSprite("attack");
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 10;
    this.framesCurrent = 0;
    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true;
      return;
    }

    if (
      this.image ===
        (this.sprites.attack.image || this.sprites.attackReverse.image) &&
      this.framesCurrent <
        (this.sprites.attack.framesMax - 1 ||
          this.sprites.attackReverse.framesMax - 1)
    )
      return;

    if (
      this.image ===
        (this.sprites.takeHit.image || this.sprites.takeHitReverse.image) &&
      this.framesCurrent <
        (this.sprites.takeHit.framesMax - 1 ||
          this.sprites.takeHitReverse.framesMax - 1)
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesHold = this.sprites.idle.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "idleReverse":
        if (this.image !== this.sprites.idleReverse.image) {
          this.image = this.sprites.idleReverse.image;
          this.framesMax = this.sprites.idleReverse.framesMax;
          this.framesHold = this.sprites.idleReverse.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesHold = this.sprites.run.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "runReverse":
        if (this.image !== this.sprites.runReverse.image) {
          this.image = this.sprites.runReverse.image;
          this.framesMax = this.sprites.runReverse.framesMax;
          this.framesHold = this.sprites.runReverse.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesHold = this.sprites.jump.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "jumpReverse":
        if (this.image !== this.sprites.jumpReverse.image) {
          this.image = this.sprites.jumpReverse.image;
          this.framesMax = this.sprites.jumpReverse.framesMax;
          this.framesHold = this.sprites.jumpReverse.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesHold = this.sprites.fall.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "fallReverse":
        if (this.image !== this.sprites.fallReverse.image) {
          this.image = this.sprites.fallReverse.image;
          this.framesMax = this.sprites.fallReverse.framesMax;
          this.framesHold = this.sprites.fallReverse.framesHold;
          this.framesCurrent = 0;
        }
        break;
      case "attack":
        if (
          this.image !== this.sprites.attack.image ||
          this.sprites.attack2.image
        ) {
          if (player.position.x >= enemy.position.x) {
            this.sprites.attack.image.src =
              this.sprites.attackReverse.image.src;
            this.image = this.sprites.attack.image;
            this.framesMax = this.sprites.attack.framesMax;
            this.framesHold = this.sprites.attack.framesHold;
            this.framesCurrent = 0;
          }
          if (enemy.position.x >= player.position.x) {
            this.sprites.attack.image.src = this.sprites.attackAux.image.src;
            this.image = this.sprites.attack.image;
            this.framesMax = this.sprites.attack.framesMax;
            this.framesHold = this.sprites.attack.framesHold;
            this.framesCurrent = 0;
          }
        }
        break;
      case "takeHit":
        if (
          this.image !== this.sprites.takeHitReverse.image ||
          this.sprites.takeHitReverse.image
        ) {
          if (player.position.x >= enemy.position.x) {
            this.sprites.takeHit.image.src =
              this.sprites.takeHitReverse.image.src;
            this.image = this.sprites.takeHit.image;
            this.framesMax = this.sprites.takeHitReverse.framesMax;
            this.framesCurrent = 0;
          } else {
            this.sprites.takeHit.image.src = this.sprites.takeHitAux.image.src;
            this.image = this.sprites.takeHit.image;
            this.framesMax = this.sprites.takeHitReverse.framesMax;
            this.framesCurrent = 0;
          }
        }
        break;
      case "death":
        if (
          this.image !== this.sprites.death.image ||
          this.sprites.deathReverse.image
        ) {
          if (player.position.x >= enemy.position.x) {
            this.sprites.death.image.src = this.sprites.deathReverse.image.src;
            this.image = this.sprites.death.image;
            this.framesMax = this.sprites.death.framesMax;
            this.scale = this.sprites.deathReverse.scale;

            this.framesCurrent = 0;
          } else {
            this.sprites.death.image.src = this.sprites.deathAux.image.src;
            this.image = this.sprites.death.image;
            this.framesMax = this.sprites.death.framesMax;
            this.scale = this.sprites.death.scale;
            this.framesCurrent = 0;
          }
        }
        break;
    }
  }
}
